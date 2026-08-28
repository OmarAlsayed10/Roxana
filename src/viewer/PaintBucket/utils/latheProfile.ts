import { Vector2 } from 'three'
import { millimetre, type BucketProfile } from '../../constants'

const filletArc = (centreX: number, centreY: number, radius: number, steps: number) =>
  Array.from({ length: steps }, (_, step) => {
    const angle = (Math.PI / 2) * ((step + 1) / steps)
    return new Vector2(centreX + radius * Math.sin(angle), centreY - radius * Math.cos(angle))
  })

export const bucketProfilePoints = (profile: BucketProfile) => {
  if (profile.height <= 0 || profile.topDiameter <= 0 || profile.bottomDiameter <= 0) {
    throw new Error('bucketProfilePoints: dimensions must be positive')
  }
  const height = profile.height * millimetre
  const topRadius = (profile.topDiameter / 2) * millimetre
  const bottomRadius = (profile.bottomDiameter / 2) * millimetre
  const fillet = Math.min(bottomRadius, height) * 0.09
  const rim = height * 0.06
  const bead = topRadius * 0.035

  return [
    new Vector2(0, 0),
    new Vector2(bottomRadius - fillet, 0),
    ...filletArc(bottomRadius - fillet, fillet, fillet, 5),
    new Vector2(topRadius, height - rim),
    new Vector2(topRadius + bead, height - rim * 0.55),
    new Vector2(topRadius + bead, height - rim * 0.2),
    new Vector2(topRadius, height),
    new Vector2(topRadius * 0.965, height),
    new Vector2(topRadius * 0.94, height - rim * 0.25),
    new Vector2(0, height - rim * 0.25)
  ]
}

export const lidProfilePoints = (profile: BucketProfile) => {
  const height = profile.height * millimetre
  const topRadius = (profile.topDiameter / 2) * millimetre
  const rim = height * 0.06
  const lidTop = height + rim * 0.55

  return [
    new Vector2(0, lidTop),
    new Vector2(topRadius * 0.92, lidTop),
    new Vector2(topRadius + rim * 0.12, height + rim * 0.2),
    new Vector2(topRadius + rim * 0.12, height - rim * 0.35),
    new Vector2(topRadius * 0.995, height - rim * 0.45),
    new Vector2(topRadius * 0.995, height - rim * 0.1),
    new Vector2(0, height - rim * 0.1)
  ]
}

export const bucketMetrics = (profile: BucketProfile) => ({
  height: profile.height * millimetre,
  topRadius: (profile.topDiameter / 2) * millimetre,
  bottomRadius: (profile.bottomDiameter / 2) * millimetre
})
