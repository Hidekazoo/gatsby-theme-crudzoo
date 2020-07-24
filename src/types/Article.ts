export interface IArticleNode {
  node: {
    body: string
    parent: {
      name: string
      relativeDirectory: string
    }
    id: string
    frontmatter: {
      title: string
      date: Date
      spoiler: string | undefined
      image: {
        childImageSharp: {
          fluid: any
        }
      } | null
    }
  }
}
