import * as React from "react"
import Img from "gatsby-image"
import { Bio } from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import TagList from "../components/TagList"
import { useLocalizeData } from "../hooks/useLocalize"
import { BlogPostProps } from "../types/BlogPost"
import { StarRateBox } from "../components/StarRateBox"
import { Comments } from "../components/Comments"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { BlogPostFooterNav } from "../components/BlogPostFooterNav"
const { MDXRenderer } = require("gatsby-plugin-mdx")

export const BookReviewLayout: React.FC<BlogPostProps> = props => {
  const { language } = useSiteMetadata()
  const localizedData = useLocalizeData()
  const pageData = props.pageData
  const title = pageData.frontmatter.title
  const spoiler = pageData.frontmatter.spoiler
  const link = pageData.frontmatter.link ? pageData.frontmatter.link : ""
  const score = pageData.frontmatter.score ? pageData.frontmatter.score : 0
  const date = pageData.frontmatter.date
  const id = pageData.id

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
      <SEO lang={language} title={title} description={spoiler} />

      <article className="min-h-screen w-full mx-auto max-w-3xl lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 pt-16 border-b border-gray-200 px-6">
        {renderTitle({ title, featuredImage })}

        <MDXRenderer>{pageData.body}</MDXRenderer>
      </article>
      <div className="w-full mx-auto max-w-3xl lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 pb-40 px-6 pt-4">
        <TagList tags={pageData.frontmatter.tags} />

        <div className="flex flex-row justify-start mt-6 mb-12">
          <Bio />
        </div>
        <BlogPostFooterNav pageContext={props.pageContext} />
        <div>
          <Comments id={id} title={title} />
        </div>
      </div>
    </Layout>
  )
}
