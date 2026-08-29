import { useEffect } from 'react'
import { productPath } from '../../../app'
import { products, type Language } from '../../../content'
import { assetPath, familyHex, familyLabel, posterPath } from '../../../shared/utils'
import { Button, DisplayHeading } from '../../../UI'
import { BucketViewer, roomFiles } from '../../../viewer'
import { sceneCta, sceneJumpLabel } from './constant'
import { useProductTransition, useSceneAutoplay } from './hooks'
import { HeroScenesTokens } from './tokens'

const sceneNumber = (index: number) => String(index + 1).padStart(2, '0')

const productLabels = products.flatMap((product) => (product.label ? [assetPath(product.label)] : []))

export const HeroScenes = ({ language }: { language: Language }) => {
  const { activeIndex, selectScene } = useSceneAutoplay(products.length)
  const { displayedIndex, spinSpeed } = useProductTransition(activeIndex)
  const active = products[displayedIndex]

  useEffect(() => {
    void import('../../../viewer/RoomStage').then(({ preloadRoomStageAssets }) =>
      preloadRoomStageAssets(productLabels, roomFiles)
    )
  }, [])

  return (
    <section {...HeroScenesTokens.root}>
      <div {...HeroScenesTokens.sticky}>
        <div {...HeroScenesTokens.viewer}>
          <BucketViewer
            form={active.form}
            profile={active.profile}
            accent={familyHex[active.family]}
            label={active.label ? assetPath(active.label) : null}
            labelOffset={active.labelOffset}
            poster={posterPath(active.slug)}
            posterAlt={active.name[language]}
            language={language}
            viewScale={active.viewScale}
            allowZoom
            spinSpeed={spinSpeed}
            showHint={false}
            rooms={roomFiles}
            activeRoom={active.room}
          />
        </div>
        <div {...HeroScenesTokens.scrim} />
        <div {...HeroScenesTokens.captions}>
          {products.map((product, index) => (
            <article
              key={product.slug}
              className={`${HeroScenesTokens.caption.className} ${index === displayedIndex ? HeroScenesTokens.captionActive.className : HeroScenesTokens.captionIdle.className}`}
            >
              <p {...HeroScenesTokens.eyebrow}>
                {sceneNumber(index)} — {familyLabel[product.family][language]}
              </p>
              <DisplayHeading level={2} className={HeroScenesTokens.title.className}>
                {product.name[language]}
              </DisplayHeading>
              <p {...HeroScenesTokens.body}>{product.description[language]}</p>
              <div {...HeroScenesTokens.action}>
                <Button to={productPath(product.slug)}>{sceneCta[language]}</Button>
              </div>
            </article>
          ))}
        </div>
        <nav {...HeroScenesTokens.rail} aria-label={sceneJumpLabel[language]}>
          {products.map((product, index) => (
            <button
              key={product.slug}
              type="button"
              aria-label={`${sceneJumpLabel[language]}: ${product.name[language]}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => selectScene(index)}
              className={`${HeroScenesTokens.railItem.className} ${index === activeIndex ? HeroScenesTokens.railItemActive.className : HeroScenesTokens.railItemIdle.className}`}
            >
              <span {...HeroScenesTokens.railNumber}>{sceneNumber(index)}</span>
              <img src={posterPath(product.slug)} alt="" decoding="async" {...HeroScenesTokens.railImage} />
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}
