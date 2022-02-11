import { graphql } from "gatsby"
import * as React from "react"

import { Home } from "../components/home"
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

const HomePage: React.FC<ITopPageProps> = ({ data, location }) => {
  return <Home data={data} location={location} />
}
export default HomePage

export const query = graphql`
  query MDXQuery {
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
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  }
`
