// module.exports = () => ({
//   plugins: [require("tailwindcss"), require("autoprefixer")],
// })

const postcssPresetEnv = require(`postcss-preset-env`)
// const require("tailwindcss")

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
    }),
  ],
})
