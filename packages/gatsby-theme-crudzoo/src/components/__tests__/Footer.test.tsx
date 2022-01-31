import React from "react"
import { render, screen } from "@testing-library/react"
import { Footer } from "../Footer"
import { mockData } from "../../hooks/__mocks__/useSiteMetadata"

jest.mock("../../hooks/useSiteMetadata")

describe("Footer", () => {
  test("Footer renders correctory", () => {
    render(<Footer />)
    const reg = new RegExp(mockData.title, "i")
    expect(screen.getByText(reg)).toBeInTheDocument()
  })
})
