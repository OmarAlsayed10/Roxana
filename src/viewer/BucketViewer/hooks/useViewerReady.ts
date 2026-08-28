import { useEffect, useRef, useState } from 'react'

const probeCapabilities = () => {
  let supportsWebgl = false
  try {
    const probe = document.createElement('canvas')
    const context = probe.getContext('webgl2')
    supportsWebgl = Boolean(context)
    context?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    supportsWebgl = false
  }

  return supportsWebgl && !matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const useViewerReady = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [supports3d] = useState(probeCapabilities)
  const [hasEnteredView, setHasEnteredView] = useState(false)

  useEffect(() => {
    const element = rootRef.current
    if (!element || hasEnteredView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHasEnteredView(true)
        observer.disconnect()
      },
      { rootMargin: '400px' }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [hasEnteredView])

  return { rootRef, shouldRender: supports3d && hasEnteredView }
}
