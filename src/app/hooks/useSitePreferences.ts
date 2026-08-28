import { useEffect, useState } from 'react'
import type { Language } from '../../content'
import type { SiteControls, Theme } from '../../shared/types'

const readStored = <Value extends string>(key: string, fallback: Value) => {
  const stored = localStorage.getItem(key)
  return (stored as Value) || fallback
}

export const useSitePreferences = (): SiteControls => {
  const [language, setLanguage] = useState<Language>(() => readStored<Language>('roxana-language', 'ar'))
  const [theme, setTheme] = useState<Theme>(() => readStored<Theme>('roxana-theme', 'light'))

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dataset.language = language
    localStorage.setItem('roxana-language', language)
  }, [language])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('roxana-theme', theme)
  }, [theme])

  return { language, setLanguage, theme, setTheme }
}
