import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

interface QueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

interface IProps {
  location: {
    pathname: string | undefined
  }
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
