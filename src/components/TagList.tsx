/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { Link } from "gatsby"

interface IProps {
  tags: string[] | null
}

const TagList: React.FC<IProps> = ({ tags }) => {
  if (tags === null) return <div />

  return (
    <div
      sx={{
        margin: "15px 0 30px",
      }}
    >
      {tags.map(tag => (
        <Link
          key={tag}
          to={"/tags/" + tag}
          sx={{
            background: "rgba(0,0,0,.05)",
            padding: "5px 10px",
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.87)",
            marginRight: "10px",
          }}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
