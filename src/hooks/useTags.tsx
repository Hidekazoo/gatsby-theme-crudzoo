import { graphql, useStaticQuery } from "gatsby"

interface data {
  allMdx: {
    edges: {
      node: {
        frontmatter: {
          tags: string[] | null
        }
      }
    }[]
  }
}
export const useTags = (): string[] => {
  const data: data = useStaticQuery(graphql`
    {
      allMdx {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)
  let tags: string[] = []
  const nodes = data.allMdx.edges
  nodes.map(item => {
    if (item.node.frontmatter.tags !== null) {
      tags = [...tags, ...item.node.frontmatter.tags]
    }
  })
  const uniqueTags = tags.filter((v, i) => tags.indexOf(v) === i).sort()
  return uniqueTags
}
