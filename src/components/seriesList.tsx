import * as React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { ISeriesNode } from "../pages/index"

interface SeriesListProps {
  series: ISeriesNode[]
}

const SeriesList: React.FC<SeriesListProps> = ({ series }) => {
  return (
    <div className="flex flex-wrap ">
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
    <div className="sm:w-1/3 w-full sm:h-1/4 overflow-hidden sm:mb-6 mb-12 px-3">
      <div className="shadow-lg bg-white rounded py-4 sm:max-w-xs">
        <Link tabIndex={-1} aria-label={title} to={"/series/" + seriesId}>
          <Img
            className="w-24 h-24 rounded-full mx-auto pt-3 shadow-md"
            sizes={featuredImage}
            alt={`${title} image`}
          />
          <div className="px-6 py-3 overflow-hidden h-64">
            <div className="font-bold text-l sm:mb-2 mb-6">{title}</div>
            <p className="text-gray-700 text-base sm:text-sm">{spoiler}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
