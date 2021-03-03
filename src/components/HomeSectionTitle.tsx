import React from "react"
import cn from "classnames"
import styles from "../styles/components/HomeSectionTitle.module.css"

interface HomeSectionTitleProps {
  title: string
}
export const HomeSectionTitle: React.FC<HomeSectionTitleProps> = ({
  title,
}) => {
  return <h2 className={cn(styles.title)}>{title}</h2>
}
