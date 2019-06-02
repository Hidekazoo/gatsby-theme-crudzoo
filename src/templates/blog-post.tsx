import * as React from 'react';
import { graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
const MDXRenderer = require('gatsby-mdx/mdx-renderer');

interface IProps {
  location: {
    pathname: string | undefined;
  };
  data: {
    allFile: {
      edges: [
        {
          node: {
            relativePath: string;
            name: string;
            childMdx: {
              code: {
                body: string;
              };
              frontmatter: {
                title: string;
                date: Date;
                update: Date;
                tags: string[];
                spoiler: string;
              };
            };
          };
        }
      ];
    };
  };
}

const BlogPostTemplate: React.FC<IProps> = ({ data, location }) => {
  const pageData = data.allFile.edges[0].node.childMdx;
  return (
    <Layout location={location}>
      <SEO
        title={pageData.frontmatter.title}
        description={pageData.frontmatter.spoiler}
      />
      <h1
        style={{
          color: `var(--textNormal)`
        }}
      >
        {pageData.frontmatter.title}
      </h1>
      <p
        style={{
          color: `var(--textNormal)`
        }}
      >
        公開日：{pageData.frontmatter.date} <br />
        {pageData.frontmatter.update &&
          `最終更新日：${pageData.frontmatter.update}`}
      </p>
      <MDXRenderer>{pageData.code.body}</MDXRenderer>
      <Bio />
    </Layout>
  );
};

export default BlogPostTemplate;
export const query = graphql`
  query BlogPostQuery($slug: String) {
    allFile(filter: { id: { eq: $slug } }) {
      edges {
        node {
          relativePath
          name
          childMdx {
            frontmatter {
              title
              date(formatString: "YYYY年MM月DD日")
              update(formatString: "YYYY年MM月DD日")
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
  }
`;
