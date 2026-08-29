import { OrbitControls } from '@react-three/drei'
import { orbitSettings } from './constant'

type OrbitRigProps = {
  target: [number, number, number]
  distance: number
  allowZoom: boolean
  autoRotate: boolean
  onInteract: () => void
  onSettle: () => void
}

export const OrbitRig = ({ target, distance, allowZoom, autoRotate, onInteract, onSettle }: OrbitRigProps) => (
  <OrbitControls
    makeDefault
    target={target}
    enablePan={false}
    enableZoom={allowZoom}
    minDistance={distance * orbitSettings.distanceRange[0]}
    maxDistance={distance * orbitSettings.distanceRange[1]}
    enableDamping
    dampingFactor={orbitSettings.dampingFactor}
    minPolarAngle={orbitSettings.minPolarAngle}
    maxPolarAngle={orbitSettings.maxPolarAngle}
    autoRotate={autoRotate}
    autoRotateSpeed={orbitSettings.autoRotateSpeed}
    onStart={onInteract}
    onEnd={onSettle}
  />
)
