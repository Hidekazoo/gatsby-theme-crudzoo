import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import Bio from "../components/Bio"
import SEO from "../components/Seo"

import ArticleList from "../components/ArticleList"
import SeriesList from "../components/SeriesList"
import "../styles/tailwind.css"
import "../styles/global.css"

export interface ISeriesNode {
  node: {
    id: string
    title: string
    seriesId: string
    spoiler: string
    image: {
      childImageSharp: {
        fluid: any
      }
    } | null
  }
}

export interface IArticleNode {
  node: {
    body: string
    parent: {
      name: string
      relativeDirectory: string
    }
    id: string
    frontmatter: {
      title: string
      date: Date
      spoiler: string | undefined
      image: {
        childImageSharp: {
          fluid: any
        }
      } | null
    }
  }
}

interface IProps {
  location: {
    pathname: string | undefined
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        heroText: string
        language: string
        keywords: string[]
        mainColor: string
        description: string
      }
    }
    allSeriesJson: {
      totalCount: number
      edges: ISeriesNode[]
    }
    allMdx: {
      edges: IArticleNode[]
    }
  }
}

const PrimaryColorSpan: React.FC = ({ children }) => {
  return <span className="text-primary font-medium">{children}</span>
}

interface HeroProps {
  heroText: string
  description: string
}
const Hero: React.FC<HeroProps> = ({ heroText, description }) => {
  return (
    <div className="w-full max-w-screen-xl relative mx-auto px-6 pt-16 pb-40 md:pb-24">
      <div className=" -mx-6">
        <div className="px-6 text-left md:text-center max-w-2xl md:max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
            <PrimaryColorSpan>{heroText}</PrimaryColorSpan>
          </h1>
          <p className="mt-6 leading-relaxed sm:text-lg md:text-xl text-gray-600">
            {description}
          </p>
          <div className="flex mt-12 justify-start md:justify-center">
            <Bio />
          </div>
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  isBgColor: boolean
}
const Section: React.FC<SectionProps> = ({ children, isBgColor }) => {
  const bgColor = isBgColor && "bg-section"
  return (
    <div className={`mt-10 py-16 ${bgColor}`}>
      <div className="max-w-screen-xl px-12 mx-auto md:max-w-4xl">
        {children}
      </div>
    </div>
  )
}
const SectionTitle: React.FC = ({ children }) => {
  return <div className="text-primary text-4xl mb-10">{children}</div>
}

const TopPage: React.FC<IProps> = ({ data, location }) => {
  const { language, title, description, heroText } = data.site.siteMetadata

  const seriesCount = data.allSeriesJson.totalCount
  const seriesData = data.allSeriesJson.edges
  const keywords = data.site.siteMetadata.keywords
  const postData = data.allMdx.edges

  return (
    <Layout location={location}>
      <SEO lang={language} title={title} keywords={keywords} />
      <Hero heroText={heroText} description={description} />

      {seriesCount > 0 && (
        <Section isBgColor={true}>
          <SectionTitle>Series</SectionTitle>
          <SeriesList series={seriesData}></SeriesList>
        </Section>
      )}
      <Section isBgColor={false}>
        <SectionTitle>Articles</SectionTitle>
        <ArticleList articles={postData} />
      </Section>
    </Layout>
  )
}

export default TopPage

export const query = graphql`
  query MDXQuery {
    site {
      siteMetadata {
        title
        heroText
        description
        language
        keywords
        mainColor
      }
    }
    allSeriesJson {
      totalCount
      edges {
        node {
          id
          title
          seriesId
          spoiler
          image {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          body
          parent {
            ... on File {
              name
              relativeDirectory
            }
          }
          id
          frontmatter {
            title
            date(formatString: "Y年M月D日")
            spoiler
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
