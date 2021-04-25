Gatsby-crudzoo is Gatsby theme for blog site. gatsby@3 supported

## Demo site

[demo](https://sharp-pike-0a4ab7.netlify.com/)

[repository](https://github.com/Hidekazoo/gatsby-crudzoo-demo)

I also use gatsby-crudzoo theme on my website.
[https://crudzoo.com](https://crudzoo.com)

## Getting started

### Installation

```
npm init -y
npm install gatsby react react-dom gatsby-crudzoo gatsby-plugin-postcss
```

or using yarn

```
yarn init -y
yarn add gatsby react react-dom gatsby-crudzoo gatsby-plugin-postcss
```

### Update package.json

Add a new Scripts "develop" and "build" to your package.json. And It is convenient to add cache clear command "clean"

#### Example

```
{
  "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
    "clean": "rm -rf .cache public"
  }
}
```

### create setting files

create setting files in your root directory.

#### gatsby-config.js

##### Example

```javascript
module.exports = {
  siteMetadata: {
    language: `en`,
    title: `site title`,
    author: `your name`,
    keywords: [`blog`, `gatsby`],
    heroText: ``,
    description: `site description`,
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
}
```

### write your first article

Write your first post at mdx on blog/hello-world/index.mdx and place the thumbnail file in the same folder.

Include the following key in the first article to avoid graphql errors

1. id
1. title
1. date
1. tags
1. spoiler
1. image
1. template
1. link
1. score

#### Example

```
// blog/about/index.mdx
---
id: "article-1"
title: "Profile Page"
date: "2019-06-03T21:58:03.284Z"
tags: ["profile", "self-introduction"]
spoiler: "this is my first article"
image: "./thumbnail.png"
template: ""
link: ""
score: ""
---

hello world!
```

### Series folder

By creating a json file in the series folder, You can create a list of articles called series

```json
{
  "seriesId": "sample",
  "title": "sample title",
  "spoiler": "my sample series",
  "image": "sample.png",
  "articles": ["article-1"]
}
```

### Folder Structure

the folder structure is as follows

```
  .
  ├── blog
  │   └── about
  │        ├── thumbnail.png
  │        └── index.mdx
  ├── series
  │   ├── sample.png
  │   └── sample.json
  │
  ├── gatsby-config.js
  ├── package-lock.json
  └── package.json
```

### Start Developing

```
npm develop
```

or using yarn

```
yarn develop
```

## book-review template

There is a template for book reviews. If you are writing a book review article, this may be useful.

```
---
title: Sample Book
date: "2020-12-31T12:26:28+09:00"
tags: ["Book Review"]
spoiler: "spoiler"
image: ./thumbnail.jpg
score: 5
template: "book-review"
link: "https://example.com"
---

your review
```

## Recommended override Components

Use shadowing to use the original Component.
Create in the next level `src/gatsby-crudzoo/components`

- HeroImg.tsx
- HomeHeroDescription.tsx
- HomeSidebarBlock.tsx

see demo site [repository](https://github.com/Hidekazoo/gatsby-crudzoo-demo)
