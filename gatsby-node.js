// eslint-disable-next-line jsx-a11y/autocomplete-valid
const { paginate } = require("gatsby-awesome-pagination")
const path = require("path")
const fs = require("fs")
const mkdirp = require("mkdirp")
const withDefaults = require("./src/utils/DefaultOptions")

// initialize directory
exports.onPreBootstrap = ({ store, reporter }, options) => {
  const { program } = store.getState()
  const { blogPath, seriesPath } = withDefaults(options)
  const dirs = [
    path.join(program.directory, blogPath),
    path.join(program.directory, seriesPath),
    path.join(program.directory, "assets"),
  ]
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`)
      mkdirp.sync(dir)
    }
  })
}

exports.createPages = async ({ graphql, actions, reporter }, options) => {
  const { basePath, blogPath, blogsPath, tagsPath, seriesPath } = withDefaults(
    options
  )
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
              template
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panic(`error loading pages`, result.errors)
  }
  const { createPage } = actions
  paginate({
    createPage,
    items: result.data.allMdx.edges,
    itemsPerPage: 10,
    pathPrefix: path.join(basePath, blogsPath),
    component: require.resolve("./src/templates/Archive.tsx"),
  })

  const pages = result.data.allMdx.edges.map(({ node }) => node)
  let tags = []
  pages.forEach((page, index) => {
    const id = page.id
    const component =
      page.frontmatter.template === "book-review"
        ? require.resolve("./src/templates/BookReview.tsx")
        : require.resolve("./src/templates/BlogPost.tsx")
    actions.createPage({
      path: path.join(basePath, blogPath, page.parent.relativeDirectory),
      component: component,
      context: {
        slug: id,
        prev: index === pages.length - 1 ? null : pages[index + 1],
        next: index === 0 ? null : pages[index - 1],
      },
    })
    if (page.frontmatter.tags !== null) {
      tags = [...tags, ...page.frontmatter.tags]
    }
  })

  const uniqueTags = tags.filter((v, i) => tags.indexOf(v) === i)
  uniqueTags.forEach((tag) => {
    actions.createPage({
      path: path.join(basePath, tagsPath, tag),
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
  series.forEach((seriesPage) => {
    const seriesId = seriesPage.seriesId
    const articleIds = seriesPage.articles
    actions.createPage({
      path: path.join(basePath, seriesPath, seriesId),
      component: require.resolve("./src/templates/Series.tsx"),
      context: {
        articleIds,
        seriesId,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type crudzooThemeConfig implements Node {
      webfontURL: String,
      b: String
    }
  `)
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()
  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
  )
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true
  }
  actions.replaceWebpackConfig(config)
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve("path-browserify"),
      },
      fallback: {
        fs: false,
      },
    },
  })
}
