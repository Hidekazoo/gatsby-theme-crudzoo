import * as React from 'react'


const Box: React.FC = ({children}) => {
  return (
    <div style={{background: "red"}}>
      {children}
    </div>
  )
}

export default Box;