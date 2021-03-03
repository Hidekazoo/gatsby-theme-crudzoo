import React from "react"
import { Link } from "gatsby"
import cn from "classnames"
import styles from "../styles/components/HomeRecentArticles.module.css"

const ArticleItem = () => {
  return (
    <Link to={`/`} className={cn(styles.articleItem)}>
      <article>
        <div className={cn(styles.articleImg)}>
          {/* {featuredImage ? (
          <Img
            className="rounded-lg md:w-32"
            fluid={featuredImage}
            alt={`${title}-thumbnail`}
          />
        ) : ( */}
          <div className={cn(styles.featuredImage)} />
          {/* )} */}
        </div>
        <div className={cn(styles.articleInfo)}>
          <h3 className={cn(styles.articleTitle)}>title</h3>
          <div className={cn(styles.articleSpoiler)}>spoiler</div>
          <div className={cn(styles.articleDate)}>2021年3月3日</div>
        </div>
      </article>
    </Link>
  )
}

export const HomeRecentArticles = () => {
  return (
    <div className={cn(styles.articleList)}>
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
    </div>
  )
}
