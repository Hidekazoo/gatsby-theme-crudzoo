import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "./Layout"
import { HomeHero } from "./HomeHero"
import { HomeRecentArticlesSection } from "./HomeRecentArticlesSection"

import SEO from "./Seo"
import { Button } from "./Button"

import { IArticleNode } from "../types/Article"
import { ISeriesNode } from "../types/Series"
import { ILocation } from "../types/Location"

import { useSiteMetadata } from "../hooks/useSiteMetadata"
import cn from "classnames"

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
  const { language, title, description, heroText, keywords } = useSiteMetadata()

  const articles = data.allMdx.edges

  return (
    <Layout location={location}>
      <SEO lang={language} title={title} keywords={keywords} />
      <HomeHero />
      <HomeRecentArticlesSection articles={articles} />
    </Layout>
  )
}
export default Home
