import { useMemo } from 'react'
import { DoubleSide } from 'three'
import type { BucketSize } from '../../content'
import { bucketProfiles } from '../constants'
import { ColourBand } from './ColourBand'
import { bodyMaterial, handleMaterial, handleTubeFactor, latheSegments, lidMaterial } from './constant'
import { LabelBand } from './LabelBand'
import { bucketMetrics, bucketProfilePoints, lidProfilePoints } from './utils'

type PaintBucketProps = {
  size: BucketSize
  accent: string
  label: string | null
  labelOffset: number
  spin: number
}

export const PaintBucket = ({ size, accent, label, labelOffset, spin }: PaintBucketProps) => {
  const profile = bucketProfiles[size]
  const { bodyPoints, lidPoints, metrics } = useMemo(
    () => ({
      bodyPoints: bucketProfilePoints(profile),
      lidPoints: lidProfilePoints(profile),
      metrics: bucketMetrics(profile)
    }),
    [profile]
  )

  const { height, topRadius, bottomRadius } = metrics

  return (
    <group rotation={[0, spin, 0]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[bodyPoints, latheSegments]} />
        <meshPhysicalMaterial {...bodyMaterial} side={DoubleSide} />
      </mesh>

      {label ? (
        <LabelBand url={label} offset={labelOffset} height={height} topRadius={topRadius} bottomRadius={bottomRadius} />
      ) : (
        <ColourBand accent={accent} height={height} topRadius={topRadius} bottomRadius={bottomRadius} />
      )}

      <mesh castShadow>
        <latheGeometry args={[lidPoints, latheSegments]} />
        <meshPhysicalMaterial {...lidMaterial} side={DoubleSide} />
      </mesh>

      <mesh position={[0, height * 0.97, 0]}>
        <torusGeometry args={[topRadius * 0.99, height * handleTubeFactor, 12, 48, Math.PI]} />
        <meshStandardMaterial {...handleMaterial} />
      </mesh>
    </group>
  )
}
