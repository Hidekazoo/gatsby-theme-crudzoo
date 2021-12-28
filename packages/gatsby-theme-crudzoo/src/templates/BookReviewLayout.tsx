import React from "react"
import cn from "classnames"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { useLocalizeData } from "../hooks/useLocalize"
import { BlogPostProps } from "../types/BlogPost"
import { StarRateBox } from "../components/StarRateBox"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

import { Content } from "../components/Content"
import { BlogPostMain } from "../templates/BlogPostLayout"
import styles from "../styles/components/BookReviewLayout.module.css"

export const BookReviewLayout: React.FC<BlogPostProps> = props => {
  const { language } = useSiteMetadata()
  const localizedData = useLocalizeData()
  const pageData = props.pageData
  const title = pageData.frontmatter.title
  const spoiler = pageData.frontmatter.spoiler
  const link = pageData.frontmatter.link ? pageData.frontmatter.link : ""
  const score = pageData.frontmatter.score ? pageData.frontmatter.score : 0
  const date = pageData.frontmatter.date

  const lastUpdate = localizedData.getLocalizedDate(pageData.parent.changeTime)

  const featuredImage = pageData.frontmatter.image
    ? pageData.frontmatter.image.childImageSharp.fluid
    : null

  const renderTitle: React.FC = () => {
    return (
      <div className={cn(styles.container)}>
        <Img
          className={cn(styles.img)}
          fluid={featuredImage}
          alt={`${title}-thumbnail`}
        />
        <div className={cn(styles.content)}>
          <h1 className={cn(styles.title)}>{title}</h1>
          <div className={cn(styles.starRate)}>
            <StarRateBox score={score} />
          </div>
          <p className={cn(styles.spoiler)}>{spoiler}</p>
          <div className={cn(styles.footer)}>
            {link && (
              <div className={cn(styles.link)}>
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
              <span
                className={cn(styles.lastUpdate)}
              >{`${localizedData.BlogPost.lastUpdate}: ${lastUpdate}`}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout location={location}>
      <Content>
        <div>
          <SEO lang={language} title={title} description={spoiler} />
          <BlogPostMain
            pageData={pageData}
            pageContext={props.pageContext}
            titleComponent={renderTitle()}
          />
        </div>
      </Content>
    </Layout>
  )
}
