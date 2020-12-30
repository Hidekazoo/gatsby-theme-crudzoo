import * as React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { IArticleNode } from "../types/Article"

import * as path from "path"
import * as withDefaults from "../utils/DefaultOptions"
import { useLocalizeData } from "../hooks/useLocalize"
interface ArticleListProps {
  articles: IArticleNode[]
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
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
            articlePath={article.node.parent.relativeDirectory}
          />
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
      <article className="md:flex mb-12 max-w-4xl border-b border-gray-400 pb-4">
        <div className="md:flex-shrink-0">
          <div className="hidden md:block">
            {featuredImage ? (
              <Img
                className="rounded-lg md:w-32"
                sizes={featuredImage}
                alt={`${title}-thumbnail`}
              />
            ) : (
              <div className="rounded-lg md:w-32" />
            )}
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 ">
          <div className="text-sm text-primary text-primary-600 font-bold">
            {displayDate}
          </div>
          <Link
            to={path.join(basePath, blogPath, articlePath)}
            className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
          >
            {title}
          </Link>
          <p className="mt-2 text-gray-600">{spoiler}</p>
        </div>
      </article>
    </>
  )
}
