import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

interface IProps {
  title: string
  featuredImage: any
}

const SeriesContainer = styled.article<{ mainColor: string }>`
  margin-bottom: 30px;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 190px;

  margin: 0 10px;
  border: 2px solid ${props => props.mainColor};
  border-radius: 10px;
`

const SeriesTitle = styled.h2`
  font-size: 18px;
  margin: 0;
`

const Series: React.FC<IProps> = ({ title, featuredImage }) => {
  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          mainColor
        }
      }
    }
  `)
  const mainColor = siteData.site.siteMetadata.mainColor
  return (
    <SeriesContainer mainColor={mainColor}>
      <div style={{ width: "150px" }}>
        {featuredImage && <Img sizes={featuredImage} />}
      </div>
      <div>
        <SeriesTitle>{title}</SeriesTitle>
      </div>
    </SeriesContainer>
  )
}

export default Series
