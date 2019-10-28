/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import "../styles/code.css"
const { MDXProvider } = require("@mdx-js/react")

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
          sx={{
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
          fontSize: 32,
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
      <div
        sx={{
          maxWidth: "850px",
          mt: 36,
          mr: "auto",
          ml: "auto",
        }}
      >
        {header}
      </div>

      <div
        sx={{
          fontFamily: "sanSerif",
          display: "block",
          maxWidth: "850px",
          margin: "0px auto",
          padding: "10px 10px",
        }}
        role="main"
      >
        <MDXProvider>
          <section className={`container`}>{children}</section>
        </MDXProvider>
      </div>
    </React.Fragment>
  )
}

export default Layout
