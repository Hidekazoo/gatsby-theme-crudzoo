import React from "react"
import { ILocation } from "src/types/Location"

import SeriesList from "."
import { useSiteMetadata } from "../../hooks/useSiteMetadata"
import { ISeriesNode } from "../../types/Series"
import { Content } from "../content"
import Layout from "../layout"
import SEO from "../seo"
import { TextHero } from "../text-hero"

interface SeriesProps {
  location: ILocation
  data: {
    allSeriesJson: {
      totalCount: number
      edges: ISeriesNode[]
    }
  }
}

export const Series: React.FC<SeriesProps> = ({ data, location }) => {
  const { language, title, keywords } = useSiteMetadata()
  const seriesData = data.allSeriesJson.edges
  return (
    <Layout location={location}>
      <SEO lang={language} title={title} keywords={keywords} />
      <TextHero title={`Series`} />
      <Content>
        <SeriesList series={seriesData} />
      </Content>
    </Layout>
  )
}
