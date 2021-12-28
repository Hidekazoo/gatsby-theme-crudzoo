import React from "react"
import { ILocation } from "src/types/Location"

import { Content } from "../components/Content"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { ISeriesNode } from "../types/Series"
import Layout from "./Layout"
import SEO from "./Seo"
import SeriesList from "./SeriesList"
import { TextHero } from "./TextHero"

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
