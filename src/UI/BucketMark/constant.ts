export const markGeometry = {
  viewBox: '0 -18 200 248',
  topY: 54,
  bottomY: 198,
  topHalfWidth: 78,
  bottomHalfWidth: 64,
  lidRadiusY: 15,
  bandTopY: 100,
  bandBottomY: 172
}

export const halfWidthAt = (y: number) => {
  const { topY, bottomY, topHalfWidth, bottomHalfWidth } = markGeometry
  return topHalfWidth + (bottomHalfWidth - topHalfWidth) * ((y - topY) / (bottomY - topY))
}

export const bodyPath = (() => {
  const { topY, bottomY, topHalfWidth, bottomHalfWidth, lidRadiusY } = markGeometry
  return [
    `M${100 - topHalfWidth},${topY}`,
    `L${100 - bottomHalfWidth},${bottomY}`,
    `Q100,${bottomY + 17} ${100 + bottomHalfWidth},${bottomY}`,
    `L${100 + topHalfWidth},${topY}`,
    `Q100,${topY + lidRadiusY * 1.9} ${100 - topHalfWidth},${topY}`,
    'Z'
  ].join(' ')
})()

export const bandPath = (() => {
  const { bandTopY, bandBottomY } = markGeometry
  const top = halfWidthAt(bandTopY)
  const bottom = halfWidthAt(bandBottomY)
  return [
    `M${100 - top},${bandTopY}`,
    `Q100,${bandTopY + 16} ${100 + top},${bandTopY}`,
    `L${100 + bottom},${bandBottomY}`,
    `Q100,${bandBottomY + 14} ${100 - bottom},${bandBottomY}`,
    'Z'
  ].join(' ')
})()

export const handlePath = (() => {
  const { topY, topHalfWidth } = markGeometry
  return `M${100 - topHalfWidth + 4},${topY - 4} Q100,${topY - 64} ${100 + topHalfWidth - 4},${topY - 4}`
})()

export const handleColour = '#4c4b4e'
