/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import Img from "gatsby-image"

interface IProps {
  title: string
  featuredImage: any
}

const Series: React.FC<IProps> = ({ title, featuredImage }) => {
  return (
    <article
      sx={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        width: ["70vw", "180px", "180px"],
        height: "160px",
        margin: "5px",
        mb: [16, "5px", "5px"],
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        padding: "10px",
        ":hover": {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
        },
        transition: "0.4s ease",
      }}
    >
      <div
        sx={{
          width: "150px",
          height: "140px",
        }}
      >
        {featuredImage && <Img sizes={featuredImage} />}
      </div>
      <div>
        <h2
          sx={{
            fontSize: 16,
            color: "text",
            fontWeight: "500",
            mt: 0,
          }}
        >
          {title}
        </h2>
      </div>
    </article>
  )
}

export default Series
