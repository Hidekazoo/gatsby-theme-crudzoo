import cn from "classnames"
import React from "react"

import styles from "../styles/components/BlogPostProvider.module.css"

const { MDXProvider } = require("@mdx-js/react")

export const BlogPostProvider: React.FC = (props) => {
  const components = {
    h2: ({ children }: any) => (
      <h2 className={cn(styles.h2)} data-id="heading" id={children}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => <h3 className={cn(styles.h3)}>{children}</h3>,
    h4: ({ children }: any) => <h4 className={cn(styles.h4)}>{children}</h4>,
    p: ({ children }: any) => <p className={cn(styles.p)}>{children}</p>,
    a: (props: any) => (
      <a className={cn(styles.a)} {...props}>
        {props.children}
      </a>
    ),
    ul: ({ children }: any) => <ul className={cn(styles.ul)}>{children}</ul>,
    "ul.li": ({ children }: any) => (
      <li className={cn(styles.ulli)}>{children}</li>
    ),
    "ol.li": ({ children }: any) => (
      <li className={cn(styles.olli)}>{children}</li>
    ),
  }
  return (
    <React.Fragment>
      <MDXProvider components={components}>{props.children}</MDXProvider>
    </React.Fragment>
  )
}
