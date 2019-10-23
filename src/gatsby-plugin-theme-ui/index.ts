export default {
  colors: {
    primary: "#0091ea",
    secondary: "",
    gray: `#ddd`,
    text: `#202124`,
    textLead: `#757575`,
    textLink: `#1a73e8`,
  },
  fonts: {
    serif: ``,
    sanSerif: `"Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "Helvetica Neue", Helvetica, Arial, sans-serif`,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  styles: {
    root: {
      color: "text",
    },
    h1: {
      fontSize: 32,
      color: "text",
    },
    h2: {
      fontSize: 24,
      fontWeight: `400`,
      lineHeight: `32px`,
      color: "text",
      mt: 48,
      mb: 24,
    },
    h3: {
      fontSize: 20,
      lineHeight: `32px`,
      fontWeight: `400`,
      color: "text",
      mt: 32,
      mb: 16,
    },
    p: {
      fontSize: 16,
      lineHeight: `24px`,
      mt: 16,
      mb: 16,
    },
    a: {
      color: "textLink",
      textDecoration: "none",
    },
    li: {
      mt: 12,
      mb: 12,
    },
  },
  breakpoints: [`430px`, `600px`, `991px`],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}
