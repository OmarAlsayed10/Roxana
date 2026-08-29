import { useCallback, useEffect, useRef, useState } from 'react'
import { autoAdvanceMs, resumeDelayMs } from '../constant'

export const useSceneAutoplay = (count: number) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const lastInteraction = useRef(0)

  const selectScene = useCallback((index: number) => {
    lastInteraction.current = Date.now()
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    const mark = () => {
      lastInteraction.current = Date.now()
    }
    addEventListener('pointerdown', mark)
    addEventListener('pointermove', mark, { passive: true })
    addEventListener('keydown', mark)
    addEventListener('wheel', mark, { passive: true })
    return () => {
      removeEventListener('pointerdown', mark)
      removeEventListener('pointermove', mark)
      removeEventListener('keydown', mark)
      removeEventListener('wheel', mark)
    }
  }, [])

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ticker = window.setInterval(() => {
      if (document.hidden) return
      if (Date.now() - lastInteraction.current < resumeDelayMs) return
      setActiveIndex((current) => (current + 1) % count)
    }, autoAdvanceMs)
    return () => window.clearInterval(ticker)
  }, [count])

  return { activeIndex, selectScene }
}
