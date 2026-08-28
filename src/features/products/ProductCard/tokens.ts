export const ProductCardTokens = {
  root: { className: 'group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-transform duration-300 hover:-translate-y-1.5' },
  visual: { className: 'poster-room relative aspect-[4/3] w-full overflow-hidden' },
  image: { className: 'size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]' },
  mark: { className: 'absolute inset-0 m-auto h-[74%] w-auto' },
  body: { className: 'flex flex-1 flex-col p-5' },
  meta: { className: 'mb-3 flex flex-wrap items-center gap-2' },
  name: { className: 'text-lg font-bold' },
  finish: { className: 'mt-1 text-sm text-muted' },
  sizes: { className: 'mt-auto pt-5 text-xs font-bold tracking-wide text-muted' }
}
