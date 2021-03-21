import React from "react"
import { Link } from "gatsby"
import cn from "classnames"
import { HomeSectionTitle } from "./HomeSectionTitle"
import { HomeRecentArticles } from "./HomeRecentArticles"
import { HomeRecentArticlesSidebar } from "./HomeRecentArticlesSidebar"
import { Button } from "./Button"
import styles from "../styles/components/HomeRecentArticlesSection.module.css"
import { IArticleNode } from "src/types/Article"
import { useLocalizeData } from "../hooks/useLocalize"
interface HomeRecentArticlesProps {
  articles: IArticleNode[]
}
export const HomeRecentArticlesSection: React.FC<HomeRecentArticlesProps> = props => {
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
