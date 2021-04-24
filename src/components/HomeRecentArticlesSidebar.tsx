import React from "react"
import { Link } from "gatsby"
import cn from "classnames"
import { useTags } from "../hooks/useTags"
import { HomeSidebarBlock } from "./HomeSidebarBlock"
import styles from "../styles/components/HomeRecentArticlesSidebar.module.css"

const SidebarItem: React.FC = props => {
  return <div className={cn(styles.sidebarItem)}>{props.children}</div>
}

const Tags: React.FC = () => {
  const tags = useTags()

  return (
    <div>
      <SidebarTitle title={`Tags`} />
      <ul>
        {tags.map((tag, index) => {
          return <TagListItem key={index}>{tag}</TagListItem>
        })}
      </ul>
    </div>
  )
}
const TagListItem: React.FC = ({ children }) => {
  return (
    <li className={cn(styles.sidebarTagListItem)}>
      <Link
        to={`/tags/${children}`}
        className={cn(styles.sidebarTagListItemLink)}
      >
        {children}
      </Link>
    </li>
  )
}

export const SidebarTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h3 className={cn(styles.sidebarTitle)}>{title}</h3>
}

interface HomeRecentArticlesSidebarProps {
  items?: React.ReactNode[]
}
export const HomeRecentArticlesSidebar: React.FC<HomeRecentArticlesSidebarProps> = ({
  items = [<Tags />],
}) => {
  return (
    <div>
      <HomeSidebarBlock />
      {items.map((item, index) => {
        return <SidebarItem key={index}>{item}</SidebarItem>
      })}
    </div>
  )
}
