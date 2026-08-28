import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { RepeatWrapping, SRGBColorSpace } from 'three'
import { bandMaterial, labelAnisotropy, labelBottom, labelCoverage, latheSegments, surfaceSkin } from './constant'

type LabelBandProps = {
  url: string
  offset: number
  height: number
  topRadius: number
  bottomRadius: number
}

export const LabelBand = ({ url, offset, height, topRadius, bottomRadius }: LabelBandProps) => {
  const texture = useTexture(url)

  const band = useMemo(() => {
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = labelAnisotropy
    texture.wrapS = RepeatWrapping
    texture.offset.x = offset
    texture.needsUpdate = true

    const bottom = height * labelBottom
    const wrapHeight = height * labelCoverage
    const radiusAt = (y: number) => bottomRadius + (topRadius - bottomRadius) * (y / height)

    return {
      centre: bottom + wrapHeight / 2,
      wrapHeight,
      radiusTop: radiusAt(bottom + wrapHeight) + surfaceSkin,
      radiusBottom: radiusAt(bottom) + surfaceSkin
    }
  }, [texture, offset, height, topRadius, bottomRadius])

  return (
    <mesh position={[0, band.centre, 0]} castShadow>
      <cylinderGeometry args={[band.radiusTop, band.radiusBottom, band.wrapHeight, latheSegments, 1, true]} />
      <meshPhysicalMaterial {...bandMaterial} map={texture} />
    </mesh>
  )
}
