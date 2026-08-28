import { siteRoutes } from '../../../app/SiteRoutes/constant'
import type { BucketSize } from '../../../content'
import { roomFiles } from '../../../viewer/RoomStage/constant'

export const sceneSetup: { productSlug: string; size: BucketSize; route: string }[] = [
  { productSlug: 'lg-8000', size: '9kg', route: siteRoutes.products },
  { productSlug: 'gold-600', size: '20kg', route: siteRoutes.about },
  { productSlug: 'top-plastic-turkish', size: '3kg', route: siteRoutes.contact }
]

export const sceneRooms = roomFiles

export const viewportsPerScene = 1.25

export const turnsPerScene = 0.85

export const autoAdvanceMs = 6500

export const resumeDelayMs = 9000

export const transitionMs = 1500

export const sceneAnchor = 0.12

export const activeSceneIndex = (progress: number, count: number) =>
  Math.min(Math.floor(progress * count), count - 1)

export const sceneProgress = (progress: number, count: number, index: number) =>
  Math.min(Math.max(progress * count - index, 0), 1)
