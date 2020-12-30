import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { ILocation } from "../types/Location"
interface QueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

interface IProps {
  location: ILocation
}
const NotFoundPage: React.FC<IProps> = ({ location }) => {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              author
            }
          }
        }
      `}
      render={(data: QueryData) => {
        return (
          <Layout location={location}>
            <SEO title="404: Not Found">
              <h1>該当のページが見つかりませんでした</h1>
            </SEO>
          </Layout>
        )
      }}
    />
  )
}

export default NotFoundPage
