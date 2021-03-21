import React from "react"
import cn from "classnames"
import styles from "../styles/components/SeriesHero.module.css"

export const SeriesHero: React.FC = () => {
  return (
    <div className={cn(styles.container)}>
      <h1 className={cn(styles.title)}>Series</h1>
    </div>
  )
}
