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
      allFile(filter: { sourceInstanceName: {eq:"data"}}) {
        edges {
          node {
            relativePath
            name
            childMdx {
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
    }
  `)
  const pages = result.data.allFile.edges.map(({
    node
  }) => node)
  const siteTitle = result.data.site.siteMetadata.title

  pages.forEach(page => {
    const pageInfo = page.childMdx.frontmatter

    actions.createPage({
      path: `/${page.name}`,
      component: require.resolve('./src/templates/blog-post.tsx'),
      context: {
        siteTitle: siteTitle,
        title: pageInfo.title,
        body: page.childMdx.code.body,
        date: pageInfo.date,
        update: pageInfo.update,
        tags: pageInfo.tags,
        spoiler: pageInfo.spoiler,
      }
    });
  });
}