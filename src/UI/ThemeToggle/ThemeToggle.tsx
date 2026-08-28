import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../../shared/types'
import { ThemeToggleTokens } from './tokens'

type ThemeToggleProps = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => (
  <button
    type="button"
    {...ThemeToggleTokens.root}
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    aria-label={theme === 'dark' ? 'Light theme' : 'Dark theme'}
  >
    {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
  </button>
)
