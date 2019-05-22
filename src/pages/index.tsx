import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Bio from '../components/bio'
import SEO from '../components/seo'
const { ThemeToggler } = require('gatsby-plugin-dark-mode')

interface IProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        author: string
      }
    },
    allMdx: {
      edges: [{
        node:
          {
            code: {
              body: string
            }
            parent: {
              name: string
              absolutePath: string
              relativePath: string
            }
            timeToRead: number
            frontmatter: {
              title: string
            }
          }
        }
      ]
    }
  }
}

const TopPage: React.FC<IProps> = ({ data }) => {
  console.log(data)
  const postData = data.allMdx.edges

  return (
  <Layout>
    <SEO
      title="CrudZoo"
      keywords={[`gatsby`, `javascript`, `react`]}
    />
    <ThemeToggler>
      {({ theme, toggleTheme }: {theme: string, toggleTheme: any }) => (
        <label style={{textAlign: "right", margin: "15px 0", display: "block", color: `var(--textNormal)`}}>
          <input
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />{' '}
          Dark Mode
        </label>
      )}
    </ThemeToggler>
    <Bio />
    <h1>{data.site.siteMetadata.title}</h1>
      {postData.map(({ node }) => {
          const title = node.frontmatter.title
          return (
            <div key={node.parent.name}>
              <h3
                style={{
                  // marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.parent.name}>
                  {title}
                </Link>
              </h3>
              <small style={{color: `var(--textNormal)`}}>{node.frontmatter.title}</small>
              {/* <p dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }} /> */}
            </div>
          )
        })}
  </Layout>
  )
}

export default TopPage;

export const query = graphql`
query MDXQuery {
  site {
      siteMetadata {
        title
        author
      }
    }
  allMdx {
    edges {
      node {
        code {
          body
        }
        parent {
          ... on File {
            name
            absolutePath
            relativePath
          }
        }
        timeToRead
        frontmatter {
          title
        }
      }
    }
  }
}
`