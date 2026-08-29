import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import type { ProductForm, ProfileKey } from '../../content'
import { bucketProfiles, millimetre, sackProfile } from '../constants'
import { OrbitRig } from '../OrbitRig'
import { ProductModel } from '../ProductModel'
import { idleResumeMs, stageSettings } from './constant'
import { RoomEnvironments } from './RoomEnvironments'
import { RoomStageTokens } from './tokens'

type RoomStageProps = {
  form: ProductForm
  profile: ProfileKey
  accent: string
  label: string | null
  labelOffset: number
  viewScale: number
  autoRotate: boolean
  allowZoom: boolean
  spinSpeed: number
  rooms: string[]
  activeRoom: number
}

export const RoomStage = ({ form, profile, accent, label, labelOffset, viewScale, autoRotate, allowZoom, spinSpeed, rooms, activeRoom }: RoomStageProps) => {
  const [isRotating, setIsRotating] = useState(autoRotate)
  const resumeTimer = useRef<number | undefined>(undefined)
  const height =
    (form === 'sack' ? sackProfile.height : bucketProfiles[profile as Exclude<ProfileKey, 'sack'>].height) * millimetre
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
          <ProductModel
            form={form}
            profile={profile}
            accent={accent}
            label={label}
            labelOffset={labelOffset}
            spinSpeed={isRotating ? spinSpeed : 0}
          />
        </Suspense>
        <OrbitRig
          target={[0, height * stageSettings.targetHeightFactor, 0]}
          distance={Math.hypot(orbit, height * stageSettings.eyeHeightFactor * frame - height * stageSettings.targetHeightFactor, orbit)}
          allowZoom={allowZoom}
          autoRotate={isRotating}
          onInteract={pauseRotation}
          onSettle={resumeWhenIdle}
        />
      </Canvas>
    </div>
  )
}
