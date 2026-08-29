import { useEffect, useRef, useState } from 'react'
import { idleSpin, swapAtMs, transitionMs, transitionSpin } from '../constant'

export const useProductTransition = (activeIndex: number) => {
  const [displayedIndex, setDisplayedIndex] = useState(activeIndex)
  const [isSwitching, setIsSwitching] = useState(false)
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    setIsSwitching(true)
    const swap = window.setTimeout(() => setDisplayedIndex(activeIndex), swapAtMs)
    const settle = window.setTimeout(() => setIsSwitching(false), transitionMs)

    return () => {
      window.clearTimeout(swap)
      window.clearTimeout(settle)
    }
  }, [activeIndex])

  return { displayedIndex, spinSpeed: isSwitching ? transitionSpin : idleSpin }
}
