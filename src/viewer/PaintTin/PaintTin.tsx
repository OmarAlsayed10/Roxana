import { useMemo } from 'react'
import { DoubleSide } from 'three'
import type { ProfileKey } from '../../content'
import { bucketProfiles } from '../constants'
import { bailMaterial, bailRadiusFactor, bailTubeFactor, shellMaterial, tinSegments } from './constant'
import { TinLabel } from './TinLabel'
import { tinMetrics, tinProfilePoints } from './utils'

type PaintTinProps = {
  profile: Exclude<ProfileKey, 'sack'>
  accent: string
  label: string | null
  labelOffset: number
}

export const PaintTin = ({ profile, accent, label, labelOffset }: PaintTinProps) => {
  const dimensions = bucketProfiles[profile]
  const { points, metrics } = useMemo(
    () => ({ points: tinProfilePoints(dimensions), metrics: tinMetrics(dimensions) }),
    [dimensions]
  )

  const { height, radius, crimp } = metrics
  const bailY = height - crimp * 1.2

  return (
    <group>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, tinSegments]} />
        <meshStandardMaterial {...shellMaterial} side={DoubleSide} />
      </mesh>

      <TinLabel url={label} accent={accent} offset={labelOffset} radius={radius} height={height} crimp={crimp} />

      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * radius * 0.99, bailY, 0]} castShadow>
          <sphereGeometry args={[height * bailTubeFactor * 1.7, 12, 12]} />
          <meshStandardMaterial {...bailMaterial} />
        </mesh>
      ))}

      <mesh position={[0, bailY, 0]}>
        <torusGeometry args={[radius * bailRadiusFactor, height * bailTubeFactor, 12, 64, Math.PI]} />
        <meshStandardMaterial {...bailMaterial} />
      </mesh>
    </group>
  )
}
