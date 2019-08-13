import * as React from "react"
import { Link } from "gatsby"
import styled from "../styles/styled"
import mq from "../styles/media"

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

  ${mq.small} {
    justify-content: center;
  }
`

const SeriesLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  max-width: 250px;

  ${mq.small} {
    max-width: 100%;
  }
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
          <SeriesLink
            key={item.node.id}
            tabIndex={-1}
            aria-label={frontmatter.title}
            to={"/series/" + item.node.seriesId}
          >
            <Series title={frontmatter.title} featuredImage={featuredImage} />
          </SeriesLink>
        )
      })}
    </SeriesListContainer>
  )
}

export default SeriesList
