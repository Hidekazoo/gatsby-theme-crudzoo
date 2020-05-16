import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import ArticleList from "../components/ArticleList"
import "../styles/global.css"

interface IProps {
  pageContext: {
    tag: string
  }
  location: {
    pathname: string | undefined
  }
  data: {
    site: {
      siteMetadata: {
        language: string
      }
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

const TagPageTemplate: React.FC<IProps> = ({ pageContext, data, location }) => {
  const language = data.site.siteMetadata.language

  const pageTitle = pageContext.tag
  const keywords = ["key"]

  const pageData = data.allMdx.edges
  return (
    <Layout location={location}>
      <SEO lang={language} title={pageTitle} keywords={keywords} />
      <div className="max-w-screen-xl px-12 mx-auto">
        <h1 className="text-3xl my-10">
          Tag： <span className="text-primary ">{pageTitle}</span>
        </h1>

        <ArticleList articles={pageData} />
      </div>
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
            date(formatString: "Y年M月d日")
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
