import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Bio from '../components/bio';
import { formatPostDate } from '../utils/i18n';
const { ThemeToggler } = require('gatsby-plugin-dark-mode');
import '../styles/global.css';
import '../styles/code.css';

interface IProps {
  pageContext: {
    tag: string;
  };
  location: {
    pathname: string | undefined;
  };
  data: {
    site: {
      siteMetadata: {
        language: string;
      };
    };
    allMdx: {
      edges: [
        {
          node: {
            parent: {
              relativePath: string;
              relativeDirectory: string;
              name: string;
              changeTime: Date;
            };
            code: {
              body: string;
            };
            frontmatter: {
              title: string;
              date: Date;
              tags: string[];
              spoiler: string;
            };
          };
        }
      ];
    };
  };
}
const TagPageTemplate: React.FC<IProps> = ({ pageContext, data, location }) => {
  const language = data.site.siteMetadata.language;

  const title = pageContext.tag;
  const keywords = ['key'];

  const pageData = data.allMdx.edges;
  return (
    <Layout location={location}>
      <SEO lang={language} title={title} keywords={keywords} />
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
      {pageData.map(({ node }) => {
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
                style={{ boxShadow: `none`, textDecoration: `none` }}
                to={'/' + node.parent.relativeDirectory + '/'}
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
              {formatPostDate(node.frontmatter.date, language)}
            </p>
            <small style={{ color: `var(--textNormal)` }}>
              {node.frontmatter.spoiler}
            </small>
          </div>
        );
      })}
    </Layout>
  );
};

export default TagPageTemplate;

export const query = graphql`
  query TagQuery($tag: String) {
    site {
      siteMetadata {
        language
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          parent {
            ... on File {
              relativePath
              relativeDirectory
              changeTime(formatString: "MMMM DD, YYYY")
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            spoiler
          }
        }
      }
    }
  }
`;
