interface ILocale {
  Bio: {
    author: string
  }
  BlogPost: {
    update: string
    lastUpdate: string
  }
}

export function getLocalizedData(lang: string): ILocale {
  let localizedData: ILocale = {
    Bio: {
      author: "author",
    },
    BlogPost: {
      update: "publish date",
      lastUpdate: "last update",
    },
  }

  switch (lang) {
    case "ja":
      localizedData = {
        Bio: {
          author: "作者",
        },
        BlogPost: {
          update: "公開日",
          lastUpdate: "最終更新日",
        },
      }
      return localizedData
    default:
      localizedData
  }

  return localizedData
}

export function formatPostDate(date: Date, lang: string) {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date
  }
  date = new Date(date)
  const args = [{ day: "numeric", month: "long", year: "numeric" }].filter(
    Boolean
  )

  return date.toLocaleDateString(lang, ...args)!
}
