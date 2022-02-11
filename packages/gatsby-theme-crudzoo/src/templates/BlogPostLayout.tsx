import cn from "classnames"
import React from "react"

import { Comments } from "../components/Comments"
import { BlogPostFooterNav } from "../components/blog-post/BlogPostFooterNav"
import { BlogPostProvider } from "../components/blog-post/BlogPostProvider"
import { Content } from "../components/content"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tag-list"
import { useBlogScrollPosition } from "../hooks/useBlogScrollPosition"
import { useLocalizeData } from "../hooks/useLocalize"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import styles from "../styles/components/BlogPostLayout.module.css"
import { BlogPostProps } from "../types/BlogPost"
import { INode, IPageContext } from "../types/BlogPost"

const { MDXRenderer } = require("gatsby-plugin-mdx")

export const BlogPostLayout: React.FC<BlogPostProps> = (props) => {
  const { language } = useSiteMetadata()
  const pageData = props.pageData
  const title = pageData.frontmatter.title
  const spoiler = pageData.frontmatter.spoiler

  const headings = pageData.headings.filter((item) => item.depth === 2)
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
    <Layout location={props.location}>
      <Content>
        <div>
          <SEO lang={language} title={title} description={spoiler} />
          <BlogPostMain pageData={pageData} pageContext={props.pageContext} />
        </div>
      </Content>
    </Layout>
  )
}

interface BlogPostMainProps {
  pageData: INode
  pageContext: IPageContext
  titleComponent?: React.ReactNode
}
export const BlogPostMain: React.FC<BlogPostMainProps> = (props) => {
  const { pageData, pageContext } = props
  const localizedData = useLocalizeData()
  const title = pageData.frontmatter.title
  const date = pageData.frontmatter.date
  const id = pageData.id
  const lastUpdate = localizedData.getLocalizedDate(pageData.parent.changeTime)

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.main)}>
        <BlogPostProvider>
          <article>
            {props.titleComponent ? (
              props.titleComponent
            ) : (
              <React.Fragment>
                <h1 className={cn(styles.title)}>{title}</h1>
                <p className={cn(styles.date)}>
                  {date &&
                    `${
                      localizedData.BlogPost.update
                    }: ${localizedData.getLocalizedDate(date)}`}
                  {lastUpdate && (
                    <span
                      style={{ marginLeft: "8px" }}
                    >{`${localizedData.BlogPost.lastUpdate}: ${lastUpdate}`}</span>
                  )}
                </p>
              </React.Fragment>
            )}

            <MDXRenderer>{pageData.body}</MDXRenderer>
          </article>
        </BlogPostProvider>
        <hr className={cn(styles.hr)} />
        <div className={cn(styles.tags)}>
          <TagList tags={pageData.frontmatter.tags} />

          <BlogPostFooterNav pageContext={pageContext} />
          <Comments id={id} title={title} />
        </div>
      </div>
      {/* <div className={cn(styles.sidebar)}>{renderTableOfContents()}</div> */}
    </div>
  )
}
