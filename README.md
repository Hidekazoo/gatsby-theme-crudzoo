Gatsby-crudzoo is Gatsby theme.

Used in [https://crudzoo.com](https://crudzoo.com)

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

Add a new Scripts "develop" and "build" to your package.json

#### Example

```
{
  "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
  }
}
```

### create gatsby-config.js

create gatsby-config.js and write your site settings

#### Example

```javascript
//gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `site title`,
    author: `your name`,
    description: `site description`,
    siteUrl: `site url`,
    social: {
      twitter: `your twitter name`
    }
  },
  __experimentalThemes: [`gatsby-crudzoo`]
};
```

### profile picture

put on your profile picture on assets/profile-pic.jpg

### create your first page

Write your first post at markdown

#### Example

```
// content/hello-world/index.mdx**
---
title: Hello world
date: '2019-06-03T16:58:03.284Z'
tags: ['blog']
spoiler: 'hello world'
---

hello world!
```

### Folder Structure

```
    .
    ├── content
    │   └── hello-world
    │       └── index.mdx
    ├── assets
    │   └── profile-pic.jpg
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
