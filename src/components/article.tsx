/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import { formatPostDate } from "../utils/i18n"
interface IProps {
  title: string
  date: Date
  spoiler: string | undefined
  featuredImage: any
  path: string
}

const Article: React.FC<IProps> = ({
  title,
  date,
  spoiler,
  featuredImage,
  path,
}) => {
  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          language
        }
      }
    }
  `)
  const language = siteData.site.siteMetadata.language
  return (
    <article
      sx={{
        mb: "30px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        padding: "0 0 20px 16px",
        borderRadius: "4px",
        transition: "0.4s ease",
      }}
    >
      <div
        sx={{
          flex: "1 1 auto",
        }}
      >
        <Link
          sx={{
            color: `text`,
            boxShadow: `none`,
            textDecoration: `none`,
          }}
          to={"/blog/" + path}
        >
          <h2
            sx={{
              fontSize: [18, 20, 20],
              fontWeight: 500,
              mb: 0,
              mt: 0,
            }}
          >
            {title}
          </h2>
        </Link>

        <div
          sx={{
            fontSize: 16,
            mt: 10,
          }}
        >
          {spoiler}
        </div>
        <div
          sx={{
            color: "textLead",
            mt: 10,
          }}
        >
          {formatPostDate(date, language)}
        </div>
      </div>
      {featuredImage && (
        <div
          sx={{
            flex: "0 0 150px",
            minWidth: "150px",
            ml: "10px",
            display: ["none", "block", "block"],
          }}
        >
          <Img sizes={featuredImage} />
        </div>
      )}
    </article>
  )
}

export default Article
