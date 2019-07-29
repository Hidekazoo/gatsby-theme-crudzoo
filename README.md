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

### create gatsby-config.js

create gatsby-config.js in your root directory and write your site settings

#### Example

```javascript
//gatsby-config.js
module.exports = {
  siteMetadata: {
    language: `en`, // or `ja`
    title: `site title`,
    author: `your name`,
    keywords: [`blog`, `gatsby`],
    description: `site description`,
    siteUrl: `site url`,
    mainColor: `#e65100`,
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

### profile picture

put on your profile picture on assets/profile-pic.jpg

### write your first article

Write your first post at mdx on blog/hello-world/index.mdx.

#### Example

```
// blog/hello-world/index.mdx
---
id: "article-1"
title: "Hello world"
date: "2019-06-03T21:58:03.284Z"
tags: ["blog", "self-introduction"]
spoiler: "this is my first article"
image: "./thumbnail.jpg"
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
  │        ├── thumbnail.jpg
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
