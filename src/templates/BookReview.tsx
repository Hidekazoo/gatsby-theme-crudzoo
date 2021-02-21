import * as React from "react"
import { graphql } from "gatsby"
import { ILocation } from "../types/Location"
import { BookReviewLayout } from "./BookReviewLayout"
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

const BookReviewTemplate: React.FC<IProps> = props => {
  const { pageContext, data } = props
  const pageData = data.allMdx.edges[0].node

  return <BookReviewLayout pageContext={pageContext} pageData={pageData} />
}

export default BookReviewTemplate
export const query = graphql`
  query BookQuery($slug: String) {
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
            link
            score
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          body
        }
      }
    }
  }
`
