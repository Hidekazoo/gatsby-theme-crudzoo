import cn from "classnames"
import React from "react"

import styles from "./BlogPostProvider.module.css"

const { MDXProvider } = require("@mdx-js/react")

interface IProps {
  children: React.ReactNode
}

interface IComponentProps {
  children: React.ReactNode
}
export const BlogPostProvider = ({ children }: IProps): JSX.Element => {
  const components = {
    h2: ({ children }: IComponentProps) => (
      <h2 className={cn(styles.h2)} data-id="heading">
        {children}
      </h2>
    ),
    h3: ({ children }: IComponentProps) => (
      <h3 className={cn(styles.h3)}>{children}</h3>
    ),
    h4: ({ children }: IComponentProps) => (
      <h4 className={cn(styles.h4)}>{children}</h4>
    ),
    p: ({ children }: IComponentProps) => (
      <p className={cn(styles.p)}>{children}</p>
    ),
    a: (props: IComponentProps) => (
      <a className={cn(styles.a)} {...props} target="_blank">
        {props.children}
      </a>
    ),
    ul: ({ children }: IComponentProps) => (
      <ul className={cn(styles.ul)}>{children}</ul>
    ),
    "ul.li": ({ children }: IComponentProps) => (
      <li className={cn(styles.ulli)}>{children}</li>
    ),
    "ol.li": ({ children }: IComponentProps) => (
      <li className={cn(styles.olli)}>{children}</li>
    ),
    strong: ({ children }: IComponentProps) => (
      <strong className={cn(styles.strong)}>{children}</strong>
    ),
  }
  return (
    <React.Fragment>
      <MDXProvider components={components}>{children}</MDXProvider>
    </React.Fragment>
  )
}
