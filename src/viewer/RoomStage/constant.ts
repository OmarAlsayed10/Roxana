import { assetPath } from '../../shared/utils/assetPath'

export const roomFiles = ['room/interior.hdr', 'room/lebombo.hdr', 'room/hotel_room.hdr'].map(assetPath)

export const defaultRooms = [roomFiles[0]]

export const idleResumeMs = 2500

export const stageSettings = {
  fov: 30,
  dpr: [1, 1.75] as [number, number],
  backgroundBlurriness: 0.05,
  environmentIntensity: 1.05,
  distanceFactor: 6,
  eyeHeightFactor: 4.2,
  targetHeightFactor: 0.6
}
