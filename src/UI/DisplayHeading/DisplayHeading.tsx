import type { ReactNode } from 'react'
import { headingTags, type HeadingLevel } from './constant'
import { DisplayHeadingTokens } from './tokens'

type DisplayHeadingProps = {
  level: HeadingLevel
  children: ReactNode
  className?: string
}

export const DisplayHeading = ({ level, children, className = '' }: DisplayHeadingProps) => {
  const Tag = headingTags[level]
  return <Tag className={`${DisplayHeadingTokens[level].className} ${className}`}>{children}</Tag>
}
