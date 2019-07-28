import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { formatPostDate } from "../utils/i18n"

interface IProps {
  title: string
  date: Date
  spoiler: string | undefined
  featuredImage: any
}

const ArticleContainer = styled.article`
  margin-bottom: 30px;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    flex-flow: column;
  }
`

const LeftContainer = styled.div``
const RightContainer = styled.div`
  flex: 0 0 150px;
  min-width: 150px;
  margin-left: 10px;
`

const ArticleTitle = styled.h2`
  font-size: 1.5rem !important;
  margin: 0;
`
const ArticleDate = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 14px;
}}
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
        <ArticleTitle>{title}</ArticleTitle>
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
