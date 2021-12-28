import cn from "classnames"
import { Link } from "gatsby"
import React from "react"

import styles from "../styles/components/TagList.module.css"

interface IProps {
  tags: string[] | null
}

const TagList: React.FC<IProps> = ({ tags }) => {
  if (tags === null || tags.length === 0) return <div />

  return (
    <div className={cn(styles.container)}>
      Tags:{" "}
      {tags.map(tag => (
        <Link key={tag} to={"/tags/" + tag} className={cn(styles.tag)}>
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
