import cn from "classnames"
import Img from "gatsby-image"
import React from "react"
import { ILocation } from "src/types/Location"

import ArticleList from "../components/article-list"
import { Content } from "../components/content"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import styles from "../styles/components/SeriesLayout.module.css"
import { IArticleNode } from "../types/Article"

interface IProps {
  location: ILocation
  pageData: {
    title: string
    spoiler: string
    image: {
      childImageSharp: {
        fluid: any
      }
    } | null
  }
  postData: IArticleNode[]
}

export const SeriesLayout: React.FC<IProps> = (props) => {
  const { language } = useSiteMetadata()
  const { pageData, postData } = props

  const pageTitle = pageData.title
  const pageDescription = pageData.spoiler

  let pageImage = null
  if (pageData.image !== null) {
    pageImage = pageData.image.childImageSharp.fluid
  }
  return (
    <Layout location={props.location}>
      <SEO lang={language} title={pageTitle} />

      <div className={cn(styles.hero)}>
        <div className={cn(styles.heroContainer)}>
          <div className={cn(styles.left)}>
            <div className={cn(styles.heroImg)}>
              {pageImage && <Img fluid={pageImage} />}
            </div>
          </div>
          <div className={cn(styles.right)}>
            <h1 className={cn(styles.heroTitle)}>{pageTitle}</h1>
            <div className={cn(styles.heroDescription)}>{pageDescription}</div>
          </div>
        </div>
      </div>

      <Content>
        <div className={cn(styles.container)}></div>
        <div className="py-10 mt-10 md:max-w-4xl mx-auto">
          <ArticleList articles={postData} />
        </div>
      </Content>
    </Layout>
  )
}
