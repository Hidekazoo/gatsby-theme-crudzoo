import cn from "classnames"
import React from "react"

import { ISeriesNode } from "../../types/Series"
import { Series } from "./Series"
import styles from "./series-list.module.css"

interface ISeriesListProps {
  series: ISeriesNode[]
}

const SeriesList: React.FC<ISeriesListProps> = ({ series }) => {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.container)}>
        <div className={cn(styles.list)}>
          {series.map((item) => {
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
