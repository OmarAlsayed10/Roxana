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

  return {
    supports3d: supportsWebgl && !matchMedia('(prefers-reduced-motion: reduce)').matches,
    needsTap: matchMedia('(pointer: coarse)').matches
  }
}

export const useViewerReady = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [{ supports3d, needsTap }] = useState(probeCapabilities)
  const [hasEnteredView, setHasEnteredView] = useState(false)
  const [isActivated, setIsActivated] = useState(false)

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

  const shouldRender = supports3d && hasEnteredView && (!needsTap || isActivated)

  return { rootRef, shouldRender, needsTap, supports3d, activate: () => setIsActivated(true) }
}
