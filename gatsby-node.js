const { paginate } = require("gatsby-awesome-pagination")
const path = require("path")
const fs = require("fs")
const mkdirp = require("mkdirp")

// initialize directory
exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState()
  const dirs = [
    path.join(program.directory, "blog"),
    path.join(program.directory, "pages"),
    path.join(program.directory, "series"),
    path.join(program.directory, "assets"),
  ]
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`)
      mkdirp.sync(dir)
    }
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
              tags
            }
          }
        }
      }
    }
  `)
  const { createPage } = actions
  paginate({
    createPage,
    items: result.data.allMdx.edges,
    itemsPerPage: 10,
    pathPrefix: "/blogs",
    component: require.resolve("./src/templates/archive.tsx"),
  })

  const pages = result.data.allMdx.edges.map(({ node }) => node)
  let tags = []
  pages.forEach((page, index) => {
    const id = page.id
    actions.createPage({
      path: `/blog/${page.parent.relativeDirectory}`,
      component: require.resolve("./src/templates/blog-post.tsx"),
      context: {
        slug: id,
        prev: index === 0 ? null : pages[index - 1],
        next: index === pages.length - 1 ? null : pages[index + 1],
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
