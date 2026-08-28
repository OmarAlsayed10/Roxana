import type { ReactNode } from 'react'
import { PageShellTokens } from './tokens'

type PageShellProps = {
  children: ReactNode
  padded?: boolean
  className?: string
}

export const PageShell = ({ children, padded = true, className = '' }: PageShellProps) => (
  <div className={`${PageShellTokens.root.className} ${padded ? PageShellTokens.section.className : ''} ${className}`}>
    {children}
  </div>
)
