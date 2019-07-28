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
`

const LeftContainer = styled.div`
  width: 75%;
`
const RightContainer = styled.div`
  width: 25%;
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
      <RightContainer>
        {featuredImage && <Img sizes={featuredImage} />}
      </RightContainer>
    </ArticleContainer>
  )
}

export default LatestArticle
