import * as React from "react"
import { Link } from "gatsby"
import { useLocalizeData } from "../hooks/useLocalize"
import cn from "classnames"
import styles from "../styles/components/BlogPostFooterNav.module.css"
import { IPageContext } from "../types/BlogPost"

interface BlogPostFooterNavProps {
  pageContext: IPageContext
}
export const BlogPostFooterNav: React.FC<BlogPostFooterNavProps> = props => {
  const { prev, next } = props.pageContext
  const localizedData = useLocalizeData()
  return (
    <nav className={cn(styles.container)}>
      <div>
        {prev && (
          <>
            <div className={cn(styles.navTitle)}>
              {localizedData.Archive.prev}
            </div>
            <Link to={`/blog/${prev.parent.relativeDirectory}`} rel="prev">
              <h2 className={cn(styles.articleTitle)}>
                {prev.frontmatter.title}
              </h2>
            </Link>
          </>
        )}
      </div>

      <div>
        {next && (
          <>
            <div className={cn(styles.navTitle)}>
              {localizedData.Archive.next}
            </div>
            <Link to={`/blog/${next.parent.relativeDirectory}`} rel="next">
              <h2 className={cn(styles.articleTitle)}>
                {next.frontmatter.title}
              </h2>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
