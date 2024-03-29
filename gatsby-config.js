require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteTitle: 'Flagsmith', // <title>
    siteDescription: 'Site Description',
    // pathPrefix: "",
    siteImage: '/images/social-preview.jpg',
    siteLanguage: 'en',
    siteUrl: process.env.GATSBY_DEFAULT_SITE_URL,
    /* author */
    authorName: 'pixel point',
    authorTwitterAccount: '@',
  },
  plugins: [
    `gatsby-plugin-no-index`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingIds: ['UA-120237963-1'],
        pluginConfig: {
          // Defines where to place the tracking script - `true` in the head and `false` in the body
          head: false,
        },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 85,
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {
          placeholder: 'none',
          quality: 80,
        },
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: process.env.GATSBY_DEFAULT_SITE_URL,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-svgr-svgo',
      options: {
        inlineSvgOptions: [
          {
            test: /\.inline.svg$/,
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        ],
        urlSvgOptions: [
          {
            test: /\.svg$/,
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
            urlLoaderOptions: {
              limit: 512,
            },
          },
        ],
      },
    },
    'gatsby-alias-imports',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        additionalData: '@import "./src/styles/variables.scss" , "./src/styles/mixins.scss";',
        useResolveUrlLoader: true,
        cssLoaderOptions: {
          modules: {
            namedExport: false,
            exportLocalsConvention: 'camelCase',
          },
        },
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        schema: {
          timeout: 60000,
        },
        url: process.env.WP_GRAPHQL_URL,
        auth: {
          htaccess: {
            username: process.env.WP_HTACCESS_USERNAME,
            password: process.env.WP_HTACCESS_PASSWORD,
          },
        },
        html: {
          fallbackImageMaxWidth: 1920,
          imageQuality: 80,
        },
        develop: {
          nodeUpdateInterval: process.env.WP_NODE_UPDATE_INTERVAL || 5000,
          hardCacheMediaFiles: process.env.WP_HARD_CACHE_MEDIA === 'true',
          hardCacheData: process.env.WP_HARD_CACHE_DATA === 'true',
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-T4K5B4W',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWpPost } }) =>
              allWpPost.edges.map((edge) => ({
                ...edge.node,
                description: edge.node.excerpt,
                date: edge.node.date,
                url: `${site.siteMetadata.siteUrl}/blog/${edge.node.slug}`,
                guid: `${site.siteMetadata.siteUrl}/blog/${edge.node.slug}`,
                custom_elements: [{ 'content:encoded': edge.node.content }],
              })),
            query: `
              {
                allWpPost(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      date
                      title
                      content
                      excerpt
                      slug
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: `RSS Feed`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-heap',
      options: {
        appId: '1332296308',
        enableOnDevMode: true, // if 'false', heap will be fired on NODE_ENV=production only
      },
    },
  ],
};
