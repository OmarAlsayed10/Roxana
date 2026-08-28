import { useId } from 'react'
import { bandPath, bodyPath, handleColour, handlePath, markGeometry } from './constant'
import { BucketMarkTokens } from './tokens'

type BucketMarkProps = {
  accent: string
  className?: string
}

export const BucketMark = ({ accent, className = '' }: BucketMarkProps) => {
  const id = useId()
  const bodyGradient = `body-${id}`
  const lidGradient = `lid-${id}`
  const shadeGradient = `shade-${id}`
  const dropShadow = `drop-${id}`
  const { topY, bottomY, topHalfWidth, lidRadiusY } = markGeometry

  return (
    <svg viewBox={markGeometry.viewBox} className={`${BucketMarkTokens.root.className} ${className}`} role="presentation">
      <defs>
        <linearGradient id={bodyGradient} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8c0b3" />
          <stop offset=".2" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#efeae1" />
          <stop offset="1" stopColor="#9e9588" />
        </linearGradient>
        <linearGradient id={lidGradient} x1="0" y1="0" x2=".9" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#f1ece4" />
          <stop offset="1" stopColor="#c4bcae" />
        </linearGradient>
        <linearGradient id={shadeGradient} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity=".3" />
          <stop offset=".22" stopColor="#ffffff" stopOpacity=".36" />
          <stop offset=".56" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity=".34" />
        </linearGradient>
        <radialGradient id={dropShadow}>
          <stop offset="0" stopColor="#000000" stopOpacity=".4" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy={bottomY + 22} rx="84" ry="15" fill={`url(#${dropShadow})`} />
      <path d={handlePath} fill="none" stroke={handleColour} strokeWidth="5" strokeLinecap="round" />
      <path d={bodyPath} fill={`url(#${bodyGradient})`} />
      <path d={bandPath} fill={accent} />
      <path d={bodyPath} fill={`url(#${shadeGradient})`} />
      <ellipse cx="100" cy={topY + 4} rx={topHalfWidth} ry={lidRadiusY} fill={`url(#${bodyGradient})`} />
      <ellipse cx="100" cy={topY - 3} rx={topHalfWidth - 3} ry={lidRadiusY - 1} fill={`url(#${lidGradient})`} />
      <ellipse
        cx="100"
        cy={topY - 3}
        rx={topHalfWidth - 16}
        ry={lidRadiusY - 5}
        fill="none"
        stroke="#000000"
        strokeOpacity=".08"
      />
    </svg>
  )
}
