import { useEffect, useState } from 'react'
import { products } from '../../../content'
import { assetPath, familyHex } from '../../../shared/utils'
import { BucketViewer, roomFiles } from '../../../viewer'
import { captureDelayMs, studioCopy } from './constant'
import { PosterStudioTokens } from './tokens'
import { capturePoster } from './utils'

export const PosterStudio = () => {
  const [index, setIndex] = useState(0)
  const [saved, setSaved] = useState<string[]>([])
  const [failed, setFailed] = useState<string[]>([])
  const product = products[index]

  useEffect(() => {
    if (!product) return
    let cancelled = false

    const timer = window.setTimeout(async () => {
      const ok = await capturePoster(product.slug)
      if (cancelled) return
      if (ok) setSaved((list) => [...list, product.slug])
      else setFailed((list) => [...list, product.slug])
      setIndex((current) => current + 1)
    }, captureDelayMs)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [product])

  const statusClass = (slug: string) => {
    if (saved.includes(slug)) return PosterStudioTokens.saved.className
    if (failed.includes(slug)) return PosterStudioTokens.failed.className
    return PosterStudioTokens.pending.className
  }

  return (
    <div {...PosterStudioTokens.root}>
      <h1 {...PosterStudioTokens.title}>{studioCopy.title}</h1>
      <p {...PosterStudioTokens.hint}>{studioCopy.hint}</p>
      <div {...PosterStudioTokens.stage}>
        {product && (
          <BucketViewer
            key={product.slug}
            form={product.form}
            profile={product.profile}
            accent={familyHex[product.family]}
            label={product.label ? assetPath(product.label) : null}
            labelOffset={product.labelOffset}
            language="en"
            viewScale={product.viewScale}
            autoRotate={false}
            showHint={false}
            rooms={roomFiles}
            activeRoom={product.room}
          />
        )}
      </div>
      <p {...PosterStudioTokens.status}>
        {product ? `${index + 1} / ${products.length} — ${product.slug}` : studioCopy.done}
      </p>
      <div {...PosterStudioTokens.row}>
        {products.map((item) => (
          <span key={item.slug} className={statusClass(item.slug)}>
            {item.slug}
          </span>
        ))}
      </div>
    </div>
  )
}
