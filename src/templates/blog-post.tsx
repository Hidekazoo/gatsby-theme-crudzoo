import * as React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
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

const PostTitle = styled.h1`
  color: var(--textNormal);
`

const PostDate = styled.p`
  color: var(--textNormal);
  margin: 0;
`

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
    <Layout location={location}>
      <SEO lang={lang} title={title} description={spoiler} />
      {/* <ToggleDarkMode /> */}

      <PostTitle>{title}</PostTitle>

      <PostDate>
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
      </PostDate>

      {/* {featuredImage && <Img sizes={featuredImage} />} */}
      <MDXRenderer>{pageData.body}</MDXRenderer>
      <hr />
      <TagList tags={pageData.frontmatter.tags} />
      <Bio />
    </Layout>
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
