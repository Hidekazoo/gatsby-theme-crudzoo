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
          frontmatter {
            tags
          }
        }
      }
    }
  }
  `)

  const pages = result.data.allMdx.edges.map(({
    node
  }) => node);
  let tags = [];
  pages.forEach(page => {
    const id = page.id
    actions.createPage({
      path: `/${page.parent.relativeDirectory}`,
      component: require.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug: id,
      }
    });
    if (page.frontmatter.tags !== null) {
      tags = [...tags, ...page.frontmatter.tags]
    }
  });

  const uniqueTags = tags.filter((v, i) => tags.indexOf(v) === i)
  uniqueTags.forEach(tag => {
    actions.createPage({
      path: `/tags/${tag}`,
      component: require.resolve('./src/templates/tags.tsx'),
      context: {
        tag,
      }
    })
  })
}