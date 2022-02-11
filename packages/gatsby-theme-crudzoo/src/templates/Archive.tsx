import { graphql } from "gatsby"
import * as React from "react"

import ArticleList from "../components/article-list"
import { Content } from "../components/content"
import Layout from "../components/layout"
import Pager from "../components/pager"
import { IArticleNode } from "../types/Article"
import { ILocation } from "../types/Location"

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
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
            date
            tags
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
interface IArchiveProps {
  data: {
    allMdx: {
      edges: IArticleNode[]
    }
  }
  pageContext: any
  location: ILocation
}
const Archive = ({ data, pageContext, location }: IArchiveProps) => {
  const postData = data.allMdx.edges

  return (
    <Layout location={location}>
      <Content>
        <ArticleList articles={postData} />

        <Pager pageContext={pageContext} />
      </Content>
    </Layout>
  )
}

export default Archive
