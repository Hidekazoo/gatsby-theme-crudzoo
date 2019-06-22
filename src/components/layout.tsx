import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { getLocalizedData } from '../utils/i18n';
import '../styles/code.css';
const { MDXProvider } = require('@mdx-js/react');

const LayoutMain = styled.div<{ fontFamily: string }>`
  display: block;
  font-family: ${props => props.fontFamily};
  max-width: 90%;
  width: 650px;
  margin: 2rem auto;

  h1 {
    font-size: 1.8rem;
  }
  h2 {
    font-size: 1.5rem;
    margin: 2.6rem 0 0.2rem;
  }
  h3 {
    font-size: 1.3rem;
    margin: 2.2rem 0 0.1rem;
  }
  p {
    font-size: 1rem;
    margin: 1rem 0 1.2rem;
    line-height: 1.8;
  }
`;

interface LayoutInterface {
  location: {
    pathname: string | undefined;
  };
}
const Layout: React.FC<LayoutInterface> = props => {
  const { location, children } = props;
  const rootPath = `/`;

  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          language
        }
      }
    }
  `);

  const language = siteData.site.siteMetadata.language;
  const localizedData = getLocalizedData(language);

  const siteTitle = siteData.site.siteMetadata.title;
  let header;
  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          color: `var(--textNormal)`,
          marginBottom: `30px`,
          marginTop: 0
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`
          }}
          to={`/`}
        >
          {siteTitle}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          color: `var(--textNormal)`,
          marginTop: 0
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`
          }}
          to={`/`}
        >
          {siteTitle}
        </Link>
      </h3>
    );
  }

  return (
    <LayoutMain fontFamily={localizedData.Font.fontFamily}>
      <header>{header}</header>
      <MDXProvider>
        <section>{children}</section>
      </MDXProvider>
    </LayoutMain>
  );
};

export default Layout;
