exports.createPages = async({ graphql, actions }) => {
  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: {eq:"data"}}) {
        edges {
          node {
            relativePath
            name
            childMdx {
              code {
                body
              }
            }
          }
        }
      }
    }
  `)
  const pages = result.data.allFile.edges.map(({ node }) => node);

  pages.forEach(page => {
    actions.createPage({
      path: `/${page.name}`,
      component: require.resolve('./src/templates/blog-post.tsx'),
      context: {
        body: page.childMdx.code.body
      }
    });
  });
}

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}