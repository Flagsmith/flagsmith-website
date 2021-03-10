const fs = require('fs');
const path = require('path');
const slash = require('slash');

const filterNonRootItems = require('./src/utils/filter-non-root-items');

// constants
const SUPPORTED_MENU_TYPES = ['header', 'footer', 'mobile'];

async function createRedirects({ graphql, actions }) {
  const { createRedirect } = actions;
  const result = await graphql(`
    {
      wp {
        seo {
          redirects {
            origin
            target
            type
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const { redirects } = result.data.wp.seo;
  // Add slash at the beginning of the string if not present to adjust it for Netlify's format
  // eg. blog/the-ultimate-guide-to-buying-intercom-systems-for-offices -> /blog/the-ultimate-guide-to-buying-intercom-systems-for-offices

  const formatPath = (path) => (/^\/|^http|^https|^www/.test(path) ? path : `/${path}`);
  redirects.forEach(({ origin, target, type }) => {
    createRedirect({
      fromPath: formatPath(origin),
      toPath: formatPath(target),
      statusCode: parseInt(type, 10),
      force: true,
    });
  });
}

const getAllMenus = async (graphql) => {
  const {
    data: { header, footer, mobile },
  } = await graphql(`
    {
      header: wpMenu(slug: { eq: "header-menu" }) {
        menuItems {
          nodes {
            label
            path
            parentId
            childItems {
              nodes {
                label
                path
              }
            }
          }
        }
      }

      footer: wpMenu(slug: { eq: "footer-menu" }) {
        menuItems {
          nodes {
            label
            path
            parentId
            childItems {
              nodes {
                label
                path
              }
            }
          }
        }
      }

      mobile: wpMenu(slug: { eq: "mobile-menu" }) {
        menuItems {
          nodes {
            label
            path
            parentId
            childItems {
              nodes {
                label
                path
              }
            }
          }
        }
      }
    }
  `);

  return {
    header,
    footer,
    mobile,
  };
};

const getAllSharedBlocks = async (graphql) => {
  const {
    data: { header, getStarted },
  } = await graphql(`
    {
      header: wpSharedBlock(slug: { eq: "header" }) {
        acf {
          button1 {
            url
            target
          }
          button2 {
            title
            url
            target
          }
        }
      }
      getStarted: wpSharedBlock(slug: { eq: "get-started" }) {
        acf {
          title
          description
          button {
            title
            url
            target
          }
        }
      }
    }
  `);
  return {
    header,
    getStarted,
  };
};

// Create Pages
async function createPages({ graphql, actions, reporter, menus, sharedBlocks }) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allWpPage {
        nodes {
          id
          uri
          template {
            templateName
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const pages = result.data.allWpPage.nodes;

  pages.forEach(({ id, uri, template: { templateName } }) => {
    const templateNamePath = templateName.toLowerCase().replace(/\s/g, '-');
    const templatePath = path.resolve(`./src/templates/${templateNamePath}.jsx`);
    const context = {
      id,
      menus,
      sharedBlocks,
    };

    if (fs.existsSync(templatePath)) {
      createPage({
        path: uri,
        component: slash(templatePath),
        context,
      });
    } else {
      reporter.error(`Template "${templateName}" was not found`);
    }
  });
}

const getMenus = (allMenus) => {
  const menus = {};

  SUPPORTED_MENU_TYPES.forEach((type) => {
    const items = allMenus[`${type}`].menuItems.nodes;
    menus[`${type}MenuItems`] = filterNonRootItems(items);
  });
  // filter non top level links for all menus
  return menus;
};

exports.createPages = async (args) => {
  const allMenus = await getAllMenus(args.graphql);
  const sharedBlocks = await getAllSharedBlocks(args.graphql);

  const params = {
    ...args,
    menus: getMenus(allMenus),
    sharedBlocks,
  };

  await createPages(params);
  await createRedirects(params);
};
