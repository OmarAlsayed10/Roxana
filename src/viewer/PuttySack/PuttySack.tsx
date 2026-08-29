import { RoundedBox } from '@react-three/drei'
import { millimetre, sackProfile } from '../constants'
import {
  foldDepthFactor,
  foldHeightFactor,
  panelHeightFactor,
  panelInset,
  panelWidthFactor,
  sackRadiusFactor,
  wovenMaterial
} from './constant'
import { SackPanel } from './SackPanel'

type PuttySackProps = {
  accent: string
  label: string | null
}

export const PuttySack = ({ accent, label }: PuttySackProps) => {
  const width = sackProfile.width * millimetre
  const height = sackProfile.height * millimetre
  const depth = sackProfile.depth * millimetre
  const radius = depth * sackRadiusFactor
  const foldHeight = height * foldHeightFactor

  return (
    <group position={[0, height / 2, 0]}>
      <RoundedBox args={[width, height, depth]} radius={radius} smoothness={5} castShadow receiveShadow>
        <meshStandardMaterial {...wovenMaterial} />
      </RoundedBox>

      <mesh position={[0, height / 2 - foldHeight / 2, 0]} castShadow>
        <boxGeometry args={[width * 1.005, foldHeight, depth * foldDepthFactor]} />
        <meshStandardMaterial {...wovenMaterial} />
      </mesh>

      {label ? (
        <SackPanel
          url={label}
          width={width * panelWidthFactor}
          maxHeight={height * panelHeightFactor}
          depth={depth / 2 + panelInset}
        />
      ) : (
        <mesh position={[0, 0, depth / 2 + panelInset]}>
          <planeGeometry args={[width * panelWidthFactor, height * panelHeightFactor]} />
          <meshStandardMaterial color={accent} roughness={0.7} />
        </mesh>
      )}
    </group>
  )
}
