import React from "react"
import cn from "classnames"
import { ILocation } from "../types/Location"
import { Header } from "../components/Header"
import { Footer } from "./Footer"
import styles from "../styles/components/Layout.module.css"

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
