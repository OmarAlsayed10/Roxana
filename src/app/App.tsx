import { SiteHeader } from '../UI'
import { useSitePreferences } from './hooks'
import { SiteRoutes } from './SiteRoutes'
import { AppTokens } from './tokens'

export const App = () => {
  const siteControls = useSitePreferences()

  return (
    <div {...AppTokens.root}>
      <SiteHeader {...siteControls} />
      <main {...AppTokens.main}>
        <SiteRoutes {...siteControls} />
      </main>
    </div>
  )
}
