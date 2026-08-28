import type { CSSProperties } from 'react'
import { company, productBySlug, type Language } from '../../../content'
import { familyHex } from '../../../shared/utils'
import { Button, DisplayHeading } from '../../../UI'
import { BucketViewer } from '../../../viewer'
import { activeSceneIndex, sceneProgress, sceneRooms, sceneSetup, turnsPerScene, viewportsPerScene } from './constant'
import { useSceneAutoplay, useScrollProgress } from './hooks'
import { HeroScenesTokens } from './tokens'

export const HeroScenes = ({ language }: { language: Language }) => {
  const { sectionRef, progress } = useScrollProgress()
  const scenes = company.scenes
  const activeIndex = activeSceneIndex(progress, scenes.length)
  useSceneAutoplay({ sectionRef, count: scenes.length, activeIndex })
  const setup = sceneSetup[activeIndex]
  const product = productBySlug(setup.productSlug)
  const accent = product ? familyHex[product.family] : familyHex.lg
  const sectionStyle = { height: `${scenes.length * viewportsPerScene * 100}svh` } as CSSProperties

  return (
    <section ref={sectionRef} {...HeroScenesTokens.root} style={sectionStyle}>
      <div {...HeroScenesTokens.sticky}>
        <div {...HeroScenesTokens.viewer}>
          <BucketViewer
            size={setup.size}
            accent={accent}
            language={language}
            viewScale={scenes[activeIndex].viewScale}
            spin={sceneProgress(progress, scenes.length, activeIndex) * Math.PI * 2 * turnsPerScene}
            showHint={false}
            rooms={sceneRooms}
            activeRoom={activeIndex}
          />
        </div>
        <div {...HeroScenesTokens.scrim} />
        <div {...HeroScenesTokens.captions}>
          {scenes.map((scene, index) => (
            <article
              key={scene.key}
              className={`${HeroScenesTokens.caption.className} ${index === activeIndex ? HeroScenesTokens.captionActive.className : HeroScenesTokens.captionIdle.className}`}
            >
              <p {...HeroScenesTokens.eyebrow}>{scene.eyebrow[language]}</p>
              <DisplayHeading level={2} className={HeroScenesTokens.title.className}>
                {scene.title[language]}
              </DisplayHeading>
              <p {...HeroScenesTokens.body}>{scene.body[language]}</p>
              <div {...HeroScenesTokens.action}>
                <Button to={sceneSetup[index].route}>{scene.cta[language]}</Button>
              </div>
            </article>
          ))}
        </div>
        <div {...HeroScenesTokens.rail}>
          {scenes.map((scene, index) => (
            <span
              key={scene.key}
              className={`${HeroScenesTokens.railDot.className} ${index === activeIndex ? HeroScenesTokens.railDotActive.className : HeroScenesTokens.railDotIdle.className}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
