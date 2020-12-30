import * as React from "react"
import * as dayjs from "dayjs"
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
  const getLocalizedDate = (date: Date) => {
    return dayjs(date).format(localizedData.Date.format)
  }
  return { ...localizedData, getLocalizedDate }
}
