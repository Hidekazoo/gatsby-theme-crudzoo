import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

interface IProps {
  title: string
  featuredImage: any
}

const SeriesContainer = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 180px;

  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 10px;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
  }
  transition: 0.4s ease;
`

const SeriesTitle = styled.h2`
  font-size: 1rem !important;
  margin: 0;
`

const Series: React.FC<IProps> = ({ title, featuredImage }) => {
  return (
    <SeriesContainer>
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
