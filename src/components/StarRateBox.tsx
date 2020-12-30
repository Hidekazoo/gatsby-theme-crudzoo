import * as React from "react"
import { StarIcon } from "./icons/StarIcon"
import { StarHalfIcon } from "./icons/StarHalfIcon"

interface IProps {
  title?: string
  score: number
}
export const StarRateBox: React.FC<IProps> = ({ title = "", score }) => {
  if (!score || Number.isNaN(score)) return null

  return (
    <div className="flex items-center">
      {renderTitle()}
      {renderStars(score)}
    </div>
  )
}
const renderTitle = (title?: string) => {
  return title ? title : null
}
const renderStars = (score: number) => {
  let stars: React.ReactNode[] = []

  for (let i = 0; i < score; i++) {
    stars.push(<StarIcon className={`fill-current text-yellow-500`} />)
  }
  return stars
}
