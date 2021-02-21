import * as React from "react"
import { Link } from "gatsby"
import { useLocalizeData } from "../hooks/useLocalize"
import { IPageContext } from "../types/BlogPost"

interface BlogPostFooterNavProps {
  pageContext: IPageContext
}
export const BlogPostFooterNav: React.FC<BlogPostFooterNavProps> = props => {
  const { prev, next } = props.pageContext
  const localizedData = useLocalizeData()
  return (
    <nav>
      <div>
        {prev && (
          <>
            <h2 className="text-gray-600 text-md mt-5 break-normal">
              {localizedData.Archive.prev}
            </h2>
            <Link to={`/blog/${prev.parent.relativeDirectory}`} rel="prev">
              {prev.frontmatter.title}
            </Link>
          </>
        )}
      </div>

      <div>
        {next && (
          <>
            <h2 className="text-gray-600 text-md mt-5 break-all w-full leading-10">
              {localizedData.Archive.next}
            </h2>
            <Link to={`/blog/${next.parent.relativeDirectory}`} rel="next">
              {next.frontmatter.title}
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
