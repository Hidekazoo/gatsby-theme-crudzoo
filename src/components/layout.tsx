/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import styled from "../styles/styled"
import "../styles/code.css"
const { MDXProvider } = require("@mdx-js/react")

const Header = styled.header`
  max-width: 90%;
  width: 650px;
  margin: 2rem auto;
`
const LayoutMain = styled.div`
  display: block;
  max-width: 90%;
  width: 650px;
  margin: 2rem auto;
`

// const Header2 = styled.h2`
//   font-size: 1.4rem !important;
//   margin-top: 3.5rem;
// `

// const Header3 = styled.h3`
//   font-size: 1.25rem !important;
// `

interface LayoutInterface {
  location: {
    pathname: string | undefined
  }
}
const Layout: React.FC<LayoutInterface> = props => {
  const { location, children } = props
  const rootPath = `/`

  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = siteData.site.siteMetadata.title
  let header
  if (location.pathname === rootPath) {
    header = (
      <h1
        sx={{
          color: "text",
          mb: 30,
          mt: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {siteTitle}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        sx={{
          color: "text",
          mt: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {siteTitle}
        </Link>
      </h3>
    )
  }
  return (
    <React.Fragment>
      <Header>{header}</Header>
      <LayoutMain
        sx={{
          fontFamily: "sanSerif",
        }}
        role="main"
      >
        <MDXProvider>
          <section className={`container`}>{children}</section>
        </MDXProvider>
      </LayoutMain>
    </React.Fragment>
  )
}

export default Layout
