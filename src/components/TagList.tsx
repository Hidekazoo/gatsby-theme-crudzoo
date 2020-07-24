import * as React from "react"
import { Link } from "gatsby"

interface IProps {
  tags: string[] | null
}

const TagList: React.FC<IProps> = ({ tags }) => {
  if (tags === null) return <div />

  return (
    <div className="mt-3 mb-4">
      Tags:{" "}
      {tags.map(tag => (
        <Link
          key={tag}
          to={"/tags/" + tag}
          className="bg-gray-200 text-gray-600 px-2 py-1 mx-2"
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
