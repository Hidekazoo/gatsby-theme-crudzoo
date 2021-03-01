import * as React from "react"
import { Link } from "gatsby"
import cn from "classnames"
import styles from "../styles/components/HeaderNav.module.css"

interface HeaderNavProps {
  routes: {
    path: string
    title: string
  }[]
}

interface HeaderNavItemProps {
  title: string
  to: string
}

const HeaderNavItem: React.FC<HeaderNavItemProps> = ({ title, to }) => {
  return (
    <li className={cn(styles.headerNavItem)}>
      <Link to={to}>{title}</Link>
    </li>
  )
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ routes }) => {
  return (
    <nav className={cn(styles.headerNav)}>
      <ul className={cn(styles.headerNavList)}>
        {routes.map((route, index) => {
          return (
            <HeaderNavItem title={route.title} to={route.path} key={index} />
          )
        })}
      </ul>
    </nav>
  )
}
