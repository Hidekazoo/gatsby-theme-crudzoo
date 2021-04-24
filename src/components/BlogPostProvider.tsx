import cn from "classnames"
import React from "react"

import styles from "../styles/components/BlogPostProvider.module.css"

const { MDXProvider } = require("@mdx-js/react")

export const BlogPostProvider: React.FC = props => {
  const components = {
    h2: ({ children }: any) => (
      <h2 className={cn(styles.h2)} data-id="heading" id={children}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl text-gray-800 mt-10">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg text-gray-800 mt-10">{children}</h4>
    ),
    p: ({ children }: any) => <p className={cn(styles.p)}>{children}</p>,
    a: (props: any) => (
      <a
        className="text-base underline cursor-pointer text-blue-600"
        {...props}
      >
        {props.children}
      </a>
    ),
    "ul.li": ({ children }: any) => (
      <li className="list-disc leading-normal my-2 ml-4">{children}</li>
    ),
    "ol.li": ({ children }: any) => (
      <li className="list-decimal my-2 ml-4">{children}</li>
    ),
  }
  return (
    <React.Fragment>
      <MDXProvider components={components}>{props.children}</MDXProvider>
    </React.Fragment>
  )
}
