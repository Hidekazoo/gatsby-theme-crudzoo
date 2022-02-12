import cn from "classnames"
import React from "react"

import styles from "./styles.module.css"

interface ButtonProps {
  type?: "primary"
}
export const Button: React.FC<ButtonProps> = (props) => {
  const { type = "primary", children, ...rest } = props
  return (
    <button
      className={cn(styles.btn, {
        [styles.primary]: type === "primary",
      })}
      {...rest}
    >
      {children}
    </button>
  )
}
