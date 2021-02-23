import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

import { HomePageProps } from "../types/Home"
import { HomePageHero } from "../components/HomePageHero"
import SEO from "../components/Seo"
import { Button } from "../components/Button"
import { Section } from "../components/Section"
import ArticleList from "../components/ArticleList"
import SeriesList from "../components/SeriesList"
import { useLocalizeData } from "../hooks/useLocalize"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

import "../styles/tailwind.css"
import "../styles/global.css"

export const HomePageLayout: React.FC<HomePageProps> = ({ data, location }) => {
  const { language, title, description, heroText, keywords } = useSiteMetadata()
  const localizedData = useLocalizeData()
  const seriesCount = data.allSeriesJson.totalCount
  const seriesData = data.allSeriesJson.edges
  const postData = data.allMdx.edges

  return (
    <Layout location={location}>
      <SEO lang={language} title={title} keywords={keywords} />
      <HomePageHero heroText={heroText} description={description} />

      {seriesCount > 0 && (
        <Section isBgColor={true}>
          <SectionTitle>Series</SectionTitle>
          <SeriesList series={seriesData}></SeriesList>
        </Section>
      )}
      <Section isBgColor={false}>
        <SectionTitle>Articles</SectionTitle>
        <ArticleList articles={postData} />
        <div className="flex justify-center">
          <Link to="/blogs">
            <Button>{localizedData.Archive.list}</Button>
          </Link>
        </div>
      </Section>
    </Layout>
  )
}

const SectionTitle: React.FC = ({ children }) => {
  return <div className="text-primary text-4xl mb-10">{children}</div>
}
