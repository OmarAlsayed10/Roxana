import { bandMaterial, latheSegments, surfaceSkin } from './constant'

type ColourBandProps = {
  accent: string
  height: number
  topRadius: number
  bottomRadius: number
}

export const ColourBand = ({ accent, height, topRadius, bottomRadius }: ColourBandProps) => {
  const radiusAt = (y: number) => bottomRadius + (topRadius - bottomRadius) * (y / height)
  const bottom = height * 0.15
  const top = height * 0.78

  return (
    <mesh position={[0, (bottom + top) / 2, 0]} castShadow>
      <cylinderGeometry
        args={[radiusAt(top) + surfaceSkin, radiusAt(bottom) + surfaceSkin, top - bottom, latheSegments, 1, true]}
      />
      <meshPhysicalMaterial {...bandMaterial} color={accent} />
    </mesh>
  )
}
