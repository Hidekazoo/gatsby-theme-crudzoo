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
  margin-bottom: 50px;
  display: flex;
  align-items: center;

  padding: 0 0 16px 16px;
  border-radius: 4px;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  }
  transition: 0.4s ease;

  ${mq.small} {
    flex-flow: column;
    align-items: flex-start;
  }
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

const ArticleTitle = styled.h2`
  font-size: 1.5rem !important;
  margin: 0;

  ${mq.small} {
    font-size: 1.2rem !important;
  }
`
const ArticleDate = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`
const ArticleLead = styled.div`
  color: var(--textNormal);
  font-size: 16px;
  margin-top: 5px;
`

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
    <ArticleContainer>
      <LeftContainer>
        <Link
          style={{ boxShadow: `none`, textDecoration: `none` }}
          to={"/blog/" + path}
        >
          <ArticleTitle>{title}</ArticleTitle>
        </Link>
        <ArticleDate>{formatPostDate(date, language)}</ArticleDate>
        <ArticleLead>{spoiler}</ArticleLead>
      </LeftContainer>
      {featuredImage && (
        <RightContainer>
          <Img sizes={featuredImage} />
        </RightContainer>
      )}
    </ArticleContainer>
  )
}

export default LatestArticle
