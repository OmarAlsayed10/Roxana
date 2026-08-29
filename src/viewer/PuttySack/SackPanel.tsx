import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'
import { panelMaterial } from './constant'

type SackPanelProps = {
  url: string
  width: number
  maxHeight: number
  depth: number
}

export const SackPanel = ({ url, width, maxHeight, depth }: SackPanelProps) => {
  const texture = useTexture(url)

  const size = useMemo(() => {
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = 8
    texture.needsUpdate = true

    const image = texture.image as { width: number; height: number }
    const aspect = image.width / image.height
    const height = Math.min(width / aspect, maxHeight)
    return { width: height * aspect, height }
  }, [texture, width, maxHeight])

  return (
    <>
      {[1, -1].map((side) => (
        <mesh key={side} position={[0, 0, side * depth]} rotation={[0, side > 0 ? 0 : Math.PI, 0]}>
          <planeGeometry args={[size.width, size.height]} />
          <meshStandardMaterial {...panelMaterial} map={texture} />
        </mesh>
      ))}
    </>
  )
}
