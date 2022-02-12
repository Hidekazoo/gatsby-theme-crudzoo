module.exports = {
  siteMetadata: {
    language: `en`, // or `ja`
    title: `gatsby-theme-crudzoo demo site`,
    author: `your name`,
    job: `Engineer`,
    keywords: [`blog`],
    heroText: `My Blog Site`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida neque convallis a cras.`,
    siteUrl: `http://example.com`,
    social: {
      twitter: `your twitter name`,
    },
  },
  plugins: [
    {
      resolve: "gatsby-crudzoo",
      options: {},
    },
  ],
};
