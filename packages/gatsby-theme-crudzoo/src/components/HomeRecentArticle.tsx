import cn from "classnames"
import { Link } from "gatsby"
import Img from "gatsby-image"
import * as path from "path"
import React from "react"

import { useLocalizeData } from "../hooks/useLocalize"
import styles from "../styles/components/HomeRecentArticle.module.css"
import * as withDefaults from "../utils/DefaultOptions"

interface HomeRecentArticleProps {
  title: string
  date: Date
  spoiler: string | undefined
  featuredImage: any
  articlePath: string
  tags: string[] | undefined
}
export const HomeRecentArticle: React.FC<HomeRecentArticleProps> = props => {
  const { title, date, spoiler, featuredImage, articlePath } = props
  const { basePath, blogPath } = withDefaults({})
  const { getLocalizedDate } = useLocalizeData()
  const displayDate = getLocalizedDate(date)
  return (
    <Link
      to={path.join(basePath, blogPath, articlePath)}
      className={cn(styles.articleItem)}
    >
      <article>
        <div className={cn(styles.articleImg)}>
          {featuredImage ? (
            <Img
              className={cn(styles.featuredImage)}
              fluid={featuredImage}
              alt={`${title}-thumbnail`}
              imgStyle={{
                objectFit: "contain",
              }}
            />
          ) : (
            <div className={cn(styles.featuredImage)} />
          )}
        </div>
        <div className={cn(styles.articleInfo)}>
          <h3 className={cn(styles.articleTitle)}>{title}</h3>
          <div className={cn(styles.articleSpoiler)}>{spoiler}</div>
          <div className={cn(styles.articleDate)}>{displayDate}</div>
        </div>
      </article>
    </Link>
  )
}
