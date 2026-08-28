import type { Language } from '../../content'

export type Theme = 'light' | 'dark'

export type SiteControls = {
  language: Language
  setLanguage: (language: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}
