/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"

export const PostHit = clickHandler => ({ hit }) => {
  return (
    <div>
      <Link
        to={`/blog/` + hit.parent.relativeDirectory}
        onClick={clickHandler}
        sx={{
          color: `text`,
          boxShadow: `none`,
          textDecoration: `none`,
        }}
      >
        <h4
          sx={{
            fontSize: [16, 16, 16],
            fontWeight: 500,
            mb: 0,
            mt: 0,
          }}
        >
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </Link>
      <Snippet
        attribute="excerpt"
        hit={hit}
        tagName="mark"
        sx={{
          color: "textLead",
          mt: 10,
          mb: 0,
        }}
      />
    </div>
  )
}
