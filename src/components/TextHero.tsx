import React from "react"
import cn from "classnames"
import styles from "../styles/components/TextHero.module.css"

interface TextHeroProps {
  title: string
}
export const TextHero: React.FC<TextHeroProps> = props => {
  const { title } = props
  return (
    <div className={cn(styles.container)}>
      <h1 className={cn(styles.title)}>{title}</h1>
    </div>
  )
}
