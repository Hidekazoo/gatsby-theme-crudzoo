import * as React from "react"
import { Link } from "gatsby"
import cn from "classnames"
import Search from "./search"
import { HeaderNav } from "./HeaderNav"
import { routes } from "./HeaderRoutes"
import styles from "../styles/components/Header.module.css"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

const Logo = () => {
  const { title } = useSiteMetadata()
  return (
    <div className={cn(styles.headerLogo)}>
      <Link to={`/`}>{title}</Link>
    </div>
  )
}

const searchIndices = [{ name: `Blogs`, title: `Results`, hitComp: `PostHit` }]
export const Header: React.FC = () => {
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
