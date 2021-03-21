import * as React from "react"
import { BlogPostProvider } from "../components/BlogPostProvider"
import { Bio } from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import TagList from "../components/TagList"
import { useLocalizeData } from "../hooks/useLocalize"
import { BlogPostFooterNav } from "../components/BlogPostFooterNav"
import { Comments } from "../components/Comments"

import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { useBlogScrollPosition } from "../hooks/useBlogScrollPosition"
import { BlogPostProps } from "../types/BlogPost"
import styles from "../styles/components/BlogPostLayout.module.css"
import cn from "classnames"
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

  const headings = pageData.headings.filter(item => item.depth === 2)
  const { activeHeadingNumber } = useBlogScrollPosition()
  const renderTableOfContents = () => {
    const contents: React.ReactNode[] = []
    for (let i = 0; i < headings.length; i++) {
      const activeClass =
        activeHeadingNumber === i ? "text-blue-400 font-bold" : ""
      contents.push(
        <li key={i} className={activeClass}>
          <a href={`#${headings[i]["value"]}`}>{headings[i]["value"]}</a>
        </li>
      )
    }
    return (
      <div className={cn(styles.tableOfContnts)}>
        <ul>
          <li>目次</li>
          {contents}
        </ul>
      </div>
    )
  }

  return (
    <Layout location={location}>
      <div>
        <SEO lang={language} title={title} description={spoiler} />
        <div className={cn(styles.container)}>
          <div className={cn(styles.main)}>
            <BlogPostProvider>
              <article>
                <h1 className={cn(styles.title)}>{title}</h1>
                <p className={cn(styles.date)}>
                  {date &&
                    `${
                      localizedData.BlogPost.update
                    }: ${localizedData.getLocalizedDate(date)}`}
                  {lastUpdate && (
                    <span className="ml-4">{`${localizedData.BlogPost.lastUpdate}: ${lastUpdate}`}</span>
                  )}
                </p>
                <MDXRenderer>{pageData.body}</MDXRenderer>
              </article>
            </BlogPostProvider>
            <hr className={cn(styles.hr)} />
            <div className={cn(styles.tags)}>
              <TagList tags={pageData.frontmatter.tags} />

              <BlogPostFooterNav pageContext={props.pageContext} />
              <Comments id={id} title={title} />
            </div>
          </div>
          {/* <div className={cn(styles.sidebar)}>{renderTableOfContents()}</div> */}
        </div>
      </div>
    </Layout>
  )
}
