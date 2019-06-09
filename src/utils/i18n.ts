interface ILocale {
  Bio: {
    author: string;
  };
  BlogPost: {
    update: string;
    lastUpdate: string;
  };
  Font: {
    fontFamily: string;
  };
}

export function getLocalizedData(lang: string): ILocale {
  let localizedData: ILocale = {
    Bio: {
      author: 'author'
    },
    BlogPost: {
      update: 'date',
      lastUpdate: 'last update'
    },
    Font: {
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif'
    }
  };

  switch (lang) {
    case 'ja':
      localizedData = {
        Bio: {
          author: '作者'
        },
        BlogPost: {
          update: '更新日',
          lastUpdate: '最終更新日'
        },
        Font: {
          fontFamily:
            '"Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "Helvetica Neue", Helvetica, Arial, sans-serif'
        }
      };
      return localizedData;
    default:
      localizedData;
  }

  return localizedData;
}

export function formatPostDate(date: Date, lang: string) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }
  date = new Date(date);
  const args = [{ day: 'numeric', month: 'long', year: 'numeric' }].filter(
    Boolean
  );

  return date.toLocaleDateString(lang, ...args)!;
}
