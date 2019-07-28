import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
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
  align-items: flex-start;
  justify-content: space-between;
`

const LeftContainer = styled.div`
  width: 75%;
`
const RightContainer = styled.div`
  width: 25%;
`

const ArticleTitle = styled.h2`
  margin: 0;
  flex: 1;
`
const ArticleDate = styled.div`
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 14px;
}}
`
const ArticleLead = styled.div`
  color: var(--textNormal);
  font-size: 16px;
  margin-top: 15px;
`

const Article: React.FC<IProps> = ({ title, date, spoiler, featuredImage }) => {
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

export default Article
