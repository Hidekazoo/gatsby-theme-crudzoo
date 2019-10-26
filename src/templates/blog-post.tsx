/** @jsx jsx */
import { jsx } from "theme-ui"

import * as React from "react"
import { graphql } from "gatsby"
import { Styled } from "theme-ui"
import { getLocalizedData, formatPostDate } from "../utils/i18n"
import Bio from "../components/bio"
import ToggleDarkMode from "../components/toggleDarkMode"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tagList"

const { MDXRenderer } = require("gatsby-plugin-mdx")

interface IProps {
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
              changeTime: Date
            }
            body: string
            frontmatter: {
              title: string
              date: Date
              tags: string[]
              spoiler: string
              image: {
                childImageSharp: {
                  fluid: any
                }
              }
            }
          }
        }
      ]
    }
  }
}

const BlogPostTemplate: React.FC<IProps> = ({ data, location }) => {
  const lang = data.site.siteMetadata.language
  const localizedData = getLocalizedData(lang)
  const pageData = data.allMdx.edges[0].node
  const title = pageData.frontmatter.title
  const spoiler = pageData.frontmatter.spoiler
  const date = pageData.frontmatter.date
  const lastUpdate = pageData.parent.changeTime

  let featuredImage = null
  if (pageData.frontmatter.image !== null) {
    featuredImage = pageData.frontmatter.image.childImageSharp.fluid
  }

  return (
    <Styled.root>
      <Layout location={location}>
        <SEO lang={lang} title={title} description={spoiler} />
        {/* <ToggleDarkMode /> */}

        <Styled.h1
          sx={{
            color: "text",
            fontSize: [24, 24, 32],
            lineHeight: `40px`,
            fontWeight: "normal",
            mb: 10,
          }}
        >
          {title}
        </Styled.h1>
        {/* <PostTitle>{title}</PostTitle> */}

        <Styled.p
          sx={{
            mt: 0,
            mb: 30,
          }}
        >
          {date &&
            `${localizedData.BlogPost.update}：${formatPostDate(date, lang)}`}

          {lastUpdate && (
            <span style={{ marginLeft: "10px" }}>
              {`${localizedData.BlogPost.lastUpdate}: ${formatPostDate(
                lastUpdate,
                lang
              )}`}
            </span>
          )}
        </Styled.p>

        {/* {featuredImage && <Img sizes={featuredImage} />} */}
        <MDXRenderer>{pageData.body}</MDXRenderer>
        <hr
          sx={{
            backgroundColor: "gray",
            border: "none",
            height: "1px",
            mt: 24,
            mb: 32,
          }}
        />
        <TagList tags={pageData.frontmatter.tags} />
        <Bio />
      </Layout>
    </Styled.root>
  )
}

export default BlogPostTemplate
export const query = graphql`
  query BlogPostQuery($slug: String) {
    site {
      siteMetadata {
        language
      }
    }
    allMdx(filter: { id: { eq: $slug } }) {
      edges {
        node {
          parent {
            ... on File {
              changeTime(formatString: "MMMM DD, YYYY")
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            spoiler
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          body
        }
      }
    }
  }
`
