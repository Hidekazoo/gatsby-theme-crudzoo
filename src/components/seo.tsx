import * as React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SEO {
  description?: string;
  lang?: string;
  keywords?: string[];
  title?: string;
}

interface Site {
  site: {
    siteMetadata: {
      title: string;
      language: string;
      description: string;
      author: string;
    };
  };
}
const SEO: React.FC<SEO> = ({ description, lang, keywords = [], title }) => {
  const { site }: Site = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            language
            title
            description
            author
          }
        }
      }
    `
  );
  const metaDescription = description || site.siteMetadata.description;
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title || site.siteMetadata.title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ].concat(
        keywords.length > 0
          ? {
              name: `keywords`,
              content: keywords.join(`, `)
            }
          : []
      )}
    />
  );
};

export default SEO;
