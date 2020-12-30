import * as React from "react"

interface SectionProps {
  isBgColor: boolean
}
export const Section: React.FC<SectionProps> = ({ children, isBgColor }) => {
  const bgColor = isBgColor && "bg-section"
  return (
    <div className={`mt-10 py-16 ${bgColor}`}>
      <div className="max-w-screen-xl px-12 mx-auto md:max-w-4xl">
        {children}
      </div>
    </div>
  )
}
