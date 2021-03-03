import * as React from "react"
import cn from "classnames"
import Search from "./search"
import { HeaderNav } from "./HeaderNav"
import styles from "../styles/components/Header.module.css"

const Logo = () => {
  return <div className={cn(styles.headerLogo)}>Crudzoo</div>
}

const searchIndices = [{ name: `Blogs`, title: `Results`, hitComp: `PostHit` }]
const routes = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/blogs",
    title: "Blogs",
  },
]
export const Header = () => {
  return (
    <div className={cn(styles.header)}>
      <div className={cn(styles.headerContent)}>
        <Logo />
        <HeaderNav routes={routes} />
        <div className={cn(styles.search)}>
          <Search collapse indices={searchIndices} hitsAsGrid={false} />
        </div>
      </div>
    </div>
  )
}
