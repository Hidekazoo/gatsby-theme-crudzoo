import cn from "classnames"
import React from "react"

import { Header } from "../components/Header"
import styles from "../styles/components/Layout.module.css"
import { ILocation } from "../types/Location"
import { Footer } from "./Footer"

interface ILayoutProps {
  location: ILocation
}

const Layout: React.FC<ILayoutProps> = props => {
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
