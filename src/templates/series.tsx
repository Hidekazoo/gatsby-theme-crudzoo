/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/global.css"

import ArticleList from "../components/articleList"

interface IProps {
  pageContext: {
    seriesTitle: string
    seriesDescriptoin: string
    articleIds: string[]
    seriesImage: any
  }
  location: {
    pathname: string | undefined
  }
  data: {
    site: {
      siteMetadata: {
        language: string
        mainColor: string
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

      <div
        sx={{
          mt: "-20px",
        }}
      >
        <h1
          sx={{
            color: "primary",
            fontSize: 24,
            padding: "3px 5px",
            mr: 10,
            width: "fit-content",
          }}
        >
          {pageTitle}
        </h1>
        <div>{pageImage && <Img sizes={pageImage} />}</div>
        <div
          sx={{
            color: "text",
            borderBottom: "1px solid #ddd",
            mt: 16,
            mb: 16,
            pb: 16,
          }}
        >
          {pageDescription}
        </div>
      </div>

      <div>
        <ArticleList articles={postData} />
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
        mainColor
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
    allMdx(limit: 200, filter: { frontmatter: { id: { in: $articleIds } } }) {
      edges {
        node {
          id
          parent {
            ... on File {
              relativePath
              relativeDirectory
              changeTime(formatString: "MMMM DD, YYYY")
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
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
