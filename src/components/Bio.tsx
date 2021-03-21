import * as React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Img, { FixedObject } from "gatsby-image"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

interface BioData {
  avatar: {
    childImageSharp: {
      fixed: FixedObject | undefined
    }
  }
}
export const Bio: React.FC = () => {
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
        }
      `}
      render={(data: BioData) => {
        const { author, job } = useSiteMetadata()

        return (
          <React.Fragment>
            <Link
              to={"/blog/about"}
              className="rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-200 md:text-lg xl:text-base text-gray-800 font-semibold leading-tight shadow-md flex"
            >
              <Img
                fixed={data.avatar.childImageSharp.fixed!}
                alt={author}
                className="h-16 w-16 md:h-24 md:w-24 rounded-full"
              />
              <div className="flex flex-col justify-center ml-4 text-left">
                <div className="text-lg">{author}</div>
                <div className="text-primary text-base">{job}</div>
              </div>
            </Link>
          </React.Fragment>
        )
      }}
    />
  )
}
