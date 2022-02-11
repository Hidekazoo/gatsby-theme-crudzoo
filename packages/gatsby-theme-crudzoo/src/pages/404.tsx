import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ILocation } from "../types/Location"

interface IProps {
  location: ILocation
}
const NotFoundPage: React.FC<IProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found">
        <h1>該当のページが見つかりませんでした</h1>
      </SEO>
    </Layout>
  )
}

export default NotFoundPage
