import cn from "classnames"
import { Link } from "gatsby"
import React from "react"

import { useLocalizeData } from "../hooks/useLocalize"
import styles from "../styles/components/Pager.module.css"
import { Button } from "./Button"

interface IProps {
  pageContext: {
    previousPagePath: string
    nextPagePath: string
  }
}
const Pager = ({ pageContext }: IProps) => {
  const { previousPagePath, nextPagePath } = pageContext
  const localizedData = useLocalizeData()

  return (
    <nav className={cn(styles.nav)}>
      <div>
        {previousPagePath && (
          <Link to={previousPagePath}>
            <Button>{localizedData.Archive.next}</Button>
          </Link>
        )}
      </div>

      <div>
        {nextPagePath && (
          <Link to={nextPagePath}>
            <Button>{localizedData.Archive.prev}</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Pager
