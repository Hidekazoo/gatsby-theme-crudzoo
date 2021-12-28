import cn from "classnames"
import React from "react"

import styles from "../styles/components/Content.module.css"

export const Content: React.FC = props => {
  const { children } = props
  return <div className={cn(styles.content)}>{children}</div>
}
