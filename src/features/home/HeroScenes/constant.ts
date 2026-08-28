export const viewportsPerScene = 1

export const turnsPerScene = 0.85

export const autoAdvanceMs = 6500

export const resumeDelayMs = 4000

export const transitionMs = 1500

export const sceneAnchor = 0.12

export const sceneCta = { en: 'View product', ar: 'شوف المنتج' }

export const activeSceneIndex = (progress: number, count: number) =>
  Math.min(Math.floor(progress * count), count - 1)

export const sceneProgress = (progress: number, count: number, index: number) =>
  Math.min(Math.max(progress * count - index, 0), 1)
