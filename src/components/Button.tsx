import * as React from "react"
import cn from "classnames"
import styles from "../styles/components/Button.module.css"

interface ButtonProps {
  type?: "primary"
}
export const Button: React.FC<ButtonProps> = ({
  children,
  type = "primary",
}) => {
  return (
    <button
      className={cn(styles.btn, {
        [styles.primary]: type === "primary",
      })}
    >
      {children}
    </button>
  )
}
