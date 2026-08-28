import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export const preloadRoomStageAssets = (labels: string[], rooms: string[]) => {
  labels.forEach((label) => useTexture.preload(label))
  rooms.forEach((room) => useLoader.preload(RGBELoader, room))
}
