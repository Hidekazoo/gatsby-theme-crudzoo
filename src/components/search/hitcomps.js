import React from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"

export const PostHit = clickHandler => ({ hit }) => {
  return (
    <div>
      <Link
        to={`/blog/` + hit.parent.relativeDirectory}
        onClick={clickHandler}
        className="text-gray-600"
      >
        <h4 className="text-md font-bold">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </Link>
      <Snippet
        attribute="excerpt"
        hit={hit}
        tagName="mark"
        className="text-gray-600 mb-1"
      />
    </div>
  )
}
