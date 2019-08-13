import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "../styles/styled"
import { getLocalizedData } from "../utils/i18n"
import "../styles/code.css"
const { MDXProvider } = require("@mdx-js/react")

const Header = styled.header`
  max-width: 90%;
  width: 650px;
  margin: 2rem auto;
`
const LayoutMain = styled.div<{ fontFamily: string }>`
  display: block;
  font-family: ${props => props.fontFamily};
  max-width: 90%;
  width: 650px;
  margin: 2rem auto;

  h1 {
    font-size: 1.25rem;
  }
  h2 {
    font-size: 1.25rem;
  }
  h3 {
    font-size: 1.3rem;
    margin: 2.2rem 0 0.1rem;
  }
  p {
    font-size: 1rem;
    margin: 1rem 0;
    line-height: 1.8;
  }
`

const Header2 = styled.h2`
  font-size: 1.4rem !important;
  margin-top: 3.5rem;
`

const Header3 = styled.h3`
  font-size: 1.25rem !important;
`

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
          language
        }
      }
    }
  `)

  const language = siteData.site.siteMetadata.language
  const localizedData = getLocalizedData(language)

  const siteTitle = siteData.site.siteMetadata.title
  let header
  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          color: `var(--textNormal)`,
          marginBottom: `30px`,
          marginTop: 0,
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
        style={{
          color: `var(--textNormal)`,
          marginTop: 0,
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

  const components = {
    p: (props: React.Props<{}>) => <p>{props.children}</p>,
    h2: (props: React.Props<{}>) => <Header2>{props.children}</Header2>,
    h3: (props: React.Props<{}>) => <Header3>{props.children}</Header3>,
  }

  return (
    <>
      <Header>{header}</Header>
      <LayoutMain fontFamily={localizedData.Font.fontFamily} role="main">
        <MDXProvider components={components}>
          <section className={`container`}>{children}</section>
        </MDXProvider>
      </LayoutMain>
    </>
  )
}

export default Layout
