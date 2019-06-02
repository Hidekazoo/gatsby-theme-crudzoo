import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

interface QueryData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}
const NotFoundPage: React.FC = () => {
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
      render={(data: QueryData) => {
        data.site;
        const title = data.site.siteMetadata.title;
        return (
          <Layout location={location}>
            <SEO title="404: Not Found">
              <h1>該当のページが見つかりませんでした</h1>
            </SEO>
          </Layout>
        );
      }}
    />
  );
};

export default NotFoundPage;
