import * as React from "react"
import { graphql } from "gatsby"
import { ILocation } from "../types/Location"
import { BlogPostLayout } from "./BlogPostLayout"
import { INode } from "../types/BlogPost"

interface IProps {
  location: ILocation
  data: {
    allMdx: {
      edges: [
        {
          node: INode
        }
      ]
    }
  }
  pageContext: {
    prev: {
      parent: {
        relativeDirectory: string
      }
      frontmatter: {
        title: string
        tags: string[]
      }
    }
    next: {
      parent: {
        relativeDirectory: string
      }
      frontmatter: {
        title: string
        tags: string[]
      }
    }
  }
}

const BlogPostTemplate: React.FC<IProps> = props => {
  const { pageContext, data } = props
  const pageData = data.allMdx.edges[0].node
  return <BlogPostLayout pageContext={pageContext} pageData={pageData} />
}

export default BlogPostTemplate
export const query = graphql`
  query BlogPostQuery($slug: String) {
    allMdx(filter: { id: { eq: $slug } }) {
      edges {
        node {
          parent {
            ... on File {
              changeTime
            }
          }
          id
          frontmatter {
            title
            date
            tags
            spoiler
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          headings {
            value
            depth
          }
          body
        }
      }
    }
  }
`
