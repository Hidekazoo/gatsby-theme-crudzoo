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

const LatestArticle: React.FC<IProps> = ({
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
    <div
      sx={{
        mb: 50,
        display: "flex",
        alignItems: ["flex-start", "center", "center"],
        padding: "0 0 16px 16px",
        borderRadius: "4px",
        transition: "0.4s ease",
        flexFlow: ["column", "row", "row"],
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
              fontSize: [18, 24, 24],
              fontWeight: 500,
              mb: 0,
              mt: 0,
            }}
          >
            {title}
          </h2>
        </Link>

        <p
          sx={{
            color: "textLead",
            mt: 10,
            mb: 0,
          }}
        >
          {spoiler}
        </p>
        <div
          sx={{
            color: "textLead",
            mt: 9,
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
    </div>
  )
}

export default LatestArticle
