import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getLocalizedData } from "../utils/i18n"

export const useLocalizeData = () => {
  const data = useStaticQuery(graphql`
    query localizeDataQuery {
      site {
        siteMetadata {
          language
        }
      }
    }
  `)

  const localizedData = getLocalizedData(data.site.siteMetadata.language)
  return localizedData
}
