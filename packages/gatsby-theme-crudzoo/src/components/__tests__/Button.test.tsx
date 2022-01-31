import React from "react"
import { render } from "@testing-library/react"

import { Button } from "../Button"

describe("Button", () => {
  test("Button renders correctly", () => {
    const { container } = render(<Button>Button</Button>)
    expect(container).toMatchSnapshot()
  })
})
