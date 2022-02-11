import { graphql } from "gatsby"
import * as React from "react"

import ArticleList from "../components/article-list"
import { Content } from "../components/content"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { TextHero } from "../components/text-hero"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { IArticleNode } from "../types/Article"
import { ILocation } from "../types/Location"

interface IProps {
  pageContext: {
    tag: string
  }
  location: ILocation
  data: {
    allMdx: {
      edges: IArticleNode[]
    }
  }
}

const TagPageTemplate: React.FC<IProps> = ({ pageContext, data, location }) => {
  const { language } = useSiteMetadata()

  const pageTitle = pageContext.tag
  const keywords = ["key"]

  const pageData = data.allMdx.edges
  return (
    <Layout location={location}>
      <SEO lang={language} title={pageTitle} keywords={keywords} />
      <TextHero title={`Tag：${pageTitle}`} />
      <Content>
        <ArticleList articles={pageData} />
      </Content>
    </Layout>
  )
}

export default TagPageTemplate

export const query = graphql`
  query TagQuery($tag: String) {
    site {
      siteMetadata {
        language
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          body
          parent {
            ... on File {
              name
              relativePath
              relativeDirectory
            }
          }
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
