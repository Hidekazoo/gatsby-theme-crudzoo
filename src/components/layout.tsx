import * as React from 'react'
const { MDXProvider } = require('@mdx-js/react');
const systemFont = '-apple-system,BlinkMacSystemFont,Helvetica Neue,Segoe UI,Hiragino Kaku Gothic ProN,Hiragino Sans,ヒラギノ角ゴ ProN W3,Arial,メイリオ,Meiryo,sans-serif'
const components = {
  h1: (props: React.Props<{}>) => (
  <h1
    style={{
      fontFamily: systemFont,
      fontSize: '2rem'
    }}>
      {props.children}
    </h1>
  ),
  p: (props: React.Props<{}>) => (
    <p
      style={{
        fontFamily: systemFont,
        fontSize: '18px'
      }}>{props.children}</p>
  )
}

interface LayoutInterface {
  location?: {
    pathname: string
  }
  title?: string
}
const Layout: React.FC<LayoutInterface> =  ({ children }) => {
  return (
    <MDXProvider components={components}>
      <section
        style={{
          display: 'block',
          maxWidth: '90%',
          width: '650px',
          margin: '2rem auto'
        }}
      >
        {children}
      </section>
    </MDXProvider>
  )
};

export default Layout;