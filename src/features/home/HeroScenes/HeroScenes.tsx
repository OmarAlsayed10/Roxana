import type { CSSProperties } from 'react'
import { productPath } from '../../../app'
import { products, type Language } from '../../../content'
import { assetPath, familyHex, familyLabel, posterPath } from '../../../shared/utils'
import { Button, DisplayHeading } from '../../../UI'
import { BucketViewer, roomFiles } from '../../../viewer'
import { activeSceneIndex, sceneCta, sceneProgress, turnsPerScene, viewportsPerScene } from './constant'
import { useSceneAutoplay, useScrollProgress } from './hooks'
import { HeroScenesTokens } from './tokens'

const sceneNumber = (index: number) => String(index + 1).padStart(2, '0')

export const HeroScenes = ({ language }: { language: Language }) => {
  const { sectionRef, progress } = useScrollProgress()
  const activeIndex = activeSceneIndex(progress, products.length)
  useSceneAutoplay({ sectionRef, count: products.length, activeIndex })

  const active = products[activeIndex]
  const sectionStyle = { height: `${products.length * viewportsPerScene * 100}svh` } as CSSProperties

  return (
    <section ref={sectionRef} {...HeroScenesTokens.root} style={sectionStyle}>
      <div {...HeroScenesTokens.sticky}>
        <div {...HeroScenesTokens.viewer}>
          <BucketViewer
            size={active.sizes[0]}
            accent={familyHex[active.family]}
            label={active.label ? assetPath(active.label) : null}
            labelOffset={active.labelOffset}
            poster={posterPath(active.slug)}
            posterAlt={active.name[language]}
            language={language}
            viewScale={active.viewScale}
            spin={sceneProgress(progress, products.length, activeIndex) * Math.PI * 2 * turnsPerScene}
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
              className={`${HeroScenesTokens.caption.className} ${index === activeIndex ? HeroScenesTokens.captionActive.className : HeroScenesTokens.captionIdle.className}`}
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
        <div {...HeroScenesTokens.rail}>
          {products.map((product, index) => (
            <span
              key={product.slug}
              className={`${HeroScenesTokens.railDot.className} ${index === activeIndex ? HeroScenesTokens.railDotActive.className : HeroScenesTokens.railDotIdle.className}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
