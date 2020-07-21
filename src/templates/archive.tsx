import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import Pager from "../components/pager"
import ArticleList from "../components/ArticleList"
import { Section } from "../pages/index"
export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          body
          parent {
            ... on File {
              name
              relativeDirectory
            }
          }
          id
          frontmatter {
            title
            date(formatString: "Y年M月D日")
            spoiler
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
interface IProps {
  data: any
  pageContext: any
  location: any
}
const Archive = ({ data, pageContext, location }: IProps) => {
  const postData = data.allMdx.edges

  return (
    <Layout location={location}>
      <Section isBgColor={false}>
        <ArticleList articles={postData} />
        <Pager pageContext={pageContext} />
      </Section>
    </Layout>
  )
}

export default Archive
