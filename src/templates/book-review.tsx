import * as React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { Bio } from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import TagList from "../components/TagList"
import { useLocalizeData } from "../hooks/useLocalize"
import { ILocation } from "../types/Location"
import { StarRateBox } from "../components/StarRateBox"

const { MDXRenderer } = require("gatsby-plugin-mdx")

interface INode {
  parent: {
    changeTime: Date
    relativeDirectory: string
  }
  body: string
  frontmatter: {
    title: string
    date: Date
    update: Date
    tags: string[]
    spoiler: string
    link?: string
    score?: number
    image: {
      childImageSharp: {
        fluid: any
      }
    }
  }
}
interface IProps {
  location: ILocation
  data: {
    site: {
      siteMetadata: {
        language: string
      }
    }
    allMdx: {
      edges: [
        {
          node: INode
        }
      ]
    }
  }
  pageContext: {
    prev: {
      parent: {
        relativeDirectory: string
      }
      frontmatter: {
        title: string
        tags: string[]
      }
    }
    next: {
      parent: {
        relativeDirectory: string
      }
      frontmatter: {
        title: string
        tags: string[]
      }
    }
  }
}

const BookReviewTemplate: React.FC<IProps> = ({
  data,
  location,
  pageContext,
}) => {
  const lang = data.site.siteMetadata.language
  const localizedData = useLocalizeData()
  const pageData = data.allMdx.edges[0].node
  const title = pageData.frontmatter.title
  const spoiler = pageData.frontmatter.spoiler
  const link = pageData.frontmatter.link ? pageData.frontmatter.link : ""
  const score = pageData.frontmatter.score ? pageData.frontmatter.score : 0
  const date = pageData.frontmatter.date
  const { prev, next } = pageContext

  const lastUpdate = localizedData.getLocalizedDate(pageData.parent.changeTime)

  const featuredImage = pageData.frontmatter.image
    ? pageData.frontmatter.image.childImageSharp.fluid
    : null

  const renderTitle: React.FC<any> = () => {
    return (
      <div className="flex mb-12">
        <Img
          className="rounded-lg "
          sizes={featuredImage}
          alt={`${title}-thumbnail`}
          style={{ minWidth: "30%" }}
        />
        <div className="ml-6 flex flex-col">
          <h1 className="text-3xl mb-3">{title}</h1>
          <StarRateBox score={score} />
          <p className="text-gray-600 mt-3">{spoiler}</p>
          <div className="text-gray-600 mt-auto">
            {link && (
              <div className="truncate mb-2">
                Link：
                <a href={link} target="_blank">
                  {link}
                </a>
              </div>
            )}
            {date &&
              `${
                localizedData.BlogPost.update
              }: ${localizedData.getLocalizedDate(date)}`}
            {lastUpdate && (
              <span className="ml-4">{`${localizedData.BlogPost.lastUpdate}: ${lastUpdate}`}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout location={location}>
      <SEO lang={lang} title={title} description={spoiler} />

      <article className="min-h-screen w-full mx-auto max-w-3xl lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 pt-16 border-b border-gray-200 px-6">
        {renderTitle({ title, featuredImage })}

        <MDXRenderer>{pageData.body}</MDXRenderer>
      </article>
      <div className="w-full mx-auto max-w-3xl lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 pb-40 px-6 pt-4">
        <TagList tags={pageData.frontmatter.tags} />

        <div className="flex flex-row justify-start mt-6 mb-12">
          <Bio />
        </div>

        <nav>
          <div>
            {prev && (
              <>
                <h2 className="text-gray-600 text-md mt-5 break-normal">
                  {localizedData.Archive.prev}
                </h2>
                <Link to={`/blog/${prev.parent.relativeDirectory}`} rel="prev">
                  {prev.frontmatter.title}
                </Link>
              </>
            )}
          </div>

          <div>
            {next && (
              <>
                <h2 className="text-gray-600 text-md mt-5 break-all w-full leading-10">
                  {localizedData.Archive.prev}
                </h2>
                <Link to={`/blog/${next.parent.relativeDirectory}`} rel="next">
                  {next.frontmatter.title}
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </Layout>
  )
}

export default BookReviewTemplate
export const query = graphql`
  query BookQuery($slug: String) {
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
              changeTime
            }
          }
          frontmatter {
            title
            date
            tags
            spoiler
            link
            score
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
