import { OrbitControls } from '@react-three/drei'
import { orbitSettings } from './constant'

type OrbitRigProps = {
  target: [number, number, number]
  autoRotate: boolean
  onInteract: () => void
}

export const OrbitRig = ({ target, autoRotate, onInteract }: OrbitRigProps) => (
  <OrbitControls
    makeDefault
    target={target}
    enablePan={false}
    enableZoom={false}
    enableDamping
    dampingFactor={orbitSettings.dampingFactor}
    minPolarAngle={orbitSettings.minPolarAngle}
    maxPolarAngle={orbitSettings.maxPolarAngle}
    autoRotate={autoRotate}
    autoRotateSpeed={orbitSettings.autoRotateSpeed}
    onStart={onInteract}
  />
)
