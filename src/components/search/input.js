import * as React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, ...rest }) => {
  return (
    <form className="flex flex-row-reverse items-center">
      <input
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-1 px-4 block w-full appearance-none leading-normal"
        type="text"
        placeholder="記事を検索"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        {...rest}
      />
    </form>
  )
})
