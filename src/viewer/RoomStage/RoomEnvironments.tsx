import { useLayoutEffect } from 'react'
import { Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { EquirectangularReflectionMapping } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { stageSettings } from './constant'

type RoomEnvironmentsProps = {
  rooms: string[]
  activeRoom: number
}

export const RoomEnvironments = ({ rooms, activeRoom }: RoomEnvironmentsProps) => {
  const maps = useLoader(RGBELoader, rooms)

  useLayoutEffect(() => {
    maps.forEach((map) => {
      map.mapping = EquirectangularReflectionMapping
    })
  }, [maps])

  return (
    <Environment
      map={maps[Math.min(activeRoom, maps.length - 1)]}
      background
      backgroundBlurriness={stageSettings.backgroundBlurriness}
      environmentIntensity={stageSettings.environmentIntensity}
    />
  )
}
