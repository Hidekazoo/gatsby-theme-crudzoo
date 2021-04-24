import React from "react"

interface HomeHeroDescriptionProps {
  description: string
}
export const HomeHeroDescription: React.FC<HomeHeroDescriptionProps> = props => {
  const { description } = props
  return <React.Fragment>{description}</React.Fragment>
}
