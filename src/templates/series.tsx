import * as React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatPostDate } from "../utils/i18n"
import ToggleDarkMode from "../components/toggleDarkMode"
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

const Header = styled.div`
  color: var(--textNormal);
  margin-top: -20px;
`
const PageTitle = styled.h1<{ mainColor: string }>`
  font-size: 20px;
  padding: 3px 5px;
  text-decoration: none;
  margin-right: 10px;
  width: fit-content;
  color: ${props => props.mainColor};
`

const PageDescription = styled.div`
  margin-bottom: 3em;
  margin-top: -0.5em;
  padding-bottom: 1em;
  border-bottom: 1px solid var(--textNormal);
`

const Section = styled.section``

const SeriesPageTemplate: React.FC<IProps> = ({ data, location }) => {
  const language = data.site.siteMetadata.language
  const mainColor = data.site.siteMetadata.mainColor
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
      {/* <ToggleDarkMode /> */}

      <Header>
        <PageTitle mainColor={mainColor}>{pageTitle}</PageTitle>
        <div>{pageImage && <Img sizes={pageImage} />}</div>
        <PageDescription>{pageDescription}</PageDescription>
      </Header>

      <Section>
        <ArticleList articles={postData} />
      </Section>
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
