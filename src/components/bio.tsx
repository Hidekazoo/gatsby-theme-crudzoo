/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img, { FixedObject } from "gatsby-image"
import { getLocalizedData } from "../utils/i18n"
interface BioData {
  avatar: {
    childImageSharp: {
      fixed: FixedObject | undefined
    }
  }
  site: {
    siteMetadata: {
      title: string
      author: string
      description: string
      language: string
      social: {
        twitter: string
      }
    }
  }
}
const Bio: React.FC = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
            childImageSharp {
              fixed(width: 50, height: 50) {
                base64
                width
                height
                src
                srcSet
              }
            }
          }
          site {
            siteMetadata {
              title
              author
              description
              language
              social {
                twitter
              }
            }
          }
        }
      `}
      render={(data: BioData) => {
        const { author, language, description, social } = data.site.siteMetadata

        const localizedData = getLocalizedData(language)
        return (
          <div
            sx={{
              display: `flex`,
              marginBottom: `60px`,
              color: `var(--textNormal)`,
            }}
          >
            <Img
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              sx={{
                marginRight: "30px",
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <div>
              <div>
                {localizedData.Bio.author}: {author}
                <a
                  href={`https://twitter.com/${social.twitter}`}
                  sx={{ ml: "10px" }}
                >
                  Twitter
                </a>
              </div>
              {` `}
              <div>{description}</div>
            </div>
          </div>
        )
      }}
    />
  )
}

export default Bio
