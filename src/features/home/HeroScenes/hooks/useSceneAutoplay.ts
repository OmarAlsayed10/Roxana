import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { autoAdvanceMs, resumeDelayMs, sceneAnchor, transitionMs } from '../constant'
import { smoothScrollTo } from '../utils'

type SceneAutoplayOptions = {
  sectionRef: RefObject<HTMLElement | null>
  count: number
  activeIndex: number
}

export const useSceneAutoplay = ({ sectionRef, count, activeIndex }: SceneAutoplayOptions) => {
  const lastInteraction = useRef(0)
  const cancelScroll = useRef<() => void>(() => {})
  const indexRef = useRef(activeIndex)
  indexRef.current = activeIndex

  useEffect(() => {
    const mark = () => {
      lastInteraction.current = Date.now()
      cancelScroll.current()
    }
    addEventListener('wheel', mark, { passive: true })
    addEventListener('touchstart', mark, { passive: true })
    addEventListener('keydown', mark)
    addEventListener('pointerdown', mark)
    addEventListener('pointermove', mark, { passive: true })
    return () => {
      removeEventListener('wheel', mark)
      removeEventListener('touchstart', mark)
      removeEventListener('keydown', mark)
      removeEventListener('pointerdown', mark)
      removeEventListener('pointermove', mark)
    }
  }, [])

  useEffect(() => {
    const element = sectionRef.current
    if (!element || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const advance = () => {
      if (document.hidden) return
      if (Date.now() - lastInteraction.current < resumeDelayMs) return
      const travel = element.offsetHeight - window.innerHeight
      if (travel <= 0) return
      const next = (indexRef.current + 1) % count
      cancelScroll.current = smoothScrollTo(
        element.offsetTop + travel * ((next + sceneAnchor) / count),
        transitionMs
      )
    }

    const ticker = window.setInterval(advance, autoAdvanceMs)
    return () => {
      window.clearInterval(ticker)
      cancelScroll.current()
    }
  }, [sectionRef, count])
}
