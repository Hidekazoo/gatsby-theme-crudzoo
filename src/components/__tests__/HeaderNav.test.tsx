import React from "react"
import { HeaderNav } from "../HeaderNav"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

const routes = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/series",
    title: "Series",
  },
]
describe("HeaderNav", () => {
  test("HeaderNave should have links", () => {
    render(<HeaderNav routes={routes} />)
    {
      routes.map(route => {
        expect(screen.getByText(route.title)).toBeInTheDocument()
        expect(screen.getByText(route.title).closest("a")).toHaveAttribute(
          "href",
          route.path
        )
      })
    }
  })
})
