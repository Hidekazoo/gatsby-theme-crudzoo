import * as path from "path"

import * as withDefaults from "../utils/DefaultOptions"

const { basePath, blogPath, blogsPath } = withDefaults({})
export const routes = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/series",
    title: "Series",
  },
  {
    path: path.join(basePath, blogsPath),
    title: "Blogs",
  },
]
