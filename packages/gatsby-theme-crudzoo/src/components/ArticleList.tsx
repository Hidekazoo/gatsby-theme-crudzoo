import cn from "classnames"
import React from "react"

import styles from "../styles/components/ArticleList.module.css"
import { IArticleNode } from "../types/Article"
import { Article } from "./article"

interface ArticleListProps {
  articles: IArticleNode[]
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className={cn(styles.articleList)}>
      {articles.map((article) => {
        const frontmatter = article.node.frontmatter
        const featuredImage = frontmatter.image
          ? frontmatter.image.childImageSharp.fluid
          : null

        return (
          <div className={cn(styles.layout)}>
            <Article
              key={article.node.id}
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
export default ArticleList
