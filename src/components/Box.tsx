/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"

const Box: React.FC = ({ children }) => {
  return (
    <div sx={{ background: "#6384b3", padding: "30px 10px", margin: "30px 0" }}>
      {children}
    </div>
  )
}

export default Box
