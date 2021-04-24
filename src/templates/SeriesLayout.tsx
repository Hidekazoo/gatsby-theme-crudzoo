import React from "react"
import cn from "classnames"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import { Content } from "../components/Content"
import SEO from "../components/Seo"
import ArticleList from "../components/ArticleList"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { IArticleNode } from "../types/Article"
import { ILocation } from "src/types/Location"
import styles from "../styles/components/SeriesLayout.module.css"

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

export const SeriesLayout: React.FC<IProps> = props => {
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
