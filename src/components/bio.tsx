import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';

interface BioData {
  avatar: {
    childImageSharp: {
      fixed: FixedObject | undefined;
    };
  };
  site: {
    siteMetadata: {
      title: string;
      author: string;
      description: string;
      social: {
        twitter: string;
      };
    };
  };
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
            }
          }
        }
      `}
      render={(data: BioData) => {
        // data.site;
        const title = data.site.siteMetadata.title;
        const author = data.site.siteMetadata.author;
        const description = data.site.siteMetadata.description;
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: `60px`,
              color: `var(--textNormal)`
            }}
          >
            <Img
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: '30px',
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`
              }}
              imgStyle={{
                borderRadius: `50%`
              }}
            />
            <div>
              <div>
                作者: <strong>{author}</strong>
              </div>
              {` `}
              <div>{description}</div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default Bio;
