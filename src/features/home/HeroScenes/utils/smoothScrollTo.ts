const easeInOutCubic = (progress: number) =>
  progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2

export const smoothScrollTo = (target: number, duration: number) => {
  const start = window.scrollY
  const distance = target - start
  if (Math.abs(distance) < 1) return () => {}

  const startedAt = performance.now()
  let frame = requestAnimationFrame(function step(now) {
    const elapsed = Math.min((now - startedAt) / duration, 1)
    window.scrollTo(0, start + distance * easeInOutCubic(elapsed))
    if (elapsed < 1) frame = requestAnimationFrame(step)
  })

  return () => cancelAnimationFrame(frame)
}
