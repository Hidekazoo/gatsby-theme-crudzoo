exports.createPages = async ({ graphql, actions }) => {
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

  const pages = result.data.allMdx.edges.map(({ node }) => node)
  let tags = []
  pages.forEach(page => {
    const id = page.id
    actions.createPage({
      path: `/${page.parent.relativeDirectory}`,
      component: require.resolve("./src/templates/blog-post.tsx"),
      context: {
        slug: id,
      },
    })
    if (page.frontmatter.tags !== null) {
      tags = [...tags, ...page.frontmatter.tags]
    }
  })

  const uniqueTags = tags.filter((v, i) => tags.indexOf(v) === i)
  uniqueTags.forEach(tag => {
    actions.createPage({
      path: `/tags/${tag}`,
      component: require.resolve("./src/templates/tags.tsx"),
      context: {
        tag,
      },
    })
  })

  const SeriesResult = await graphql(`
    {
      allSeriesJson {
        edges {
          node {
            seriesId
            articles
          }
        }
      }
    }
  `)
  const series = SeriesResult.data.allSeriesJson.edges.map(({ node }) => node)
  series.forEach(seriesPage => {
    const seriesId = seriesPage.seriesId
    const articleIds = seriesPage.articles
    actions.createPage({
      path: `/series/${seriesId}`,
      component: require.resolve("./src/templates/series.tsx"),
      context: {
        articleIds,
        seriesId,
      },
    })
  })
}
