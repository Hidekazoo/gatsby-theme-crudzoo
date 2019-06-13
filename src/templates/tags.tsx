import * as React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { formatPostDate } from '../utils/i18n';
import ToggleDarkMode from '../components/toggleDarkMode';
import '../styles/global.css';

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

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: var(--textNormal);
  border-bottom: 1px solid var(--textNormal);
  margin-bottom: 30px;
`;
const TagPageTitle = styled.h1`
  font-size: 20px;
  padding: 3px 5px;
  text-decoration: none;
  margin-right: 10px;
  width: fit-content;
`;

const PostTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 5px;
  margin-top: 15px;
`;

const PostDate = styled.p`
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 14px;
`;

const PostSpoiler = styled.small`
  color: var(--textNormal);
`;
const TagPageTemplate: React.FC<IProps> = ({ pageContext, data, location }) => {
  const language = data.site.siteMetadata.language;

  const pageTitle = pageContext.tag;
  const keywords = ['key'];

  const pageData = data.allMdx.edges;
  return (
    <Layout location={location}>
      <SEO lang={language} title={pageTitle} keywords={keywords} />
      <ToggleDarkMode />
      <Header>
        <TagPageTitle>{pageTitle}</TagPageTitle>
      </Header>

      {pageData.map(({ node }) => {
        const title = node.frontmatter.title;
        return (
          <div
            key={node.parent.relativeDirectory}
            style={{
              marginBottom: `30px`
            }}
          >
            <PostTitle>
              <Link
                style={{ boxShadow: `none`, textDecoration: `none` }}
                to={'/' + node.parent.relativeDirectory + '/'}
              >
                {title}
              </Link>
            </PostTitle>
            <PostDate>
              {formatPostDate(node.frontmatter.date, language)}
            </PostDate>
            <PostSpoiler>{node.frontmatter.spoiler}</PostSpoiler>
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
