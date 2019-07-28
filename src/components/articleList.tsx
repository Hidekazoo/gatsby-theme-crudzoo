import * as React from "react"
import Article from "./article"
import { IArticleNode } from "../pages/index"

interface IProps {
  articles: IArticleNode[]
}

const ArticleList: React.FC<IProps> = ({ articles }) => {
  return (
    <div>
      {articles.map(article => {
        const frontmatter = article.node.frontmatter
        const featuredImage = frontmatter.image
          ? frontmatter.image.childImageSharp.fluid
          : null

        return (
          <Article
            key={article.node.id}
            title={frontmatter.title}
            date={frontmatter.date}
            spoiler={frontmatter.spoiler}
            featuredImage={featuredImage}
            path={article.node.parent.relativeDirectory}
          />
        )
      })}
    </div>
  )
}

export default ArticleList
