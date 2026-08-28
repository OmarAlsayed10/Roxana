import { useEffect, useRef, useState } from 'react'

const clamp = (value: number) => Math.min(Math.max(value, 0), 1)

export const useScrollProgress = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return
    let frame = 0

    const measure = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      setProgress(travel <= 0 ? 0 : clamp(-rect.top / travel))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    const observer = new ResizeObserver(schedule)
    observer.observe(element)
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      removeEventListener('scroll', schedule)
      removeEventListener('resize', schedule)
    }
  }, [])

  return { sectionRef, progress }
}
