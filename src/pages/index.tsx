import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import ToggleDarkMode from '../components/toggleDarkMode';
import Bio from '../components/bio';
import SEO from '../components/seo';
import { formatPostDate } from '../utils/i18n';
import '../styles/global.css';

interface IProps {
  location: {
    pathname: string | undefined;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        language: string;
        keywords: string[];
      };
    };
    allMdx: {
      edges: [
        {
          node: {
            body: string;
            parent: {
              name: string;
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
  const language = data.site.siteMetadata.language;

  const siteTitle = data.site.siteMetadata.title;
  const postData = data.allMdx.edges;

  const keywords = data.site.siteMetadata.keywords;

  return (
    <Layout location={location}>
      <SEO lang={language} title={siteTitle} keywords={keywords} />
      <ToggleDarkMode />

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

export default TopPage;

export const query = graphql`
  query MDXQuery {
    site {
      siteMetadata {
        title
        language
        keywords
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          body
          parent {
            ... on File {
              name
              relativeDirectory
            }
          }
          timeToRead
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
