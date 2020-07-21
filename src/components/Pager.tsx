import * as React from "react"
import { Link } from "gatsby"
import { Button } from "./Button"

interface IProps {
  pageContext: {
    previousPagePath: string
    nextPagePath: string
  }
}
const Pager = ({ pageContext }: IProps) => {
  const { previousPagePath, nextPagePath } = pageContext
  return (
    <nav className="flex justify-between">
      <div>
        {previousPagePath && (
          <Link to={previousPagePath}>
            <Button>新しい投稿へ</Button>
          </Link>
        )}
      </div>

      <div className="justify-end">
        {nextPagePath && (
          <Link to={nextPagePath}>
            <Button>古い投稿へ</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Pager
