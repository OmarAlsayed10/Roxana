import type { CSSProperties, ReactNode } from 'react'
import { BadgeTokens } from './tokens'

type BadgeProps = {
  children: ReactNode
  accent?: string
}

export const Badge = ({ children, accent }: BadgeProps) => (
  <span
    className={`${BadgeTokens.root.className} ${accent ? BadgeTokens.accented.className : ''}`}
    style={accent ? ({ backgroundColor: accent } as CSSProperties) : undefined}
  >
    {children}
  </span>
)
