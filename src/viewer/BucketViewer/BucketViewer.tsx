import { lazy, Suspense } from 'react'
import type { Language, ProductForm, ProfileKey } from '../../content'
import { defaultRooms } from '../RoomStage/constant'
import { ViewerPoster } from '../ViewerPoster'
import { viewerHint } from './constant'
import { useViewerReady } from './hooks'
import { BucketViewerTokens } from './tokens'

const RoomStage = lazy(() => import('../RoomStage').then((module) => ({ default: module.RoomStage })))

type BucketViewerProps = {
  form: ProductForm
  profile: ProfileKey
  accent: string
  label?: string | null
  labelOffset?: number
  poster?: string
  posterAlt?: string
  language: Language
  viewScale?: number
  autoRotate?: boolean
  allowZoom?: boolean
  spinSpeed?: number
  showHint?: boolean
  rooms?: string[]
  activeRoom?: number
}

export const BucketViewer = ({
  form,
  profile,
  accent,
  label = null,
  labelOffset = 0,
  poster,
  posterAlt,
  language,
  viewScale = 1,
  autoRotate = true,
  allowZoom = false,
  spinSpeed = 0,
  showHint = true,
  rooms = defaultRooms,
  activeRoom = 0
}: BucketViewerProps) => {
  const { rootRef, shouldRender } = useViewerReady()

  return (
    <div ref={rootRef} {...BucketViewerTokens.root}>
      <ViewerPoster accent={accent} image={poster} alt={posterAlt} />
      {shouldRender && (
        <Suspense fallback={null}>
          <div {...BucketViewerTokens.stage}>
            <RoomStage
              form={form}
              profile={profile}
              accent={accent}
              label={label}
              labelOffset={labelOffset}
              viewScale={viewScale}
              autoRotate={autoRotate}
              allowZoom={allowZoom}
              spinSpeed={spinSpeed}
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
