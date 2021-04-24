import React from "react"
import Layout from "./Layout"
import { Content } from "../components/Content"
import { HomeHero } from "./HomeHero"
import { HomeRecentArticlesSection } from "./HomeRecentArticlesSection"
import SEO from "./Seo"

import { IArticleNode } from "../types/Article"
import { ISeriesNode } from "../types/Series"
import { ILocation } from "../types/Location"

import { useSiteMetadata } from "../hooks/useSiteMetadata"
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
