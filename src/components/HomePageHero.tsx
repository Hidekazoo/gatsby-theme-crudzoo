import * as React from "react"
import { Bio } from "./Bio"
import { HeroProps } from "../types/Home"

export const HomePageHero: React.FC<HeroProps> = ({
  heroText,
  description,
}) => {
  return (
    <div className="w-full max-w-screen-xl relative mx-auto px-6 pt-16 pb-40 md:pb-24">
      <div className=" -mx-6">
        <div className="px-6 text-left md:text-center max-w-2xl md:max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
            <span className="text-primary font-medium">{heroText}</span>
          </h1>
          <p className="mt-6 leading-relaxed sm:text-lg md:text-xl text-gray-600">
            {description}
          </p>
          <div className="flex mt-12 justify-start md:justify-center">
            <Bio />
          </div>
        </div>
      </div>
    </div>
  )
}
