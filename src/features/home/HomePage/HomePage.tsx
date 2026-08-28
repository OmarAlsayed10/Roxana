import type { SiteControls } from '../../../shared/types'
import { HeroScenes } from '../HeroScenes'
import { HomePageTokens } from './tokens'

export const HomePage = ({ language }: SiteControls) => (
  <div {...HomePageTokens.root}>
    <HeroScenes language={language} />
  </div>
)
