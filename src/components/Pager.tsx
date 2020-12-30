import * as React from "react"
import { Link } from "gatsby"
import { Button } from "./Button"
import { useLocalizeData } from "../hooks/useLocalize"

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
    <nav className="flex justify-between">
      <div>
        {previousPagePath && (
          <Link to={previousPagePath}>
            <Button>{localizedData.Archive.next}</Button>
          </Link>
        )}
      </div>

      <div className="justify-end">
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
