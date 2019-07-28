import * as React from "react"
import { Link } from "gatsby"
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
          <Link
            key={article.node.id}
            style={{ boxShadow: `none`, textDecoration: `none` }}
            to={"/" + article.node.parent.relativeDirectory + "/"}
          >
            <Article
              title={frontmatter.title}
              date={frontmatter.date}
              spoiler={frontmatter.spoiler}
              featuredImage={featuredImage}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default ArticleList
