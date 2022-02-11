import { render, screen } from "@testing-library/react"
import React from "react"

import { mockData } from "../../hooks/__mocks__/useSiteMetadata"
import { Footer } from "../footer"

jest.mock("../../hooks/useSiteMetadata")

describe("Footer", () => {
  test("Footer renders correctory", () => {
    render(<Footer />)
    const reg = new RegExp(mockData.title, "i")
    expect(screen.getByText(reg)).toBeInTheDocument()
  })
})
