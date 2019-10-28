/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatPostDate } from "../utils/i18n"
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
            parent: {
              relativePath: string
              relativeDirectory: string
              name: string
              changeTime: Date
            }
            code: {
              body: string
            }
            frontmatter: {
              title: string
              date: Date
              tags: string[]
              spoiler: string
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
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: 20,
          fontWeight: 500,
          color: "text",
          borderBottom: "1px solid #202124",
          mb: 30,
        }}
      >
        <h1
          sx={{
            fontSize: 24,
            padding: "3px 5px",
            textDecoration: "none",
            marginRight: "10px",
            width: "fit-content",
          }}
        >
          {pageTitle}
        </h1>
      </div>

      {pageData.map(({ node }) => {
        const title = node.frontmatter.title
        return (
          <div
            key={node.parent.relativeDirectory}
            style={{
              marginBottom: `30px`,
            }}
          >
            <h2
              sx={{
                fontSize: 20,
                mb: "5px",
                mt: "15px",
              }}
            >
              <Link
                sx={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `text`,
                }}
                to={"/blog/" + node.parent.relativeDirectory + "/"}
              >
                {title}
              </Link>
            </h2>
            <div
              sx={{
                margin: "5px 0",
                fontSize: 14,
              }}
            >
              {formatPostDate(node.frontmatter.date, language)}
            </div>
            <div
              sx={{
                color: "textLead",
                mt: 10,
                mb: 0,
              }}
            >
              {node.frontmatter.spoiler}
            </div>
          </div>
        )
      })}
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
          }
        }
      }
    }
  }
`
