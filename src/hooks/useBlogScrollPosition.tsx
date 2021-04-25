import * as React from "react"

const calcHeadersPosition = () => {
  const Headers = document.querySelectorAll(`[data-id="heading"]`)
  const data: DOMRect[] = []
  if (Headers) {
    for (let i = 0; i < Headers.length; i++) {
      data.push(Headers[i].getBoundingClientRect())
    }
  }
  return { data, Headers }
}

export const useBlogScrollPosition = () => {
  const [position, setPositon] = React.useState<DOMRect[]>([])
  const [activeHeadingNumber, setActiveHeadingNumber] = React.useState(0)

  const onScroll = () => {
    if (position.length === 0) {
      const { data } = calcHeadersPosition()
      setPositon(data)
    }

    const element = document.documentElement
    const scrollPosition = element.scrollTop || document.body.scrollTop
    let readingHeader = 0
    for (let i = 0; i < position.length; i++) {
      if (scrollPosition < position[i]["top"]) {
        readingHeader = i - 1
        break
      }
      readingHeader = i
    }
    if (readingHeader < 0) readingHeader = 0
    if (element.scrollHeight - element.scrollTop <= element.clientHeight) {
      readingHeader = position.length - 1
    }
    setActiveHeadingNumber(readingHeader)
  }

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [position])

  return { activeHeadingNumber }
}
