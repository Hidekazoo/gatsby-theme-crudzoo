import { graphql, useStaticQuery } from "gatsby"
import { ISiteMetaData } from "../types/SiteMetaData"

export const useSiteMetadata = (): ISiteMetaData => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          language
          title
          author
          keywords
          heroText
          description
          social {
            twitter
          }
          algoliaSearch
        }
      }
    }
  `)
  const siteMetadata: ISiteMetaData = data.site.siteMetadata
  return siteMetadata
}
