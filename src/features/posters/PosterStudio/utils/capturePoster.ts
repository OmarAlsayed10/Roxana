import { capture, maxAttempts, retryDelayMs } from '../constant'

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

const isBlank = (context: CanvasRenderingContext2D, width: number, height: number) => {
  const { data } = context.getImageData(0, 0, width, height)
  const first = `${data[0]},${data[1]},${data[2]}`
  for (let index = 0; index < data.length; index += 4 * 997) {
    if (`${data[index]},${data[index + 1]},${data[index + 2]}` !== first) return false
  }
  return true
}

const drawFrame = () => {
  const source = document.querySelector('canvas')
  if (!source || source.width < 2) return null

  const target = document.createElement('canvas')
  target.width = capture.width
  target.height = capture.height
  const context = target.getContext('2d', { willReadFrequently: true })
  if (!context) return null

  const side = Math.min(source.width, (source.height * 4) / 3)
  context.drawImage(source, (source.width - side) / 2, 0, side, (side * 3) / 4, 0, 0, capture.width, capture.height)
  if (isBlank(context, capture.width, capture.height)) return null
  return target
}

export const capturePoster = async (slug: string) => {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const frame = drawFrame()
    if (frame) {
      const response = await fetch(`/__capture/${slug}`, {
        method: 'POST',
        body: frame.toDataURL('image/webp', 0.86)
      })
      if (response.ok) return true
    }
    await wait(retryDelayMs)
  }
  return false
}
