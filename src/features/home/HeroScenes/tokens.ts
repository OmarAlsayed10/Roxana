export const HeroScenesTokens = {
  root: { className: 'relative' },
  sticky: { className: 'sticky top-16 h-[calc(100svh-4rem)] overflow-hidden' },
  viewer: { className: 'absolute inset-0' },
  scrim: { className: 'pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,6,.5),rgba(8,7,6,.12)_34%,rgba(8,7,6,.8))]' },
  captions: { className: 'pointer-events-none absolute inset-0 px-[clamp(1.25rem,5vw,4.5rem)]' },
  caption: { className: 'pointer-events-none absolute bottom-[clamp(3rem,11vh,6.5rem)] max-w-[36ch] transition-all duration-500 ease-out' },
  captionIdle: { className: 'translate-y-6 opacity-0' },
  captionActive: { className: 'translate-y-0 opacity-100' },
  eyebrow: { className: 'mb-3 text-xs font-bold uppercase tracking-[.24em] text-white/65' },
  title: { className: 'text-white' },
  body: { className: 'mt-4 text-sm text-white/80 sm:text-base' },
  action: { className: 'pointer-events-auto mt-7' },
  rail: { className: 'pointer-events-none absolute inset-y-0 end-[clamp(1.25rem,5vw,4rem)] flex flex-col items-center justify-center gap-3' },
  railDot: { className: 'h-9 w-0.5 rounded-full transition-colors duration-300' },
  railDotIdle: { className: 'bg-white/25' },
  railDotActive: { className: 'bg-white' }
}
