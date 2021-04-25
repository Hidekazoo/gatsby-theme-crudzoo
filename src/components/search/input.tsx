import cn from "classnames"
import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import styles from "../../styles/components/SearchInput.module.css"

export default connectSearchBox(({ refine, onFocus, ...rest }: any) => {
  return (
    <form className={cn(styles.form)}>
      <input
        className={cn(styles.input)}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        onFocus={onFocus}
        // {...rest}
      />
    </form>
  )
})
