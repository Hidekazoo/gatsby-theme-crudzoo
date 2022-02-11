import React from "react"

import { useSiteMetadata } from "../../hooks/useSiteMetadata"
import { IArticleNode } from "../../types/Article"
import { ILocation } from "../../types/Location"
import { ISeriesNode } from "../../types/Series"
import { Content } from "../content"
import { HomeHero } from "../home-hero"
import Layout from "../layout"
import SEO from "../seo"
import { HomeRecentArticlesSection } from "./HomeRecentArticlesSection"

interface HomeProps {
  location: ILocation
  data: {
    allSeriesJson: {
      totalCount: number
      edges: ISeriesNode[]
    }
    allMdx: {
      edges: IArticleNode[]
    }
  }
}

export const Home: React.FC<HomeProps> = ({ data, location }) => {
  const { language, title, keywords, heroText, description } = useSiteMetadata()

  const articles = data.allMdx.edges

  return (
    <Layout location={location}>
      <SEO lang={language} title={title} keywords={keywords} />
      <HomeHero heroText={heroText} description={description} />
      <Content>
        <HomeRecentArticlesSection articles={articles} />
      </Content>
    </Layout>
  )
}
export default Home
