import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Series from "./series"
import { ISeriesNode } from "../pages/index"

interface IProps {
  series: ISeriesNode[]
}

const SeriesListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
`

const SeriesList: React.FC<IProps> = ({ series }) => {
  return (
    <SeriesListContainer>
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
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              maxWidth: "250px",
            }}
            to={"/series/" + item.node.seriesId}
          >
            <Series title={frontmatter.title} featuredImage={featuredImage} />
          </Link>
        )
      })}
    </SeriesListContainer>
  )
}

export default SeriesList
