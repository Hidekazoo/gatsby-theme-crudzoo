import { render } from "@testing-library/react"
import React from "react"

import { Button } from "."

describe("Button", () => {
  test("Button renders correctly", () => {
    const { container } = render(<Button>Button</Button>)
    expect(container).toMatchSnapshot()
  })
})
