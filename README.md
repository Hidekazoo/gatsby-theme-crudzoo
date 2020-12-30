Gatsby-crudzoo is Gatsby theme for blog site.

## Demo site

[demo](https://sharp-pike-0a4ab7.netlify.com/)

demo site repository: https://github.com/Hidekazoo/gatsby-crudzoo-demo

I also use gatsby-crudzoo theme on my website.
[https://crudzoo.com](https://crudzoo.com)

## Getting started

### Installation

```
npm init -y
npm install gatsby react react-dom gatsby-crudzoo
```

or using yarn

```
yarn init -y
yarn add gatsby react react-dom gatsby-crudzoo
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
//gatsby-config.js
module.exports = {
  siteMetadata: {
    language: `en`, // or `ja`
    title: `site title`,
    author: `your name`,
    job: ``,
    keywords: [`blog`, `gatsby`],
    heroText: ``,
    description: `site description`,
    siteUrl: `http://example.com`,
    social: {
      twitter: `your twitter name`,
    },
    algoliaSearch: false,
  },
  plugins: [
    {
      resolve: "gatsby-crudzoo",
      options: {},
    },
  ],
}
```

#### tailwind.config.js

```javascript
module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      sanSerif: ``,
    },
    extend: {
      colors: {
        primary: "#0091ea",
        section: "#0091ea0f",
      },
    },
  },
  variants: {},
  plugins: [],
}
```

### profile picture

put on your profile picture on assets/profile-pic.jpg

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
  │   └── hello-world
  │        ├── thumbnail.png
  │        └── index.mdx
  ├── assets
  │   └── profile-pic.jpg
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
