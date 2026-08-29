import { useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Quaternion, Vector3, type Group } from 'three'

const parentSpin = new Quaternion()
const worldPosition = new Vector3()

const yawOf = (spin: Quaternion) =>
  Math.atan2(2 * (spin.w * spin.y + spin.x * spin.z), 1 - 2 * (spin.y * spin.y + spin.x * spin.x))

/** Keeps its children square to the camera, so an arc never reads as lopsided. */
export const FaceCamera = ({ children }: { children: ReactNode }) => {
  const group = useRef<Group>(null)

  useFrame(({ camera }) => {
    const node = group.current
    if (!node?.parent) return

    node.parent.getWorldQuaternion(parentSpin)
    node.getWorldPosition(worldPosition)

    const toCamera = Math.atan2(camera.position.x - worldPosition.x, camera.position.z - worldPosition.z)
    node.rotation.y = toCamera - yawOf(parentSpin)
  })

  return <group ref={group}>{children}</group>
}
