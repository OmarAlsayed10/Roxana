import { Vector2 } from 'three'
import { millimetre, type BucketProfile } from '../../constants'

const filletArc = (centreX: number, centreY: number, radius: number, steps: number) =>
  Array.from({ length: steps }, (_, step) => {
    const angle = (Math.PI / 2) * ((step + 1) / steps)
    return new Vector2(centreX + radius * Math.sin(angle), centreY - radius * Math.cos(angle))
  })

export const tinProfilePoints = (profile: BucketProfile) => {
  if (profile.height <= 0 || profile.topDiameter <= 0) {
    throw new Error('tinProfilePoints: dimensions must be positive')
  }

  const height = profile.height * millimetre
  const radius = (profile.topDiameter / 2) * millimetre
  const crimp = height * 0.04
  const bead = radius * 0.035

  return [
    new Vector2(0, 0),
    new Vector2(radius - crimp, 0),
    ...filletArc(radius - crimp, crimp, crimp, 4),
    new Vector2(radius + bead, crimp * 1.2),
    new Vector2(radius, crimp * 2),
    new Vector2(radius, height - crimp * 2),
    new Vector2(radius + bead, height - crimp * 1.2),
    new Vector2(radius + bead, height - crimp * 0.5),
    new Vector2(radius * 0.94, height),
    new Vector2(radius * 0.6, height - crimp * 0.35),
    new Vector2(0, height - crimp * 0.45)
  ]
}

export const tinMetrics = (profile: BucketProfile) => ({
  height: profile.height * millimetre,
  radius: (profile.topDiameter / 2) * millimetre,
  crimp: profile.height * millimetre * 0.04
})
