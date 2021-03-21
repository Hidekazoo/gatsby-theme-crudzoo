import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { HomeHero } from "../components/HomeHero"
import { HomeRecentArticlesSection } from "../components/HomeRecentArticlesSection"

import { Bio } from "../components/Bio"
import SEO from "../components/Seo"
import { Button } from "../components/Button"
import { Section } from "../components/Section"

import ArticleList from "../components/ArticleList"
import SeriesList from "../components/SeriesList"
import { useLocalizeData } from "../hooks/useLocalize"

import { IArticleNode } from "../types/Article"
import { ISeriesNode } from "../types/Series"
import { ILocation } from "../types/Location"
import "../styles/tailwind.css"
import "../styles/global.css"
import { Series } from "../components/Series"

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
  return <Series data={data} location={location} />
}
export default HomePage

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
