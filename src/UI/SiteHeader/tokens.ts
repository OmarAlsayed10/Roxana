export const SiteHeaderTokens = {
  root: { className: 'sticky top-0 z-50 border-b border-line bg-[var(--header)] backdrop-blur-md' },
  inner: { className: 'mx-auto flex h-16 w-full max-w-[78rem] items-center gap-4 px-[clamp(1.25rem,5vw,4rem)]' },
  brand: { className: 'flex items-baseline gap-2 me-auto' },
  brandName: { className: 'text-lg font-bold tracking-tight' },
  brandSub: { className: 'text-xs font-bold uppercase tracking-[.2em] text-accent' },
  nav: { className: 'hidden items-center gap-7 text-sm font-bold sm:flex' },
  link: { className: 'transition-colors duration-200' },
  linkIdle: { className: 'text-muted hover:text-ink' },
  linkActive: { className: 'text-ink' },
  controls: { className: 'flex items-center gap-2' },
  menuButton: { className: 'grid size-8 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent sm:hidden' },
  panel: { className: 'grid gap-1 border-t border-line bg-[var(--header)] px-[clamp(1.25rem,5vw,4rem)] py-3 backdrop-blur-md sm:hidden' },
  panelLink: { className: 'rounded-xl px-3 py-3 text-base font-bold transition-colors duration-200' }
}
