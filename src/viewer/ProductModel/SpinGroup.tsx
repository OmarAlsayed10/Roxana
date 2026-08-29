import { useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

const EASING = 6

type SpinGroupProps = {
  speed: number
  children: ReactNode
}

export const SpinGroup = ({ speed, children }: SpinGroupProps) => {
  const group = useRef<Group>(null)
  const current = useRef(0)

  useFrame((_, delta) => {
    const step = Math.min(delta * EASING, 1)
    current.current += (speed - current.current) * step
    if (group.current) group.current.rotation.y += delta * current.current
  })

  return <group ref={group}>{children}</group>
}
