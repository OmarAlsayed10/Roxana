import type { ReactNode } from 'react'
import { SectionLabelTokens } from './tokens'

export const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p {...SectionLabelTokens.root}>{children}</p>
)
