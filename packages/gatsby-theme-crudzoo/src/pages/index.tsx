import * as React from "react"
import { graphql } from "gatsby"
import { Home } from "../components/Home"
import { IArticleNode } from "../types/Article"
import { ISeriesNode } from "../types/Series"
import { ILocation } from "../types/Location"

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
