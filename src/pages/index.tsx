import * as React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import ToggleDarkMode from "../components/toggleDarkMode"
import Bio from "../components/bio"
import SEO from "../components/seo"

import ArticleList from "../components/articleList"
import SeriesList from "../components/seriesList"
import LatestArticle from "../components/latestArticle"

import "../styles/global.css"

export interface ISeriesNode {
  node: {
    id: string
    title: string
    seriesId: string
    image: {
      childImageSharp: {
        fluid: any
      }
    } | null
  }
}

export interface IArticleNode {
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

interface IProps {
  location: {
    pathname: string | undefined
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        language: string
        keywords: string[]
        mainColor: string
      }
    }
    allSeriesJson: {
      totalCount: number
      edges: ISeriesNode[]
    }
    allMdx: {
      edges: IArticleNode[]
    }
  }
}

const Section = styled.section`
  margin-bottom: 60px;
`
const SectionTitle = styled.div<{ fontColor: string }>`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${props => props.fontColor};
  margin-bottom: 15px;
`

const TopPage: React.FC<IProps> = ({ data, location }) => {
  const language = data.site.siteMetadata.language
  const siteTitle = data.site.siteMetadata.title
  const mainColor = data.site.siteMetadata.mainColor

  const seriesCount = data.allSeriesJson.totalCount
  const seriesData = data.allSeriesJson.edges
  const keywords = data.site.siteMetadata.keywords

  const latestArticle = data.allMdx.edges[0]
  const latestArticleFrontmatter = latestArticle.node.frontmatter
  const latestArticlefeaturedImage = latestArticleFrontmatter.image
    ? latestArticleFrontmatter.image.childImageSharp.fluid
    : null

  const postData = data.allMdx.edges.filter(
    post => post.node.id !== latestArticle.node.id
  )

  return (
    <Layout location={location}>
      <SEO lang={language} title={siteTitle} keywords={keywords} />
      {/* <ToggleDarkMode /> */}

      <Section>
        <SectionTitle fontColor={mainColor}>Latest</SectionTitle>
        <LatestArticle
          path={latestArticle.node.parent.relativeDirectory}
          title={latestArticleFrontmatter.title}
          date={latestArticleFrontmatter.date}
          spoiler={latestArticleFrontmatter.spoiler}
          featuredImage={latestArticlefeaturedImage}
        />
      </Section>

      {seriesCount > 0 && (
        <Section>
          <SectionTitle fontColor={mainColor}>Series</SectionTitle>
          <SeriesList series={seriesData}></SeriesList>
        </Section>
      )}
      <Section>
        <SectionTitle fontColor={mainColor}>Articles</SectionTitle>
        <ArticleList articles={postData} />
      </Section>

      <Section>
        <Bio />
      </Section>
    </Layout>
  )
}

export default TopPage

export const query = graphql`
  query MDXQuery {
    site {
      siteMetadata {
        title
        language
        keywords
        mainColor
      }
    }
    allSeriesJson {
      totalCount
      edges {
        node {
          id
          title
          seriesId
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
            date(formatString: "MMMM DD, YYYY")
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
