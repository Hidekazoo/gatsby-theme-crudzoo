import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
const MDXRenderer = require('gatsby-mdx/mdx-renderer');

interface IProps {
  pageContext: {
    siteTitle: string;
    title: string | null;
    body: string | null;
    date: Date | null;
    update: Date | null;
    spoiler: string | null;
    tags: string[] | null;
  };
}

const BlogPostTemplate: React.FC<IProps> = ({ pageContext }) => {
  const pageInfo = {
    title: pageContext.title ? pageContext.title : '',
    body: pageContext.body ? pageContext.body : '',
    date: pageContext.date ? pageContext.date : '',
    update: pageContext.update ? pageContext.update : '',
    spoiler: pageContext.spoiler ? pageContext.spoiler : '',
    tags: pageContext.tags ? pageContext.tags : ''
  };

  return (
    <Layout location={location} title={pageContext.siteTitle}>
      <SEO title={pageInfo.title} description={pageInfo.spoiler} />
      <h1
        style={{
          color: `var(--textNormal)`
        }}
      >
        {pageInfo.title}
      </h1>
      <p
        style={{
          color: `var(--textNormal)`
        }}
      >
        公開日：{pageInfo.date} <br />
        {pageInfo.update && `最終更新日：${pageInfo.update}`}
      </p>
      <MDXRenderer>{pageInfo.body}</MDXRenderer>
      <Bio />
    </Layout>
  );
};

export default BlogPostTemplate;
