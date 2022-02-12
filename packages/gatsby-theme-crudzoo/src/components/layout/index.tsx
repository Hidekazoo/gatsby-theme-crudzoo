import cn from "classnames"
import React from "react"

import { ILocation } from "../../types/Location"
import { Footer } from "../footer"
import { Header } from "../header"
import styles from "./styles.module.css"

interface ILayoutProps {
  location: ILocation
}

const Layout: React.FC<ILayoutProps> = (props) => {
  const { children } = props
  return (
    <React.Fragment>
      <div className={cn(styles.layout)}>
        <Header />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Layout
