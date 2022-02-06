import cn from "classnames"
import { Link } from "gatsby"
import Img from "gatsby-image"
import * as path from "path"
import React from "react"

import { useLocalizeData } from "../../hooks/useLocalize"
import * as withDefaults from "../../utils/DefaultOptions"
import styles from "./styles.module.css"

interface IArticleProps {
  title: string
  date: Date
  tags: string[] | undefined
  spoiler: string | undefined
  featuredImage: any
  articlePath: string
}

export const Article: React.FC<IArticleProps> = ({
  title,
  date,
  tags,
  spoiler,
  featuredImage,
  articlePath,
}) => {
  const { basePath, blogPath } = withDefaults({})
  const { getLocalizedDate } = useLocalizeData()
  const displayDate = getLocalizedDate(date)
  console.log(tags)
  return (
    <>
      <Link to={path.join(basePath, blogPath, articlePath)}>
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
            <div className={cn(styles.title)}>{title}</div>
            <div className={cn(styles.tags)}>
              {tags &&
                tags.map((tag, index) => {
                  return (
                    <div key={index} className={cn(styles.tag)}>
                      {tag}
                    </div>
                  )
                })}
            </div>
          </div>
        </article>
      </Link>
    </>
  )
}
