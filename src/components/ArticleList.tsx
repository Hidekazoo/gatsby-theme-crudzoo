import * as React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { IArticleNode } from "../types/Article"
import * as path from "path"
import * as withDefaults from "../utils/DefaultOptions"
import { useLocalizeData } from "../hooks/useLocalize"
import styles from "../styles/components/ArticleList.module.css"
import cn from "classnames"

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

interface IArticleProps {
  title: string
  date: Date
  spoiler: string | undefined
  featuredImage: any
  articlePath: string
}

const Article: React.FC<IArticleProps> = ({
  title,
  date,
  spoiler,
  featuredImage,
  articlePath,
}) => {
  const { basePath, blogPath } = withDefaults({})
  const { getLocalizedDate } = useLocalizeData()
  const displayDate = getLocalizedDate(date)

  return (
    <>
      <article className={cn(styles.article)}>
        <div className={cn(styles.articleImg)}>
          <div>
            {featuredImage ? (
              <Img
                fluid={featuredImage}
                alt={`${title}-thumbnail`}
                imgStyle={{
                  objectFit: "contain",
                }}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className={cn(styles.articleContent)}>
          <div className={cn(styles.articleDate)}>{displayDate}</div>
          <Link
            to={path.join(basePath, blogPath, articlePath)}
            className={cn(styles.articleTitle)}
          >
            {title}
          </Link>
          {/* <p className={cn(styles.articleSpoiler)}>{spoiler}</p> */}
        </div>
      </article>
    </>
  )
}
