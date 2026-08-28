# Roxana Paints

Marketing site for Roxana for Paints and Chemical Industries. Arabic-first, bilingual (ar / en), with a real-time 3D paint bucket rendered inside a photographic room.

## Stack

| Layer | Choice |
|---|---|
| Build | Vite 7 |
| UI | React 19 + TypeScript (strict) |
| Styling | Tailwind v4 (`@tailwindcss/vite`, no config file) |
| Routing | react-router |
| 3D | three + @react-three/fiber + @react-three/drei |
| Icons | lucide-react |

No state library, no form library, no UI kit. `useState` and native forms are enough.

## Running it

```bash
npm install
npm run dev        # http://localhost:5174
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server on port 5174 |
| `npm run build` | Typecheck, then production build into `dist/` |
| `npm run typecheck` | Types only |

## Structure

One folder per component: `ComponentName.tsx`, `tokens.ts`, `constant.ts`, `index.ts`.

```text
src/
  app/          routing, language + theme state
  content/      all copy as JSON, typed at index.ts
  features/     home, products, about, contact
  viewer/       the 3D bucket, room, camera
  UI/           reusable components
  shared/       design tokens, types, utils, services
```

**Styling rule:** no `className` strings in `.tsx`. Every class lives in that component's `tokens.ts` as a props object and is spread into JSX:

```tsx
export const HeroTokens = { root: { className: 'relative h-svh' } }

<section {...HeroTokens.root} />
```

Variants get their own token keys (`chipIdle` / `chipActive`) rather than being concatenated conditionally — Tailwind resolves conflicting utilities by stylesheet order, not class order, so `text-muted text-stage` is a coin flip.

## The 3D viewer

The bucket is **generated in code**, not modelled. A paint pail is a surface of revolution, so a side profile is revolved with `latheGeometry` — see `viewer/PaintBucket/utils/latheProfile.ts`. One geometry serves every product; only dimensions and the band colour change.

The room is an equirectangular HDRI on an environment sphere. It is also the light source, which is what makes the plastic read as photographed rather than pasted. Dragging orbits the camera; the model idles with a slow auto-rotate.

Rooms live in `public/room/` (three 1k HDRIs, ~4.7 MB total, CC0 from Poly Haven).

### Tuning without touching code

| Knob | Where | Effect |
|---|---|---|
| `viewScale` | `content/products.json`, `content/company.json` (per scene) | Apparent bucket size. Higher = closer. |
| `room` | `content/products.json` | Which HDRI (`0`, `1`, `2`) that product sits in. |
| `bucketProfiles` | `viewer/constants/bucketProfiles.ts` | Physical mm per pack size. **Currently estimates** — replace with tape-measure numbers. |
| `autoAdvanceMs`, `transitionMs`, `turnsPerScene` | `features/home/HeroScenes/constant.ts` | Hero pacing. |

### Performance

- The whole viewer is a lazy chunk. It is never in the main bundle.
- The canvas mounts once and never unmounts, so scrolling never re-triggers the loading poster.
- `dpr` clamped to `[1, 1.75]`.
- No WebGL, or `prefers-reduced-motion` — the site falls back to a static poster and stays fully usable.

## Home page

One component, `HeroScenes`: a sticky full-viewport canvas over a tall scroll section. Scroll scrubs the bucket's rotation through a scene, then flips to the next — swapping room, bucket, copy and call to action together. It also auto-advances every 6.5s and loops, pausing while you interact.

## Product card posters

Cards show pre-rendered screenshots (`public/posters/*.webp`, ~25 KB each), not live canvases — three WebGL contexts on one grid page is not worth it.

They are captured from the running app by a **dev-only** Vite middleware in `vite.config.ts`. With `npm run dev` open on a product page, run in the console:

```js
const src = document.querySelector('canvas')
const out = document.createElement('canvas')
out.width = 960; out.height = 720
const sw = src.width, sh = src.height, side = Math.min(sw, sh * 4 / 3)
out.getContext('2d').drawImage(src, (sw - side) / 2, 0, side, side * 3 / 4, 0, 0, 960, 720)
await fetch('/__capture/<slug>', { method: 'POST', body: out.toDataURL('image/webp', 0.86) })
```

These are build artifacts. Regenerate them whenever bucket dimensions, colours or labels change.

## Content

All copy is JSON in `src/content/`, typed at `src/content/index.ts`. Every string is `{ en, ar }`.

**Everything currently reads "Placeholder".** Product specs, company text and contact details are awaiting the client. Empty values render as nothing rather than breaking layout.

### Still needed from the client

1. **Flat label artwork** — the unwrapped rectangle as it goes to the printer, not a mockup of the bucket. Five `.ai` files have been supplied and are not yet converted or wired in; the buckets currently show a plain colour band.
2. **Bucket measurements** — height, top diameter, bottom diameter per pack size.
3. Company text, contact details, factory photos.

## Deployment

GitHub Actions builds and publishes to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).

**One-time setup:** repo **Settings → Pages → Source → GitHub Actions**. If it is set to "Deploy from a branch", Pages serves the raw repo and the site 404s, because `index.html` points at `/src/main.tsx`, which only exists during development.

The workflow passes `VITE_BASE=/<repo-name>/` so assets resolve under the project-page subpath. Runtime asset URLs go through `shared/utils/assetPath.ts` — Vite rewrites HTML and CSS URLs automatically, but not plain strings in JavaScript. The build also emits `404.html` (a copy of `index.html`) so client-side routes survive a hard refresh, and `.nojekyll` so Jekyll leaves the output alone.
