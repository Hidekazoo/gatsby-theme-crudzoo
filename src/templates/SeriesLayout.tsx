import * as React from "react"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import "../styles/global.css"
import ArticleList from "../components/ArticleList"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

interface IProps {
  pageData: {
    title: string
    spoiler: string
    image: {
      childImageSharp: {
        fluid: any
      }
    } | null
  }
  postData: [
    {
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
  ]
}

export const SeriesLayout: React.FC<IProps> = props => {
  const { language } = useSiteMetadata()
  const { pageData, postData } = props

  const pageTitle = pageData.title
  const pageDescription = pageData.spoiler

  let pageImage = null
  if (pageData.image !== null) {
    pageImage = pageData.image!.childImageSharp.fluid
  }
  return (
    <Layout location={location}>
      <SEO lang={language} title={pageTitle} />

      <div className="max-w-screen-xl px-12 mx-auto">
        <div className="flex h-auto sm:flex-row h-64 my-10 md:max-w-4xl flex-col-reverse mx-auto">
          <div className="sm:w-1/2 w-full">
            <h1 className="text-primary text-3xl">{pageTitle}</h1>
            <div className="text-gray-600 mt-4 leading-relaxed">
              {pageDescription}
            </div>
          </div>

          <div className="sm:w-1/2 w-full">
            {pageImage && <Img sizes={pageImage} className="w-full" />}
          </div>
        </div>
        <div className="py-10 mt-10 md:max-w-4xl mx-auto">
          <ArticleList articles={postData} />
        </div>
      </div>
    </Layout>
  )
}