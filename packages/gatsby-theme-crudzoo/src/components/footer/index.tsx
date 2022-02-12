import cn from "classnames"
import React from "react"

import { useSiteMetadata } from "../../hooks/useSiteMetadata"
import styles from "./styles.module.css"

export const Footer: React.FC = () => {
  const { title } = useSiteMetadata()
  return (
    <footer className={cn(styles.footer)}>
      <div className={cn(styles.copyright)}>©︎2021 {title}</div>
    </footer>
  )
}
