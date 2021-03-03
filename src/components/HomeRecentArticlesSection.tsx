import React from "react"
import cn from "classnames"
import { HomeSectionTitle } from "./HomeSectionTitle"
import { HomeRecentArticles } from "./HomeRecentArticles"
import { HomeRecentArticlesSidebar } from "./HomeRecentArticlesSidebar"
import styles from "../styles/components/HomeRecentArticlesSection.module.css"

export const HomeRecentArticlesSection = () => {
  return (
    <div className={cn(styles.container)}>
      <HomeSectionTitle title={`Recent Articles`} />
      <div className={cn(styles.content)}>
        <div className={cn(styles.layoutGrid)}>
          <HomeRecentArticles />
        </div>
        <div className={cn(styles.layoutGrid)}>
          <HomeRecentArticlesSidebar />
        </div>
      </div>
    </div>
  )
}
