/** @jsx jsx */
import { jsx } from "theme-ui"

import * as React from "react"
import { graphql } from "gatsby"
// import { Styled } from "theme-ui"
import { getLocalizedData } from "../utils/i18n"
import Bio from "../components/Bio"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import TagList from "../components/TagList"

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
    // <Styled.root>
    <Layout location={location}>
      <SEO lang={lang} title={title} description={spoiler} />

      <article className="min-h-screen w-full mx-auto max-w-3xl lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 pt-16 border-b border-gray-200 px-6">
        <h1 className="text-3xl">{title}</h1>
        <p className="text-gray-600 mt-3 mb-8">
          {date && `${localizedData.BlogPost.update}: ${date}`}

          {lastUpdate && (
            <span className="ml-4">{`${localizedData.BlogPost.lastUpdate}: ${lastUpdate}`}</span>
          )}
        </p>

        <MDXRenderer>{pageData.body}</MDXRenderer>
      </article>
      <div className="w-full mx-auto max-w-3xl lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 pb-40 px-6 pt-4">
        <TagList tags={pageData.frontmatter.tags} />

        <div className="flex flex-row justify-start mt-12">
          <Bio />
        </div>
      </div>
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
              changeTime(formatString: "Y年M月d日")
            }
          }
          frontmatter {
            title
            date(formatString: "Y年M月d日")
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
