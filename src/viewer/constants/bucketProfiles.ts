import type { ProfileKey } from '../../content'

export type BucketProfile = {
  height: number
  topDiameter: number
  bottomDiameter: number
}

export type SackProfile = {
  height: number
  width: number
  depth: number
}

export const bucketProfiles: Record<Exclude<ProfileKey, 'sack'>, BucketProfile> = {
  'pail-jumbo': { height: 292, topDiameter: 300, bottomDiameter: 266 },
  'pail-small': { height: 252, topDiameter: 264, bottomDiameter: 234 },
  'tin-sm': { height: 112, topDiameter: 100, bottomDiameter: 100 },
  'tin-lg': { height: 175, topDiameter: 160, bottomDiameter: 160 }
}

export const sackProfile: SackProfile = { height: 520, width: 430, depth: 155 }

export const millimetre = 0.001
