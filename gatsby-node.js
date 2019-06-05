exports.createPages = async ({
  graphql,
  actions
}) => {
  const result = await graphql(`
  {
    allMdx {
      edges {
        node {
          id
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  }
  `)

  const pages = result.data.allMdx.edges.map(({
    node
  }) => node)
  pages.forEach(page => {
    // const pageInfo = page.childMdx.frontmatter
    const id = page.id
    actions.createPage({
      path: `/${page.parent.relativeDirectory}`,
      component: require.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug: id,
      }
    });
  });
}