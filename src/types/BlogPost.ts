export interface INode {
  parent: {
    changeTime: Date
    relativeDirectory: string
  }
  body: string
  id: string
  frontmatter: {
    title: string
    date: Date
    update: Date
    tags: string[]
    spoiler: string
    link?: string
    score?: number
    image: {
      childImageSharp: {
        fluid: any
      }
    }
  }
  headings: {
    value: string
    depth: number
  }[]
}

export interface IPageContext {
  prev: {
    parent: {
      relativeDirectory: string
    }
    frontmatter: {
      title: string
      tags: string[]
    }
  }
  next: {
    parent: {
      relativeDirectory: string
    }
    frontmatter: {
      title: string
      tags: string[]
    }
  }
}

export interface BlogPostProps {
  pageData: INode
  pageContext: IPageContext
}
