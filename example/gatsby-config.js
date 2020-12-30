module.exports = {
  siteMetadata: {
    language: `en`, // or `ja`
    title: `Site Title`,
    author: `your name`,
    job: `Engineer`,
    keywords: [`blog`, `gatsby`],
    heroText: `My Blog Site`,
    description: `site description`,
    siteUrl: `http://example.com`,
    social: {
      twitter: `your twitter name`,
    },
    algoliaSearch: true,
  },
  plugins: [
    {
      resolve: "gatsby-crudzoo",
      options: {},
    },
  ],
}