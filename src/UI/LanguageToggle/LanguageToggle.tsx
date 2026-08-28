import type { Language } from '../../content'
import { LanguageToggleTokens } from './tokens'

type LanguageToggleProps = {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageToggle = ({ language, setLanguage }: LanguageToggleProps) => (
  <button
    type="button"
    {...LanguageToggleTokens.root}
    onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
    aria-label={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
  >
    {language === 'ar' ? 'EN' : 'ع'}
  </button>
)
