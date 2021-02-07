import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Search from "./search"

import { ILocation } from "../types/Location"
import "../styles/code.css"
const { MDXProvider } = require("@mdx-js/react")

interface ILayoutProps {
  location: ILocation
}
const searchIndices = [{ name: `Blogs`, title: `Results`, hitComp: `PostHit` }]

enum HeaderType {
  TOP_PAGE = "TOP_PAGE",
  ARTICLE_PAGE = "ARTICLE_PAGE",
}

const Layout: React.FC<ILayoutProps> = props => {
  const { location, children } = props
  const rootPath = `/`

  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          algoliaSearch
        }
      }
    }
  `)

  const siteTitle = siteData.site.siteMetadata.title
  const algoliaSearch = siteData.site.siteMetadata.algoliaSearch

  const components = {
    h2: ({ children }: any) => (
      <h2 className="text-2xl text-gray-800 mt-10 mb-5 leading-normal">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl text-gray-800 mt-10">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg text-gray-800 mt-10">{children}</h4>
    ),
    p: ({ children }: any) => (
      <p className="text-base text-gray-700 leading-normal my-6">{children}</p>
    ),
    a: (props: any) => (
      <a
        className="text-base underline cursor-pointer text-blue-600"
        {...props}
      >
        {props.children}
      </a>
    ),
    "ul.li": ({ children }: any) => (
      <li className="list-disc leading-normal my-2 ml-4">{children}</li>
    ),
    "ol.li": ({ children }: any) => (
      <li className="list-decimal my-2 ml-4">{children}</li>
    ),
  }
  return (
    <React.Fragment>
      <Header
        type={
          location.pathname === rootPath
            ? HeaderType.TOP_PAGE
            : HeaderType.ARTICLE_PAGE
        }
        title={siteTitle}
        isSearch={algoliaSearch}
      />
      <div className="w-full mx-auto" role="main">
        <MDXProvider components={components}>{children}</MDXProvider>
      </div>
    </React.Fragment>
  )
}

export default Layout

interface HeaderProps {
  title: string
  isSearch: boolean
  type: HeaderType
}
const Header: React.FC<HeaderProps> = ({ title, isSearch, type }) => {
  return (
    <nav className="bg-white w-full max-w-screen-xl mx-auto" role="navigation">
      <div className="container mx-auto p-4 flex flex-wrap items-center flex-no-wrap">
        <div className="mr-4 md:mr-8 text-lg">
          <Link
            to={`/`}
            className="sm:text-3xl text-xl"
            style={{ whiteSpace: "nowrap" }}
          >
            {type === HeaderType.TOP_PAGE ? <h1>{title}</h1> : <h3>{title}</h3>}
          </Link>
        </div>
        <div className="w-full w-auto flex-grow flex items-center">
          <ul className="flex flex-row items-center mx-0 ml-auto mt-0 pt-0 border-0">
            {isSearch && (
              <li>
                <Search collapse indices={searchIndices} hitsAsGrid={false} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
