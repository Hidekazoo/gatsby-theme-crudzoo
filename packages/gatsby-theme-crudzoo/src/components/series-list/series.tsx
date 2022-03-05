import cn from "classnames"
import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import styles from "./series.module.css"

interface SeriesProps {
  title: string
  spoiler: string
  seriesId: string
  featuredImage: any
}

export const Series: React.FC<SeriesProps> = ({
  title,
  featuredImage,
  seriesId,
  spoiler,
}) => {
  return (
    <div className={cn(styles.seriesCard)}>
      <div className={cn(styles.seriesContnt)}>
        <Link tabIndex={-1} aria-label={title} to={"/series/" + seriesId}>
          <Img
            className={cn(styles.seriesImg)}
            fluid={featuredImage}
            alt={`${title} image`}
            imgStyle={{
              objectFit: "cover",
            }}
          />
          <div className={cn(styles.seriesInfo)}>
            <div className={cn(styles.seriesTitle)}>{title}</div>
            <p className={cn(styles.seriesSpoiler)}>{spoiler}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
