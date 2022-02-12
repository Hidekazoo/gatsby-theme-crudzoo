import cn from "classnames"
import { Link } from "gatsby"
import React from "react"
import { IArticleNode } from "src/types/Article"

import { useLocalizeData } from "../../hooks/useLocalize"
import { Button } from "../button"
import { HomeRecentArticles } from "./HomeRecentArticles"
import styles from "./HomeRecentArticlesSection.module.css"
import { HomeRecentArticlesSidebar } from "./HomeRecentArticlesSidebar"
import { HomeSectionTitle } from "./HomeSectionTitle"

interface HomeRecentArticlesProps {
  articles: IArticleNode[]
}
export const HomeRecentArticlesSection: React.FC<HomeRecentArticlesProps> = (
  props
) => {
  const { articles } = props
  const { Archive } = useLocalizeData()
  return (
    <div className={cn(styles.container)}>
      <HomeSectionTitle title={`Recent Articles`} />
      <div className={cn(styles.content)}>
        <div className={cn(styles.main)}>
          <HomeRecentArticles articles={articles} />
          <div className={cn(styles.listButton)}>
            <Link to="/blogs">
              <Button>{Archive.list}</Button>
            </Link>
          </div>
        </div>
        <div className={cn(styles.sidebar)}>
          <HomeRecentArticlesSidebar />
        </div>
      </div>
    </div>
  )
}
