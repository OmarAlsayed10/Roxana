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
  const room = useLoader(RGBELoader, rooms[Math.min(activeRoom, rooms.length - 1)])

  useLayoutEffect(() => {
    room.mapping = EquirectangularReflectionMapping
  }, [room])

  return (
    <Environment
      map={room}
      background
      backgroundBlurriness={stageSettings.backgroundBlurriness}
      environmentIntensity={stageSettings.environmentIntensity}
    />
  )
}
