interface ILocale {
  Bio: {
    author: string
  }
  BlogPost: {
    update: string
    lastUpdate: string
  }
  Archive: {
    list: string
    prev: string
    next: string
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
    Archive: {
      list: "All Articles",
      prev: "Prev",
      next: "Next",
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
        Archive: {
          list: "投稿一覧",
          prev: "古い投稿へ",
          next: "新しい投稿へ",
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
