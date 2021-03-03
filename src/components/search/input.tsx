import * as React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, onFocus, ...rest }: any) => {
  return (
    <form className="flex flex-row-reverse items-center">
      <input
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-1 px-4 block w-full appearance-none leading-normal"
        type="text"
        placeholder="サイト内検索"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        onFocus={onFocus}
        {...rest}
      />
    </form>
  )
})
