import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { RepeatWrapping, SRGBColorSpace } from 'three'
import { labelAnisotropy, labelMaterial, tinSegments, tinSurfaceSkin } from './constant'

type TinLabelProps = {
  url: string | null
  accent: string
  offset: number
  radius: number
  height: number
  crimp: number
}

const bandFor = (height: number, crimp: number) => ({
  bandHeight: height - crimp * 4.2,
  centre: height / 2
})

const LabelSkin = ({ url, offset, radius, height, crimp }: Omit<TinLabelProps, 'accent'> & { url: string }) => {
  const texture = useTexture(url)
  const { bandHeight, centre } = bandFor(height, crimp)

  useMemo(() => {
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = labelAnisotropy
    texture.wrapS = RepeatWrapping
    texture.offset.x = offset
    texture.needsUpdate = true
  }, [texture, offset])

  return (
    <mesh position={[0, centre, 0]} castShadow>
      <cylinderGeometry
        args={[radius + tinSurfaceSkin, radius + tinSurfaceSkin, bandHeight, tinSegments, 1, true]}
      />
      <meshPhysicalMaterial {...labelMaterial} map={texture} />
    </mesh>
  )
}

export const TinLabel = ({ url, accent, offset, radius, height, crimp }: TinLabelProps) => {
  const { bandHeight, centre } = bandFor(height, crimp)

  if (!url) {
    return (
      <mesh position={[0, centre, 0]} castShadow>
        <cylinderGeometry
          args={[radius + tinSurfaceSkin, radius + tinSurfaceSkin, bandHeight, tinSegments, 1, true]}
        />
        <meshPhysicalMaterial {...labelMaterial} color={accent} />
      </mesh>
    )
  }

  return <LabelSkin url={url} offset={offset} radius={radius} height={height} crimp={crimp} />
}
