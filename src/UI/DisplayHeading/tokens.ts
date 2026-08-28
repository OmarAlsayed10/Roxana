import type { HeadingLevel } from './constant'

export const DisplayHeadingTokens: Record<HeadingLevel, { className: string }> = {
  1: { className: 'text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-[-.02em]' },
  2: { className: 'text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-[1.12] tracking-[-.015em]' },
  3: { className: 'text-[clamp(1.15rem,2vw,1.5rem)] font-bold leading-[1.3]' }
}
