import { useStaticQuery, graphql } from "gatsby"

const useBlogThemeConfig = () => {
  const data = useStaticQuery(graphql`
    query {
      crudzooThemeConfig(id: { eq: "gatsby-theme-crudzoo-config" }) {
        webfontURL
        b
      }
    }
  `)

  return data.crudzooThemeConfig
}

export default useBlogThemeConfig
