import * as React from 'react';
import { Link } from 'gatsby';
// import 'prismjs/themes/prism-okaidia.css';
import '../styles/code.css';
const { MDXProvider } = require('@mdx-js/react');
const systemFont =
  '-apple-system,BlinkMacSystemFont,Helvetica Neue,Segoe UI,Hiragino Kaku Gothic ProN,Hiragino Sans,ヒラギノ角ゴ ProN W3,Arial,メイリオ,Meiryo,sans-serif';
const components = {
  h1: (props: React.Props<{}>) => (
    <h1
      style={{
        color: `var(--textNormal)`,
        fontFamily: systemFont,
        fontSize: '2rem'
      }}
    >
      {props.children}
    </h1>
  ),
  p: (props: React.Props<{}>) => (
    <p
      style={{
        fontFamily: systemFont,
        fontSize: '18px'
      }}
    >
      {props.children}
    </p>
  )
};

interface LayoutInterface {
  location: {
    pathname: string | undefined;
  };
  title?: string;
}
const Layout: React.FC<LayoutInterface> = props => {
  const { location, title, children } = props;
  const rootPath = `/`;
  console.log(props);
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
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          color: `var(--textNormal)`,
          fontFamily: systemFont,
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
          {title}
        </Link>
      </h3>
    );
  }

  return (
    <div
      style={{
        display: 'block',
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
