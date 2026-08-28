import type { BucketSize } from '../../content'

export type BucketProfile = {
  height: number
  topDiameter: number
  bottomDiameter: number
}

export const bucketProfiles: Record<BucketSize, BucketProfile> = {
  '2.5L': { height: 158, topDiameter: 168, bottomDiameter: 150 },
  '3kg': { height: 168, topDiameter: 180, bottomDiameter: 160 },
  '9L': { height: 245, topDiameter: 265, bottomDiameter: 235 },
  '13kg': { height: 282, topDiameter: 292, bottomDiameter: 260 }
}

export const millimetre = 0.001
