import { graphql } from "gatsby"
import * as React from "react"

import { Series } from "../components/series-list/Series"
import { IArticleNode } from "../types/Article"
import { ILocation } from "../types/Location"
import { ISeriesNode } from "../types/Series"

interface ITopPageProps {
  location: ILocation
  data: {
    allSeriesJson: {
      totalCount: number
      edges: ISeriesNode[]
    }
    allMdx: {
      edges: IArticleNode[]
    }
  }
}

const SeriesPage: React.FC<ITopPageProps> = ({ data, location }) => {
  return <Series data={data} location={location} />
}
export default SeriesPage

export const query = graphql`
  query MDXQuery2 {
    allSeriesJson {
      totalCount
      edges {
        node {
          id
          title
          seriesId
          spoiler
          image {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 20) {
      edges {
        node {
          body
          parent {
            ... on File {
              name
              relativeDirectory
            }
          }
          id
          frontmatter {
            title
            date
            spoiler
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
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
