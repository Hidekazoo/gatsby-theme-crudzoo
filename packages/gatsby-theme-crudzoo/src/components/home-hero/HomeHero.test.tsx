import { render, screen } from "@testing-library/react"
import React from "react"

import { HomeHero } from "./index"

describe("HomeHero", () => {
  test("HomeHero should have heroText", () => {
    const HeroText = `Hero Text`
    render(<HomeHero heroText={HeroText} />)
    expect(screen.getByText(HeroText)).toBeInTheDocument()
  })
  test("HomeHero should have description", () => {
    const Description: React.FC = () => {
      return <div>Description Component</div>
    }
    render(<HomeHero description={<Description />} />)
    expect(screen.getByText("Description Component")).toBeInTheDocument()
  })
})
