import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import type { BucketSize } from '../../content'
import { bucketProfiles, millimetre } from '../constants'
import { OrbitRig } from '../OrbitRig'
import { PaintBucket } from '../PaintBucket'
import { idleResumeMs, stageSettings } from './constant'
import { RoomEnvironments } from './RoomEnvironments'
import { RoomStageTokens } from './tokens'

type RoomStageProps = {
  size: BucketSize
  accent: string
  label: string | null
  viewScale: number
  autoRotate: boolean
  spin: number
  rooms: string[]
  activeRoom: number
}

export const RoomStage = ({ size, accent, label, viewScale, autoRotate, spin, rooms, activeRoom }: RoomStageProps) => {
  const [isRotating, setIsRotating] = useState(autoRotate)
  const resumeTimer = useRef<number | undefined>(undefined)
  const height = bucketProfiles[size].height * millimetre
  const frame = 1 / Math.max(viewScale, 0.1)
  const orbit = height * stageSettings.distanceFactor * frame * 0.7

  useEffect(() => () => window.clearTimeout(resumeTimer.current), [])

  const pauseRotation = () => {
    window.clearTimeout(resumeTimer.current)
    setIsRotating(false)
  }

  const resumeWhenIdle = () => {
    window.clearTimeout(resumeTimer.current)
    if (!autoRotate) return
    resumeTimer.current = window.setTimeout(() => setIsRotating(true), idleResumeMs)
  }

  return (
    <div {...RoomStageTokens.root} onPointerEnter={pauseRotation} onPointerLeave={resumeWhenIdle}>
      <Canvas
        dpr={stageSettings.dpr}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          position: [orbit, height * stageSettings.eyeHeightFactor * frame, orbit],
          fov: stageSettings.fov,
          near: 0.01,
          far: 50
        }}
      >
        <Suspense fallback={null}>
          <RoomEnvironments rooms={rooms} activeRoom={activeRoom} />
          <PaintBucket size={size} accent={accent} label={label} spin={spin} />
        </Suspense>
        <OrbitRig
          target={[0, height * stageSettings.targetHeightFactor, 0]}
          autoRotate={isRotating}
          onInteract={pauseRotation}
          onSettle={resumeWhenIdle}
        />
      </Canvas>
    </div>
  )
}
