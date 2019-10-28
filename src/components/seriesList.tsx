/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { Link } from "gatsby"

import Series from "./series"
import { ISeriesNode } from "../pages/index"

interface IProps {
  series: ISeriesNode[]
}

const SeriesList: React.FC<IProps> = ({ series }) => {
  return (
    <div
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "fit-content",
        maxWidth: "100%",
        overflowX: "auto",
        justifyContent: ["center", "", ""],
      }}
    >
      {series.map(item => {
        const frontmatter = item.node
        const featuredImage = frontmatter.image
          ? frontmatter.image.childImageSharp.fluid
          : null

        return (
          <Link
            key={item.node.id}
            tabIndex={-1}
            aria-label={frontmatter.title}
            to={"/series/" + item.node.seriesId}
            sx={{
              boxShadow: "none",
              textDecoration: "none",
              maxWidth: ["100%", "250px", "250px"],
            }}
          >
            <Series title={frontmatter.title} featuredImage={featuredImage} />
          </Link>
        )
      })}
    </div>
  )
}

export default SeriesList
