import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
const MDXRenderer = require('gatsby-mdx/mdx-renderer');

const BlogPostTemplate: React.FC = (props) => {
  const data = useStaticQuery(graphql`
    query BlogQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
      allMdx {
        edges {
          node {
            parent {
              ... on File {
                name
                absolutePath
                relativePath
              }
            }
            code {
              body
            }
            timeToRead
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  const post = data.allMdx.edges[0].node
  console.log(post)
  return (
    <Layout
      location={location}
      title={data.site.siteMetadata.title}>
      <SEO
        title={post.frontmatter.title}
      />
      <h1>{post.frontmatter.title}</h1>
      <MDXRenderer>
        {post.code.body}
      </MDXRenderer>
    </Layout>
  )
}

export default BlogPostTemplate;