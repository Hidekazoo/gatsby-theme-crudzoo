export interface ISeriesNode {
  node: {
    id: string
    title: string
    seriesId: string
    spoiler: string
    image: {
      childImageSharp: {
        fluid: any
      }
    } | null
  }
}
