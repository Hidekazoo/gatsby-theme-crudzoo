import cn from "classnames"
import React from "react"
import { IArticleNode } from "src/types/Article"

import styles from "../styles/components/HomeRecentArticles.module.css"
import { HomeRecentArticle } from "./HomeRecentArticle"

interface HomeRecentArticlesProps {
  articles: IArticleNode[]
}
export const HomeRecentArticles: React.FC<HomeRecentArticlesProps> = props => {
  const { articles } = props
  return (
    <div className={cn(styles.articleList)}>
      {articles.map(article => {
        const frontmatter = article.node.frontmatter
        const featuredImage = frontmatter.image
          ? frontmatter.image.childImageSharp.fluid
          : null

        return (
          <div className={cn(styles.article)} key={article.node.id}>
            <HomeRecentArticle
              title={frontmatter.title}
              tags={frontmatter.tags}
              date={frontmatter.date}
              spoiler={frontmatter.spoiler}
              featuredImage={featuredImage}
              articlePath={article.node.parent.relativeDirectory}
            />
          </div>
        )
      })}
    </div>
  )
}
