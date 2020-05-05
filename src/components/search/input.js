import * as React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import { Form, Input } from "./styles"

export default connectSearchBox(({ refine, ...rest }) => {
  return (
    <Form>
      <Input
        type="text"
        placeholder="記事を検索"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        {...rest}
      />
    </Form>
  )
})
