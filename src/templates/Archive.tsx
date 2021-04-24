import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Pager from "../components/Pager"
import ArticleList from "../components/ArticleList"
import { Content } from "../components/Content"

import { IArticleNode } from "../types/Article"
import { ILocation } from "../types/Location"

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
            date
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
