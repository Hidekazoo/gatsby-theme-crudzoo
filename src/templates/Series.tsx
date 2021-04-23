import * as React from "react"
import { graphql } from "gatsby"
import { SeriesLayout } from "./SeriesLayout"
import { ILocation } from "src/types/Location"
interface IProps {
  location: ILocation
  data: {
    allSeriesJson: {
      edges: [
        {
          node: {
            title: string
            spoiler: string
            image: {
              childImageSharp: {
                fluid: any
              }
            } | null
          }
        }
      ]
    }
    allMdx: {
      edges: [
        {
          node: {
            body: string
            parent: {
              name: string
              relativeDirectory: string
            }
            id: string
            frontmatter: {
              title: string
              date: Date
              spoiler: string | undefined
              image: {
                childImageSharp: {
                  fluid: any
                }
              } | null
            }
          }
        }
      ]
    }
  }
}

const SeriesPageTemplate: React.FC<IProps> = ({ data, location }) => {
  const pageData = data.allSeriesJson.edges[0].node
  const postData = data.allMdx.edges
  return (
    <SeriesLayout pageData={pageData} postData={postData} location={location} />
  )
}

export default SeriesPageTemplate

export const query = graphql`
  query SeriesQuery($articleIds: [String], $seriesId: String) {
    allSeriesJson(filter: { seriesId: { eq: $seriesId } }) {
      edges {
        node {
          title
          spoiler
          image {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allMdx(
      filter: { frontmatter: { id: { in: $articleIds } } }
      sort: { fields: frontmatter___id, order: ASC }
    ) {
      edges {
        node {
          id
          parent {
            ... on File {
              relativePath
              relativeDirectory
            }
          }
          frontmatter {
            title
            date
            spoiler
            image {
              childImageSharp {
                fluid(maxWidth: 120) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
