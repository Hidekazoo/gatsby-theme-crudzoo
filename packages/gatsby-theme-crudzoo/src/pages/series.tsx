import { graphql } from "gatsby"
import * as React from "react"

import { Content } from "../components/content"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SeriesList from "../components/series-list"
import { TextHero } from "../components/text-hero"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
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

interface SeriesProps {
  location: ILocation
  data: {
    allSeriesJson: {
      totalCount: number
      edges: ISeriesNode[]
    }
  }
}

export const Series: React.FC<SeriesProps> = ({ data, location }) => {
  const { language, title, keywords } = useSiteMetadata()
  const seriesData = data.allSeriesJson.edges
  return (
    <Layout location={location}>
      <SEO lang={language} title={title} keywords={keywords} />
      <TextHero title={`Series`} />
      <Content>
        <SeriesList series={seriesData} />
      </Content>
    </Layout>
  )
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
