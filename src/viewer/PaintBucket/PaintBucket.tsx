import { useMemo } from 'react'
import { DoubleSide } from 'three'
import type { BucketSize } from '../../content'
import { bucketProfiles } from '../constants'
import { bandMaterial, bodyMaterial, handleMaterial, handleTubeFactor, latheSegments, lidMaterial, surfaceSkin } from './constant'
import { bucketMetrics, bucketProfilePoints, lidProfilePoints } from './utils'

type PaintBucketProps = {
  size: BucketSize
  accent: string
  spin: number
}

export const PaintBucket = ({ size, accent, spin }: PaintBucketProps) => {
  const profile = bucketProfiles[size]
  const { bodyPoints, lidPoints, metrics } = useMemo(
    () => ({
      bodyPoints: bucketProfilePoints(profile),
      lidPoints: lidProfilePoints(profile),
      metrics: bucketMetrics(profile)
    }),
    [profile]
  )

  const { height, topRadius, bottomRadius, labelHeight } = metrics
  const radiusAt = (y: number) => bottomRadius + (topRadius - bottomRadius) * (y / height)
  const bandBottom = height * 0.15
  const bandTop = Math.min(bandBottom + labelHeight, height * 0.9)
  const skin = surfaceSkin

  return (
    <group rotation={[0, spin, 0]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[bodyPoints, latheSegments]} />
        <meshPhysicalMaterial {...bodyMaterial} side={DoubleSide} />
      </mesh>

      <mesh position={[0, (bandBottom + bandTop) / 2, 0]} castShadow>
        <cylinderGeometry
          args={[radiusAt(bandTop) + skin, radiusAt(bandBottom) + skin, bandTop - bandBottom, latheSegments, 1, true]}
        />
        <meshPhysicalMaterial {...bandMaterial} color={accent} />
      </mesh>

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
