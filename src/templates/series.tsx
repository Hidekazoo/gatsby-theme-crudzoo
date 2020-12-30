import * as React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import "../styles/global.css"

import ArticleList from "../components/ArticleList"
import { ILocation } from "../types/Location"
interface IProps {
  pageContext: {
    seriesTitle: string
    seriesDescriptoin: string
    articleIds: string[]
    seriesImage: any
  }
  location: ILocation
  data: {
    site: {
      siteMetadata: {
        language: string
      }
    }
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
  const language = data.site.siteMetadata.language
  const pageData = data.allSeriesJson.edges[0].node
  const pageTitle = pageData.title
  const pageDescription = pageData.spoiler
  const postData = data.allMdx.edges

  let pageImage = null
  if (pageData.image !== null) {
    pageImage = pageData.image!.childImageSharp.fluid
  }
  return (
    <Layout location={location}>
      <SEO lang={language} title={pageTitle} />

      <div className="max-w-screen-xl px-12 mx-auto">
        <div className="flex h-auto sm:flex-row h-64 my-10 md:max-w-4xl flex-col-reverse mx-auto">
          <div className="sm:w-1/2 w-full">
            <h1 className="text-primary text-3xl">{pageTitle}</h1>
            <div className="text-gray-600 mt-4 leading-relaxed">
              {pageDescription}
            </div>
          </div>

          <div className="sm:w-1/2 w-full">
            {pageImage && <Img sizes={pageImage} className="w-full" />}
          </div>
        </div>
        <div className="py-10 mt-10 md:max-w-4xl mx-auto">
          <ArticleList articles={postData} />
        </div>
      </div>
    </Layout>
  )
}

export default SeriesPageTemplate

export const query = graphql`
  query SeriesQuery($articleIds: [String], $seriesId: String) {
    site {
      siteMetadata {
        language
      }
    }
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
            date(formatString: "Y年M月D日")
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
