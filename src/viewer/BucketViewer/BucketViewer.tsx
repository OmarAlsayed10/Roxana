import { lazy, Suspense } from 'react'
import type { BucketSize, Language } from '../../content'
import { defaultRooms } from '../RoomStage/constant'
import { ViewerPoster } from '../ViewerPoster'
import { viewerHint } from './constant'
import { useViewerReady } from './hooks'
import { BucketViewerTokens } from './tokens'

const RoomStage = lazy(() => import('../RoomStage').then((module) => ({ default: module.RoomStage })))

type BucketViewerProps = {
  size: BucketSize
  accent: string
  language: Language
  viewScale?: number
  autoRotate?: boolean
  spin?: number
  showHint?: boolean
  rooms?: string[]
  activeRoom?: number
}

export const BucketViewer = ({
  size,
  accent,
  language,
  viewScale = 1,
  autoRotate = true,
  spin = 0,
  showHint = true,
  rooms = defaultRooms,
  activeRoom = 0
}: BucketViewerProps) => {
  const { rootRef, shouldRender, needsTap, supports3d, activate } = useViewerReady()
  const showTapHint = supports3d && needsTap && !shouldRender

  return (
    <div ref={rootRef} {...BucketViewerTokens.root}>
      <ViewerPoster
        accent={accent}
        hint={showTapHint ? viewerHint.tap[language] : undefined}
        onActivate={showTapHint ? activate : undefined}
      />
      {shouldRender && (
        <Suspense fallback={null}>
          <div {...BucketViewerTokens.stage}>
            <RoomStage
              size={size}
              accent={accent}
              viewScale={viewScale}
              autoRotate={autoRotate}
              spin={spin}
              rooms={rooms}
              activeRoom={activeRoom}
            />
          </div>
          {showHint && <p {...BucketViewerTokens.hint}>{viewerHint.drag[language]}</p>}
        </Suspense>
      )}
    </div>
  )
}
