import { ISiteMetaData } from "../../types/SiteMetaData"

export const mockData: ISiteMetaData = {
  language: "ja",
  title: "title",
  author: "author",
  job: "job",
  keywords: ["keyword1", "keyword2"],
  heroText: "heroText",
  description: "description",
  siteUrl: "http://localhost",
  mainColor: "#fff",
  social: {
    twitter: "social twitter",
  },
  algoliaSearch: false,
}
export const useSiteMetadata = jest.fn().mockReturnValue(mockData)
