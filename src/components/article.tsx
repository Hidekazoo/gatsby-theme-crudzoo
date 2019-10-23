/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "../styles/styled"
import mq from "../styles/media"

import Img from "gatsby-image"
import { formatPostDate } from "../utils/i18n"
interface IProps {
  title: string
  date: Date
  spoiler: string | undefined
  featuredImage: any
  path: string
}

const ArticleContainer = styled.article`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 0 20px 16px;

  border-radius: 4px;

  transition: 0.4s ease;
`

const LeftContainer = styled.div`
  flex: 1 1 auto;
`
const RightContainer = styled.div`
  flex: 0 0 150px;
  min-width: 150px;
  margin-left: 10px;
  ${mq.small} {
    display: none;
  }
`

const ArticleLead = styled.div`
  color: var(--textNormal);
  font-size: 16px;
  margin-top: 10px;
`

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
    <ArticleContainer>
      <LeftContainer>
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

        <ArticleLead>{spoiler}</ArticleLead>
        <div
          sx={{
            color: "textLead",
            mt: 10,
          }}
        >
          {formatPostDate(date, language)}
        </div>
      </LeftContainer>
      {featuredImage && (
        <RightContainer>
          <Img sizes={featuredImage} />
        </RightContainer>
      )}
    </ArticleContainer>
  )
}

export default Article
