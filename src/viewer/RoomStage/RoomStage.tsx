import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import type { BucketSize } from '../../content'
import { bucketProfiles, millimetre } from '../constants'
import { OrbitRig } from '../OrbitRig'
import { PaintBucket } from '../PaintBucket'
import { stageSettings } from './constant'
import { RoomEnvironments } from './RoomEnvironments'
import { RoomStageTokens } from './tokens'

type RoomStageProps = {
  size: BucketSize
  accent: string
  viewScale: number
  autoRotate: boolean
  spin: number
  rooms: string[]
  activeRoom: number
}

export const RoomStage = ({ size, accent, viewScale, autoRotate, spin, rooms, activeRoom }: RoomStageProps) => {
  const [isRotating, setIsRotating] = useState(autoRotate)
  const height = bucketProfiles[size].height * millimetre
  const frame = 1 / Math.max(viewScale, 0.1)
  const orbit = height * stageSettings.distanceFactor * frame * 0.7

  return (
    <div {...RoomStageTokens.root}>
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
          <PaintBucket size={size} accent={accent} spin={spin} />
        </Suspense>
        <OrbitRig
          target={[0, height * stageSettings.targetHeightFactor, 0]}
          autoRotate={isRotating}
          onInteract={() => setIsRotating(false)}
        />
      </Canvas>
    </div>
  )
}
