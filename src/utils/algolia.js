const blogQuery = `{
  blog: allMdx(filter: {
    fileAbsolutePath: {regex: "/blog/"}
  }) {
	  edges {
	     node {
        parent {
          ... on File {
            relativeDirectory
          }
        }
        objectID: id
        frontmatter {
          title
          spoiler
          date(formatString: "Y年M月d日")
          tags
        }
        excerpt(pruneLength: 5000)
      }
	  }
	}
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: blogQuery,
    transformer: ({ data }) => flatten(data.blog.edges),
    indexName: `Blogs`,
    settings,
  },
]

module.exports = queries
