import { ISiteMetaData } from "../../types/SiteMetaData"

export const mockData: ISiteMetaData = {
  language: "ja",
  title: "title",
  author: "author",
  keywords: ["keyword1", "keyword2"],
  heroText: "heroText",
  description: "description",
  social: {
    twitter: "social twitter",
  },
}
export const useSiteMetadata = jest.fn().mockReturnValue(mockData)
