import * as React from 'react'

const Header: React.FC =  ({ children }) => (
  <section
    style={{
      padding: "10px",
      backgroundColor: "red"
    }}
  >
    {children}
  </section>
)

export default Header;