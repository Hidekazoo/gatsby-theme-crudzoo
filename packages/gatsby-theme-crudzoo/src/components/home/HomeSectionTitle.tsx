import cn from "classnames"
import React from "react"

import styles from "./HomeSectionTitle.module.css"

interface HomeSectionTitleProps {
  title: string
}
export const HomeSectionTitle: React.FC<HomeSectionTitleProps> = ({
  title,
}) => {
  return <h2 className={cn(styles.title)}>{title}</h2>
}
