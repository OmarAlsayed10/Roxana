import type { ButtonVariant } from './constant'

export const ButtonTokens = {
  base: { className: 'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors duration-200' },
  variant: {
    solid: { className: 'bg-signal text-white hover:bg-ink' },
    outline: { className: 'border border-line text-ink hover:border-accent hover:text-accent' },
    ghost: { className: 'text-accent hover:text-ink' },
    light: { className: 'border border-white/45 text-white hover:border-white hover:bg-white/10' }
  } satisfies Record<ButtonVariant, { className: string }>
}
