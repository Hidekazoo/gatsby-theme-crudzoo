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
  path: string
}

const ArticleContainer = styled.article`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
`

const LeftContainer = styled.div`
  flex: 1 1 auto;
`
const RightContainer = styled.div`
  flex: 0 0 150px;
  min-width: 150px;
  margin-left: 10px;
  @media (max-width: 480px) {
    display: none;
  }
`

const ArticleTitle = styled.h2`
  margin: 0;
  @media (max-width: 480px) {
    font-size: 1.1rem !important;
  }
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
  margin-top: 10px;
  @media (max-width: 480px) {
  }
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
          style={{ boxShadow: `none`, textDecoration: `none` }}
          to={"/" + path}
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

export default Article
