import * as React from "react"
import * as dayjs from "dayjs"
import { getLocalizedData } from "../utils/i18n"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

export const useLocalizeData = () => {
  const { language } = useSiteMetadata()
  const localizedData = getLocalizedData(language)
  const getLocalizedDate = (date: Date) => {
    return dayjs(date).format(localizedData.Date.format)
  }
  return { ...localizedData, getLocalizedDate }
}
