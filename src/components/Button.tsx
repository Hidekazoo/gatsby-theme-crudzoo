import * as React from "react"

export const Button: React.FC = ({ children }) => {
  return (
    <button className="rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-200 md:text-lg xl:text-base text-gray-800 font-semibold leading-tight shadow-md max-w-xs truncate">
      {children}
    </button>
  )
}
