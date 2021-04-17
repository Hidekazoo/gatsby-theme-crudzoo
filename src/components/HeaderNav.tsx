import * as React from "react"
import { Link } from "gatsby"
import cn from "classnames"
import MenuIcon from "./MenuIcon"
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
      <div className={cn(styles.nav)}>
        <NavigationMenu routes={routes} />
      </div>
      {/* <div className={cn(styles.mobileNav)}>
        <MobileNavigationMenu routes={routes} />
      </div> */}
    </nav>
  )
}

const NavigationMenu: React.FC<HeaderNavProps> = ({ routes }) => {
  return (
    <ul className={cn(styles.headerNavList)}>
      {routes.map((route, index) => {
        return <HeaderNavItem title={route.title} to={route.path} key={index} />
      })}
    </ul>
  )
}

const MobileNavigationMenu: React.FC<HeaderNavProps> = ({ routes }) => {
  const [isOpen, setOpen] = React.useState(false)
  const toggleMenu = () => {
    setOpen(!isOpen)
  }
  return (
    <div>
      <MenuIcon
        className={cn(styles.menuIcon, { [styles.menuIconClose]: isOpen })}
        onClick={toggleMenu}
      />
      {isOpen && (
        <div>
          {routes.map((route, index) => {
            return (
              <HeaderNavItem title={route.title} to={route.path} key={index} />
            )
          })}
        </div>
      )}
    </div>
  )
}
