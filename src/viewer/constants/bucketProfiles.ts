import type { BucketSize } from '../../content'

export type BucketProfile = {
  height: number
  topDiameter: number
  bottomDiameter: number
  labelHeight: number
}

export const bucketProfiles: Record<BucketSize, BucketProfile> = {
  '1kg': { height: 120, topDiameter: 130, bottomDiameter: 115, labelHeight: 88 },
  '3kg': { height: 165, topDiameter: 180, bottomDiameter: 160, labelHeight: 124 },
  '9kg': { height: 245, topDiameter: 265, bottomDiameter: 235, labelHeight: 186 },
  '20kg': { height: 310, topDiameter: 310, bottomDiameter: 280, labelHeight: 236 }
}

export const millimetre = 0.001
