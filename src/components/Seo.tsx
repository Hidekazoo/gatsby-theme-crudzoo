import * as React from "react"
import Helmet from "react-helmet"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

interface SEO {
  description?: string
  lang?: string
  keywords?: string[]
  title?: string
}
const SEO: React.FC<SEO> = ({ description, lang, keywords = [], title }) => {
  const {
    title: siteMetaDataTitle,
    description: siteMetaDataDescription,
    author,
  } = useSiteMetadata()

  const metaDescription = description || siteMetaDataDescription
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetaDataTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title || siteMetaDataTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(
        keywords.length > 0
          ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
          : []
      )}
    />
  )
}

export default SEO
