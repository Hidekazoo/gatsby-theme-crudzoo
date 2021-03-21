import * as React from "react"
import { Link } from "gatsby"
import cn from "classnames"
import Img from "gatsby-image"
import { ISeriesNode } from "../types/Series"
import styles from "../styles/components/SeriesList.module.css"
interface ISeriesListProps {
  series: ISeriesNode[]
}

const SeriesList: React.FC<ISeriesListProps> = ({ series }) => {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.container)}>
        <div className={cn(styles.list)}>
          {series.map(item => {
            const frontmatter = item.node
            const featuredImage = frontmatter.image
              ? frontmatter.image.childImageSharp.fluid
              : null
            return (
              <Series
                key={item.node.id}
                title={frontmatter.title}
                featuredImage={featuredImage}
                seriesId={item.node.seriesId}
                spoiler={item.node.spoiler}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SeriesList

interface SeriesProps {
  title: string
  spoiler: string
  seriesId: string
  featuredImage: any
}

const Series: React.FC<SeriesProps> = ({
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
            sizes={featuredImage}
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
