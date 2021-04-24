import * as React from "react"
import { StarIcon } from "./icons/StarIcon"
import { StarHalfIcon } from "./icons/StarHalfIcon"
import styles from "../styles/components/StarRateBox.module.css"
import cn from "classnames"
interface IProps {
  title?: string
  score: number
}
export const StarRateBox: React.FC<IProps> = ({ title = "", score }) => {
  if (!score || Number.isNaN(score)) return null

  return (
    <div className={cn(styles.container)}>
      {renderTitle()}
      {renderStars(score)}
    </div>
  )
}
const renderTitle = (title?: string) => {
  return title ? title : null
}
const renderStars = (score: number) => {
  const stars: React.ReactNode[] = []

  for (let i = 0; i < score; i++) {
    stars.push(<StarIcon className={cn(styles.star)} />)
  }
  return stars
}
