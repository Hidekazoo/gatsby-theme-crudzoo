import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Bio from '../components/bio';
import SEO from '../components/seo';
import '../styles/global.css';
import '../styles/code.css';
const { ThemeToggler } = require('gatsby-plugin-dark-mode');

interface IProps {
  location: {
    pathname: string | undefined;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        author: string;
      };
    };
    allMdx: {
      edges: [
        {
          node: {
            code: {
              body: string;
            };
            parent: {
              name: string;
              absolutePath: string;
              relativePath: string;
              relativeDirectory: string;
            };
            timeToRead: number;
            frontmatter: {
              title: string;
              date: Date;
              spoiler: string | undefined;
            };
          };
        }
      ];
    };
  };
}

const TopPage: React.FC<IProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const postData = data.allMdx.edges;
  return (
    <Layout location={location}>
      <SEO title="CrudZoo" keywords={[`gatsby`, `javascript`, `react`]} />
      <ThemeToggler>
        {({ theme, toggleTheme }: { theme: string; toggleTheme: any }) => (
          <label
            style={{
              textAlign: 'right',
              margin: '15px 0',
              display: 'block',
              color: `var(--textNormal)`
            }}
          >
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
      {postData.map(({ node }) => {
        const title = node.frontmatter.title;
        return (
          <div
            key={node.parent.relativeDirectory}
            style={{
              marginBottom: `30px`
            }}
          >
            <h3
              style={{
                fontSize: `20px`,
                marginBottom: `5px`,
                marginTop: `15px`
              }}
            >
              <Link
                style={{ boxShadow: `none` }}
                to={node.parent.relativeDirectory + '/'}
              >
                {title}
              </Link>
            </h3>
            <p
              style={{
                marginTop: `5px`,
                marginBottom: 0,
                fontSize: `14px`
              }}
            >
              {node.frontmatter.date}
            </p>
            <small style={{ color: `var(--textNormal)` }}>
              {node.frontmatter.spoiler}
            </small>

            {/* <p dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }} /> */}
          </div>
        );
      })}
    </Layout>
  );
};

export default TopPage;

export const query = graphql`
  query MDXQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
              relativeDirectory
            }
          }
          timeToRead
          frontmatter {
            title
            date(formatString: "YYYY年MM月DD日")
            spoiler
          }
        }
      }
    }
  }
`;
