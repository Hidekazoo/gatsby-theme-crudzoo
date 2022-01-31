import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import { Content } from "../components/Content"
import { TextHero } from "../components/TextHero"
import SEO from "../components/Seo"
import ArticleList from "../components/ArticleList"
import { ILocation } from "../types/Location"
import { IArticleNode } from "../types/Article"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

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
