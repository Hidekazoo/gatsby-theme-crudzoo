import * as React from 'react'
import {StaticQuery, graphql} from 'gatsby';


interface BioData {
  site: {
    siteMetadata: {
      title: string
      author: string
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
          site {
            siteMetadata {
              title
              author
            }
          }
        }
      `}
      render={(data: BioData) => {
        data.site
        const title = data.site.siteMetadata.title
        const author = data.site.siteMetadata.author
        return (
          <div>
             Written by <strong>{author}</strong> who lives and works in San
              Francisco building useful things.
              {` `}
          </div>
        )
      }}
    />
  )
}

export default Bio;
