import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { navigationLinks, siteRoutes } from '../../app/SiteRoutes'
import type { SiteControls } from '../../shared/types'
import { LanguageToggle } from '../LanguageToggle'
import { ThemeToggle } from '../ThemeToggle'
import { brandMark, brandSub } from './constant'
import { SiteHeaderTokens } from './tokens'

export const SiteHeader = ({ language, setLanguage, theme, setTheme }: SiteControls) => {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => setIsOpen(false), [pathname])

  const linkClass = (to: string, base: string) =>
    `${base} ${pathname.startsWith(to) ? SiteHeaderTokens.linkActive.className : SiteHeaderTokens.linkIdle.className}`

  return (
    <header {...SiteHeaderTokens.root}>
      <div {...SiteHeaderTokens.inner}>
        <Link to={siteRoutes.home} {...SiteHeaderTokens.brand}>
          <span {...SiteHeaderTokens.brandName}>{brandMark[language]}</span>
          <span {...SiteHeaderTokens.brandSub}>{brandSub[language]}</span>
        </Link>
        <nav {...SiteHeaderTokens.nav}>
          {navigationLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to, SiteHeaderTokens.link.className)}>
              {link.label[language]}
            </Link>
          ))}
        </nav>
        <div {...SiteHeaderTokens.controls}>
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            type="button"
            {...SiteHeaderTokens.menuButton}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav {...SiteHeaderTokens.panel}>
          {navigationLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to, SiteHeaderTokens.panelLink.className)}>
              {link.label[language]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
