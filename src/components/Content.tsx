import React from "react"
import cn from "classnames"
import styles from "../styles/components/Content.module.css"

export const Content: React.FC = props => {
  const { children } = props
  return <div className={cn(styles.content)}>{children}</div>
}
