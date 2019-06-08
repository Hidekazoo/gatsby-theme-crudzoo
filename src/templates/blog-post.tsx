import * as React from 'react';
import { graphql } from 'gatsby';
import { getLocalizedData, formatPostDate } from '../utils/i18n';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
const MDXRenderer = require('gatsby-mdx/mdx-renderer');

interface IProps {
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

const BlogPostTemplate: React.FC<IProps> = ({ data, location }) => {
  const lang = data.site.siteMetadata.language;
  const localizedData = getLocalizedData(lang);

  const pageData = data.allMdx.edges[0].node;
  const title = pageData.frontmatter.title;
  const spoiler = pageData.frontmatter.spoiler;
  const date = pageData.frontmatter.date;
  const lastUpdate = pageData.parent.changeTime;

  return (
    <Layout location={location}>
      <SEO lang={lang} title={title} description={spoiler} />
      <h1
        style={{
          color: `var(--textNormal)`
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: `var(--textNormal)`
        }}
      >
        {date &&
          `${localizedData.BlogPost.update}：${formatPostDate(
            date,
            lang
          )} <br />`}
        {lastUpdate &&
          `${localizedData.BlogPost.lastUpdate}: ${formatPostDate(
            lastUpdate,
            lang
          )}`}
      </p>
      <MDXRenderer>{pageData.code.body}</MDXRenderer>
      <Bio />
    </Layout>
  );
};

export default BlogPostTemplate;
export const query = graphql`
  query BlogPostQuery($slug: String) {
    site {
      siteMetadata {
        language
      }
    }
    allMdx(filter: { id: { eq: $slug } }) {
      edges {
        node {
          parent {
            ... on File {
              relativePath
              relativeDirectory
              name
              changeTime(formatString: "MMMM DD, YYYY")
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            spoiler
          }
          code {
            body
          }
        }
      }
    }
  }
`;
