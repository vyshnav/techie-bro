require("dotenv").config();
const config = require("./content/meta/config");

let contentfulConfig;
try {
  contentfulConfig = require("./.contentful");
} catch (e) {
  contentfulConfig = {
    production: {
      spaceId: process.env.SPACE_ID,
      accessToken: process.env.ACCESS_TOKEN
    }
  };
} finally {
  const { spaceId, accessToken } = contentfulConfig.production;
  if (!spaceId || !accessToken) {
    throw new Error("Contentful space ID and access token need to be provided.");
  }
}

const query = `{
  allMarkdownRemark(filter: { id: { regex: "//posts|pages//" } }) {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        internal {
          content
        }
        frontmatter {
          title
          subTitle
        }
      }
    }
  }
}`;

const queries = [
  {
    query,
    transformer: ({ data }) => data.allMarkdownRemark.edges.map(({ node }) => node)
  }
];

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: config.siteUrl,
    pathPrefix: config.pathPrefix,
    algolia: {
      appId: process.env.ALGOLIA_APP_ID ? process.env.ALGOLIA_APP_ID : "",
      searchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY
        ? process.env.ALGOLIA_SEARCH_ONLY_API_KEY
        : "",
      indexName: process.env.ALGOLIA_INDEX_NAME ? process.env.ALGOLIA_INDEX_NAME : ""
    },
    facebook: {
      appId: process.env.FB_APP_ID ? process.env.FB_APP_ID : ""
    }
  },
  plugins: [
    `gatsby-plugin-react-next`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID ? process.env.ALGOLIA_APP_ID : "",
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY ? process.env.ALGOLIA_ADMIN_API_KEY : "",
        indexName: process.env.ALGOLIA_INDEX_NAME ? process.env.ALGOLIA_INDEX_NAME : "",
        queries,
        chunkSize: 10000 // default: 1000
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options:
        process.env.NODE_ENV === "development"
          ? contentfulConfig.development
          : contentfulConfig.production
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`
          },
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 650,
              backgroundColor: "white",
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.manifestName,
        short_name: config.manifestShortName,
        start_url: config.manifestStartUrl,
        background_color: config.manifestBackgroundColor,
        theme_color: config.manifestThemeColor,
        display: config.manifestDisplay,
        icons: [
          {
            src: "/icons/icon-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "GatsbyJS GCN Starter";
          return ret;
        },
        query: `
                    {
                      site {
                        siteMetadata {
                          rssMetadata {
                            site_url
                            feed_url
                            title
                            description
                            image_url
                            author
                            copyright
                          }
                        }
                      }
                    }
                  `,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata
              return ctx.query.allContentfulPost.edges.map(edge => ({
                date: edge.node.publishDate,
                title: edge.node.title,
                description: edge.node.body.childMarkdownRemark.excerpt,

                url: rssMetadata.site_url + "/" + edge.node.slug,
                guid: rssMetadata.site_url + "/" + edge.node.slug,
                custom_elements: [
                  {
                    "content:encoded": edge.node.body.childMarkdownRemark.html
                  }
                ]
              }));
            },
            query: `
                            {
                          allContentfulPost(limit: 1000, sort: {fields: [publishDate], order: DESC}) {
                             edges {
                               node {
                                 title
                                 slug
                                 publishDate(formatString: "MMMM DD, YYYY")
                                 body {
                                   childMarkdownRemark {
                                     html
                                     excerpt(pruneLength: 80)
                                   }
                                 }
                               }
                             }
                           }
                         }
                    `,
            output: "/rss.xml"
          }
        ]
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        include: /svg-icons/
      }
    }
  ]
};
