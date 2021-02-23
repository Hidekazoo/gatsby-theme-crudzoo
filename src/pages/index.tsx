import * as React from "react"
import { graphql } from "gatsby"

import { HomePageLayout } from "../components/HomePageLayout"
import { HomePageProps } from "../types/Home"

const HomePage: React.FC<HomePageProps> = ({ data, location }) => {
  return <HomePageLayout data={data} location={location} />
}
export default HomePage

export const query = graphql`
  query MDXQuery {
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 10) {
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
    }
  }
`
