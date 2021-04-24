import React from "react"
import Layout from "./Layout"
import SEO from "./Seo"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { TextHero } from "./TextHero"
import { ILocation } from "src/types/Location"
import { ISeriesNode } from "../types/Series"
import SeriesList from "./SeriesList"
import { Content } from "../components/Content"

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
