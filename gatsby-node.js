exports.createPages = async ({
  graphql,
  actions
}) => {
  const result = await graphql(`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          parent {
            ... on File {
              relativeDirectory
            }
          }
          frontmatter {
            title
            date(formatString: "YYYY年MM月DD日")
            update(formatString: "YYYY年MM月DD日")
            tags
            spoiler
          }
          code {
            body
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
        // siteTitle: siteTitle,
        // title: pageInfo.title,
        // body: page.childMdx.code.body,
        // date: pageInfo.date,
        // update: pageInfo.update,
        // tags: pageInfo.tags,
        // spoiler: pageInfo.spoiler,
      }
    });
  });
}