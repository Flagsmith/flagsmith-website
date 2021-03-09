const fs = require('fs');
const path = require('path');
const slash = require('slash');

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
    data: { header, mobile, footer },
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
    }
  `);
  return {
    header,
    mobile,
    footer,
  };
};

// Create Pages
async function createPages({ graphql, actions, allMenus, reporter }) {
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
      menus: allMenus,
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

exports.createPages = async (args) => {
  const allMenus = await getAllMenus(args.graphql);

  const params = {
    ...args,
    allMenus,
  };

  await createPages(params);
  await createRedirects(params);
};
