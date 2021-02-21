import * as React from "react"
import { Bio } from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import TagList from "../components/TagList"
import { useLocalizeData } from "../hooks/useLocalize"
import { BlogPostFooterNav } from "../components/BlogPostFooterNav"
import { Comments } from "../components/Comments"

import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { BlogPostProps } from "../types/BlogPost"
const { MDXRenderer } = require("gatsby-plugin-mdx")

export const BlogPostLayout: React.FC<BlogPostProps> = props => {
  const { language } = useSiteMetadata()
  const localizedData = useLocalizeData()
  const pageData = props.pageData
  const title = pageData.frontmatter.title
  const spoiler = pageData.frontmatter.spoiler
  const date = pageData.frontmatter.date
  const id = pageData.id

  const lastUpdate = localizedData.getLocalizedDate(pageData.parent.changeTime)

  return (
    <Layout location={location}>
      <SEO lang={language} title={title} description={spoiler} />
      <article className="min-h-screen w-full mx-auto max-w-3xl lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 pt-16 border-b border-gray-200 px-6">
        <h1 className="text-3xl">{title}</h1>
        <p className="text-gray-600 mt-3 mb-8">
          {date &&
            `${localizedData.BlogPost.update}: ${localizedData.getLocalizedDate(
              date
            )}`}
          {lastUpdate && (
            <span className="ml-4">{`${localizedData.BlogPost.lastUpdate}: ${lastUpdate}`}</span>
          )}
        </p>
        <MDXRenderer>{pageData.body}</MDXRenderer>
      </article>
      <div className="w-full mx-auto max-w-3xl lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 pb-40 px-6 pt-4">
        <TagList tags={pageData.frontmatter.tags} />

        <div className="flex flex-row justify-start mt-6 mb-12">
          <Bio />
        </div>

        <BlogPostFooterNav pageContext={props.pageContext} />
        <Comments id={id} title={title} />
      </div>
    </Layout>
  )
}
