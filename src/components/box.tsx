import * as React from "react"

const Box: React.FC = ({ children }) => {
  return (
    <div
      style={{ background: "#6384b3", padding: "30px 10px", margin: "30px 0" }}
    >
      {children}
    </div>
  )
}

export default Box
