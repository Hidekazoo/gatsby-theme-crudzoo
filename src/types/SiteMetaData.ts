export interface ISiteMetaData {
  language: string
  title: string
  author: string
  job: string
  keywords: string[]
  heroText: string
  description: string
  siteUrl: string
  mainColor: string
  social: {
    twitter: string
  }
  algoliaSearch: boolean
}
