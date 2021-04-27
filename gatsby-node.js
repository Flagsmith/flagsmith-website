const fs = require('fs');
const path = require('path');

const slash = require('slash');

const filterNonRootItems = require('./src/utils/filter-non-root-items');

// constants
const SUPPORTED_MENU_TYPES = ['header', 'footer', 'mobile'];
const POSTS_PER_PAGE = 9;
const PODCASTS_PER_PAGE = 9;

// removes all the spaces from a string
// stripSpaces(string: String) -> String
const stripSpaces = (string) => string.replace(/\s+/g, ' ');

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
    data: { header, getStarted, subscribe },
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
      subscribe: wpSharedBlock(slug: { eq: "subscribe" }) {
        acf {
          title
          description
          emailPlaceholder
          buttonText
        }
      }
    }
  `);
  return {
    header,
    getStarted,
    subscribe,
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

// Create Blog Pages
async function createBlogPages({ graphql, actions, menus, sharedBlocks }) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWpPage(filter: { template: { templateName: { eq: "Blog" } } }) {
        nodes {
          id
          uri
          acf {
            featuredPost {
              post {
                ... on WpPost {
                  id
                }
              }
            }
          }
        }
      }
      allWpPost(sort: { fields: date, order: DESC }) {
        nodes {
          id
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const {
    data: { allWpPage, allWpPost },
  } = result;

  const blogPages = allWpPage.nodes;
  const blogPosts = allWpPost.nodes;

  const template = path.resolve('./src/templates/blog.jsx');

  blogPages.forEach((blogPage) => {
    const context = {
      id: blogPage.id,
      featuredPostId: blogPage.acf.featuredPost.post.id,
      menus,
      sharedBlocks,
    };

    // Omit feature post since it is not included in posts list
    const postsWithoutFeaturedPost = blogPosts.filter(
      (post) => post.id !== blogPage.acf.featuredPost.post.id
    );

    const pageCount = Math.ceil(postsWithoutFeaturedPost.length / POSTS_PER_PAGE);
    const makePath = (i) => (i === 0 ? blogPage.uri : `${blogPage.uri}${i + 1}`);
    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: makePath(i),
        component: slash(template),
        context: {
          ...context,
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
          pageCount,
          currentPage: i + 1,
        },
      });
    });
  });
}

// Create Blog Posts
async function createPosts({ graphql, actions, reporter, menus, sharedBlocks }) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWpPost {
        nodes {
          id
          content
          uri
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }
  const posts = result.data.allWpPost.nodes;

  posts.forEach(({ id, content, uri }) => {
    const templatePath = path.resolve('./src/templates/blog-post.jsx');

    const context = {
      id,
      menus,
      content,
      sharedBlocks,
    };

    if (content) {
      context.content = stripSpaces(content);
    }

    if (fs.existsSync(templatePath)) {
      createPage({
        path: uri,
        component: slash(templatePath),
        context,
      });
    } else {
      reporter.error('Template Blog Post was not found');
    }
  });
}

// Create Podcasts Pages
async function createPodcastPages({ graphql, actions, menus, sharedBlocks }) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWpPage(filter: { template: { templateName: { eq: "Podcasts" } } }) {
        nodes {
          id
          uri
        }
      }
      allWpPodcast(sort: { fields: date, order: DESC }) {
        nodes {
          id
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const {
    data: { allWpPage, allWpPodcast },
  } = result;

  const podcastPages = allWpPage.nodes;
  const podcastPosts = allWpPodcast.nodes;

  const template = path.resolve('./src/templates/podcasts.jsx');

  podcastPages.forEach((podcastPage) => {
    const context = {
      id: podcastPage.id,
      menus,
      sharedBlocks,
    };

    const pageCount = Math.ceil(podcastPosts.length / PODCASTS_PER_PAGE);
    const makePath = (i) => (i === 0 ? podcastPage.uri : `${podcastPage.uri}${i + 1}`);
    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: makePath(i),
        component: slash(template),
        context: {
          ...context,
          limit: PODCASTS_PER_PAGE,
          skip: i * PODCASTS_PER_PAGE,
          pageCount,
          currentPage: i + 1,
        },
      });
    });
  });
}

// Create Podcast
async function createPodcasts({ graphql, actions, reporter, menus, sharedBlocks }) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allWpPodcast {
        nodes {
          id
          content
          uri
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }
  const podcasts = result.data.allWpPodcast.nodes;
  podcasts.forEach(({ id, content, uri }) => {
    const templatePath = path.resolve('./src/templates/podcast-post.jsx');

    const context = {
      id,
      menus,
      content,
      sharedBlocks,
    };

    if (fs.existsSync(templatePath)) {
      createPage({
        path: uri,
        component: slash(templatePath),
        context,
      });
    } else {
      reporter.error('Template Podcast was not found');
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

  await createRedirects(params);
  await createPages(params);
  await createBlogPages(params);
  await createPosts(params);
  await createPodcastPages(params);
  await createPodcasts(params);
};
