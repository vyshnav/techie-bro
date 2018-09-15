const webpack = require("webpack");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const { store } = require(`./node_modules/gatsby/dist/redux`);

// exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
//   const { createNodeField } = boundActionCreators;
//   // console.log(node);
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: `pages` });
//     const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
//     const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
//     createNodeField({
//       node,
//       name: `slug`,
//       value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
//     });
//     createNodeField({
//       node,
//       name: `prefix`,
//       value: separtorIndex ? slug.substring(1, separtorIndex) : ""
//     });
//   }
// };

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  // return new Promise((resolve, reject) => {
  //   const postTemplate = path.resolve("./src/templates/PostTemplate.js");
  //   const pageTemplate = path.resolve("./src/templates/PageTemplate.js");
  //   resolve(
  //     graphql(
  //       `
  //         {
  //           allContentfulPost {
  //             edges {
  //               node {
  //                 slug
  //                 node_locale
  //               }
  //             }
  //           }
  //         }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         console.log(result.errors);
  //         reject(result.errors);
  //       }

  //       // Create posts and pages.
  //       _.each(result.data.allContentfulPost.edges, node => {
  //         createPage({
  //           path: `/${node.node_locale}/${node.slug}/`,
  //           component: postTemplate,
  //           context: {
  //             slug: node.slug,
  //             locale: node.node_locale
  //           }
  //         });
  //       });
  //     })
  //   );
  // });

  const loadPosts = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPost {
          edges {
            node {
              slug
              node_locale
            }
          }
        }
      }
    `).then(result => {
      _.each(result.data.allContentfulPost.edges, edge => {
        createPage({
          path: edge.node.slug,
          component: path.resolve("./src/templates/PostTemplate.js"),
          context: {
            slug: edge.node.slug,
            locale: edge.node.node_locale
          }
        });
      });
      resolve();
    });
  });

  const loadPages = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPage {
          edges {
            node {
              slug
              node_locale
            }
          }
        }
      }
    `).then(result => {
      _.each(result.data.allContentfulPage.edges, edge => {
        createPage({
          path: edge.node.slug,
          component: path.resolve("./src/templates/PageTemplate.js"),
          context: {
            slug: edge.node.slug
          }
        });
      });
      resolve();
    });
  });

  // const loadTags = new Promise((resolve, reject) => {
  //   graphql(`
  //     {
  //       allContentfulTag {
  //         edges {
  //           node {
  //             slug
  //             node_locale
  //           }
  //         }
  //       }
  //     }
  //   `).then(result => {
  //     result.data.allContentfulTag.edges.map(({ node }) => {
  //       createPage({
  //         path: `/${node.node_locale}/tag/${node.slug}/`,
  //         component: path.resolve(`./src/templates/tag.js`),
  //         context: {
  //           slug: node.slug,
  //           locale: node.node_locale,
  //         },
  //       })
  //     })
  //     resolve()
  //   })
  // })

  return Promise.all([loadPosts, loadPages]);
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case "build-javascript":
      {
        let components = store.getState().pages.map(page => page.componentChunkName);
        components = _.uniq(components);
        config.plugin("CommonsChunkPlugin", webpack.optimize.CommonsChunkPlugin, [
          {
            name: `commons`,
            chunks: [`app`, ...components],
            minChunks: (module, count) => {
              const vendorModuleList = []; // [`material-ui`, `lodash`];
              const isFramework = _.some(
                vendorModuleList.map(vendor => {
                  const regex = new RegExp(`[\\\\/]node_modules[\\\\/]${vendor}[\\\\/].*`, `i`);
                  return regex.test(module.resource);
                })
              );
              return isFramework || count > 1;
            }
          }
        ]);
        // config.plugin("BundleAnalyzerPlugin", BundleAnalyzerPlugin, [
        //   {
        //     analyzerMode: "static",
        //     reportFilename: "./report/treemap.html",
        //     openAnalyzer: true,
        //     logLevel: "error",
        //     defaultSizes: "gzip"
        //   }
        // ]);
      }
      break;
  }
  return config;
};

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat([`syntax-dynamic-import`, `dynamic-import-webpack`])
  };
};
