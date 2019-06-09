import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { getLocalizedData } from '../utils/i18n';
import '../styles/code.css';
const { MDXProvider } = require('@mdx-js/react');

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

  const components = {
    h1: (props: React.Props<{}>) => (
      <h1
        style={{
          color: `var(--textNormal)`,
          fontSize: '2rem'
        }}
      >
        {props.children}
      </h1>
    ),
    p: (props: React.Props<{}>) => (
      <p
        style={{
          fontSize: '18px'
        }}
      >
        {props.children}
      </p>
    )
  };

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
    <div
      style={{
        display: 'block',
        fontFamily: localizedData.Font.fontFamily,
        maxWidth: '90%',
        width: '650px',
        margin: '2rem auto'
      }}
    >
      <header>{header}</header>
      <MDXProvider components={components}>
        <section>{children}</section>
      </MDXProvider>
    </div>
  );
};

export default Layout;
