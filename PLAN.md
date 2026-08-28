# Roxana Paints — Build Plan

Status: approved, not implemented.

---

## 1. Decisions locked

| Question | Decision |
|---|---|
| 3D approach | Tier 2 — procedural bucket built in code, real label artwork wrapped on it |
| 3D artist / Blender | No. Not hiring. |
| Home page | 3D bucket in room as hero. Unique layout, not a copy of the portfolio cube. |
| Theme | Own palette, different from portfolio |
| Room | Any decent interior 360 photo, purely cosmetic |
| Color picker / wall preview | Dropped — brand has no color card |
| Company text / contact | Empty JSON now, filled later |
| Labels | Client provides PSD / AI / PDF |
| Bucket sizes | Standard pail dimensions, one editable file |

---

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Build | Vite | Same as portfolio, instant HMR |
| UI | React 19 + TypeScript | Same as portfolio |
| Styling | Tailwind v4 via `@tailwindcss/vite` | No config file, CSS-first `@theme` |
| Routing | `react-router` v8 | Same as portfolio |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei` | Declarative three.js in React |
| Icons | `lucide-react` | Same as portfolio |
| State | None | `useState` + context for language/theme is enough |
| Forms | None | Native form + `fetch` |
| Fonts | Alexandria (ar+latin), self-hosted `.ttf` | Already proven for Arabic in portfolio |

Deliberately NOT installing: state library, form library, animation library, UI kit, CSS-in-JS.

### Scripts

```
dev        vite
build      tsc --noEmit && vite build
typecheck  tsc --noEmit --pretty false
```

---

## 3. Folder structure

Rules:

- One folder per component, named after the component.
- Inside: `ComponentName.tsx`, `tokens.ts`, `constant.ts` (only if it has constants), `index.ts`.
- `hooks/`, `utils/`, `services/`, `constants/` folders only when needed.
- Reusable components live in `UI/`, same internal shape.
- Every folder exposes an `index.ts` barrel.

```text
src/
  app/
    App.tsx
    tokens.ts
    index.ts
    hooks/
      useSitePreferences.ts
      index.ts
    SiteRoutes/
      SiteRoutes.tsx
      constant.ts
      index.ts
  content/
    company.json
    products.json
    contact.json
    faq.json
    index.ts
  features/
    home/
      HomePage/
        HomePage.tsx
        tokens.ts
        constant.ts
        index.ts
      HeroStage/
        HeroStage.tsx
        tokens.ts
        constant.ts
        index.ts
      FamilyStrip/
        FamilyStrip.tsx
        tokens.ts
        constant.ts
        index.ts
      QualityBand/
        QualityBand.tsx
        tokens.ts
        index.ts
      UseCaseGrid/
        UseCaseGrid.tsx
        tokens.ts
        constant.ts
        index.ts
      ContactCallout/
        ContactCallout.tsx
        tokens.ts
        index.ts
      index.ts
    products/
      ProductsPage/
        ProductsPage.tsx
        tokens.ts
        constant.ts
        index.ts
      ProductCard/
        ProductCard.tsx
        tokens.ts
        index.ts
      FamilyFilter/
        FamilyFilter.tsx
        tokens.ts
        constant.ts
        index.ts
      ProductDetailPage/
        ProductDetailPage.tsx
        tokens.ts
        index.ts
      ProductSpecs/
        ProductSpecs.tsx
        tokens.ts
        constant.ts
        index.ts
      ProductGallery/
        ProductGallery.tsx
        tokens.ts
        index.ts
      index.ts
    about/
      AboutPage/
        AboutPage.tsx
        tokens.ts
        index.ts
      index.ts
    contact/
      ContactPage/
        ContactPage.tsx
        tokens.ts
        index.ts
      ContactForm/
        ContactForm.tsx
        tokens.ts
        constant.ts
        index.ts
      index.ts
    index.ts
  viewer/
    BucketViewer/
      BucketViewer.tsx
      tokens.ts
      constant.ts
      index.ts
      hooks/
        useViewerReady.ts
        index.ts
    RoomStage/
      RoomStage.tsx
      tokens.ts
      constant.ts
      index.ts
    PaintBucket/
      PaintBucket.tsx
      constant.ts
      index.ts
      utils/
        latheProfile.ts
        index.ts
    OrbitRig/
      OrbitRig.tsx
      constant.ts
      index.ts
    ViewerPoster/
      ViewerPoster.tsx
      tokens.ts
      index.ts
    constants/
      bucketProfiles.ts
      index.ts
    index.ts
  UI/
    DisplayHeading/
      DisplayHeading.tsx
      tokens.ts
      constant.ts
      index.ts
    PageShell/
      PageShell.tsx
      tokens.ts
      index.ts
    SiteHeader/
      SiteHeader.tsx
      tokens.ts
      constant.ts
      index.ts
    SiteFooter/
      SiteFooter.tsx
      tokens.ts
      index.ts
    LanguageToggle/
      LanguageToggle.tsx
      tokens.ts
      index.ts
    ThemeToggle/
      ThemeToggle.tsx
      tokens.ts
      index.ts
    Button/
      Button.tsx
      tokens.ts
      constant.ts
      index.ts
    Badge/
      Badge.tsx
      tokens.ts
      index.ts
    SectionLabel/
      SectionLabel.tsx
      tokens.ts
      index.ts
    index.ts
  shared/
    design/
      tokens/
        global.css
    types/
      site.ts
      index.ts
    utils/
      formatting.ts
      index.ts
    services/
      contact.ts
      index.ts
    index.ts
  main.tsx
public/
  fonts/
  labels/
  posters/
  room/
```

### tokens.ts contract

Every `tokens.ts` named-exports one object whose keys are element roles. Each value is a props object, spread directly into JSX.

```ts
export const HeroStageTokens = {
  root: { className: 'relative h-svh w-full overflow-hidden bg-[var(--stage)]' },
  canvasWrap: { className: 'absolute inset-0' },
  overlay: { className: 'pointer-events-none absolute inset-x-0 bottom-0 p-[clamp(1.5rem,5vw,5rem)]' },
  title: { className: 'text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[.95] tracking-tight' }
}
```

Used as:

```tsx
<section {...HeroStageTokens.root}>
  <div {...HeroStageTokens.canvasWrap}>...</div>
</section>
```

No inline `className` strings in `.tsx`. Dynamic classes compose from token strings — active/inactive variants get their own token keys.

`constant.ts` holds non-visual literals for that component only — option lists, route strings, angle tables, breakpoint numbers. Shared literals move up to a `constants/` folder.

---

## 4. Theme

Portfolio is dark space green/blue/orange. Roxana must not look like it.

Roxana's own brands clash by design — LG is red/gold/navy, TOP is teal/magenta, GOLD is maroon/silver, EXO is purple/magenta. So the site chrome stays neutral and lets the product carry the color.

```
Light (default)
--stage      #f4f1ec   warm bone       page background
--surface    #ffffff                   cards, panels
--ink        #16151a                   text
--muted      #6e6a63                   secondary text
--line       rgba(22,21,26,.12)        hairlines
--accent     #b5762f   bronze          links, focus, rules
--signal     #d2352b   roxana red      CTA only

Dark
--stage      #131211
--surface    #1b1a18
--ink        #f4f1ec
--muted      #9a948a
--line       rgba(244,241,236,.14)
--accent     #d99a52
--signal     #e8564c
```

Per-family accent, pulled from each product's own label, applied only inside that product's card and detail page:

```
lg     #c8102e
top    #7b2f8f
gold   #6d1230
exo    #8e44ad
putty  #1f4fa3
glue   #5c4a8a
```

Type scale through a single `DisplayHeading` component. Arabic gets looser line height at the `global.css` level, never per component.

Feel: gallery white, big type, thin bronze rules, generous whitespace. Product photography is the only color.

---

## 5. Home page

**The home page is the hero and nothing else.** One component, `HeroScenes` — a scroll-driven 3D stage, the closest analogue to the portfolio's draggable cube.

A tall section (`scenes × 1.25 × 100svh`) holds one sticky full-viewport canvas. Scroll progress drives everything:

| Scene | Room | Bucket | CTA |
|---|---|---|---|
| 01 — The range | loft hall | LG 8000, 9kg | `/products` |
| 02 — Made here | living room | Gold 600, 20kg | `/about` |
| 03 — On site | hotel room | Top Plastic, 3kg | `/contact` |

Per scene the background room, the bucket (size + band colour), the eyebrow/title/body, and the action button all change. Scroll also spins the bucket continuously (`scrollTurns`), and dragging still orbits the camera. A dot rail on the end side marks position.

All three HDRIs load together through one `useLoader(RGBELoader, rooms)` call, so switching scenes swaps a preloaded texture — no suspense gap, no flash between scenes.

Loading order:

1. `ViewerPoster` — the `BucketMark` SVG on a gradient room, painted immediately.
2. WebGL chunk plus the three HDRIs load.
3. Canvas fades in over the poster.

`useViewerReady` **latches**: once the canvas has mounted it never unmounts, so scrolling back and forth never re-triggers the poster. Only the very first paint of a cold visit shows it.

Mobile: poster stays, canvas loads on tap. Saves the 3D budget on phones.

Everything else — range, quality claims, use cases, contact callout — belongs on the inner pages, not here.

---

## 6. Routes

```
/                  HomePage
/products          ProductsPage
/products/:slug    ProductDetailPage
/about             AboutPage
/contact           ContactPage
*                  ProductsPage
```

`ScrollReset` on pathname change. View transitions via `::view-transition` in `global.css`.

---

## 7. The 3D viewer

### 7.1 Bucket shape — `PaintBucket`

A paint pail is a surface of revolution. Draw the side outline once, spin it 360°.

- `latheProfile.ts` turns four numbers — height, top diameter, bottom diameter, rim height — into an array of `Vector2` points: base fillet, straight taper, rim bead, lip.
- `<latheGeometry args={[points, 64]} />` revolves it. 64 segments is smooth at any zoom, cheap.
- Lid: second short lathe, sits on the rim, slightly wider.
- Handle: `TorusGeometry`, half arc, rotated to hang off the sides, plus two small cylinders as pivots.
- Material: `meshPhysicalMaterial`, `roughness .35`, `clearcoat .6`, `clearcoatRoughness .25`. That is the injection-moulded plastic look.

One geometry, every product. Only the label texture and the four numbers change.

### 7.2 Label wrap

- Thin open-ended cylinder, radius = bucket radius + 0.002, height = label height.
- The pail is tapered, so the label shell is a truncated cone with matching top and bottom radii — same geometry args, two different radii.
- `map` = the label image. `colorSpace = SRGBColorSpace`. `anisotropy = 8` so text stays sharp read at an angle.
- Texture offset rotates the seam to the back so it is never visible head-on.
- `useTexture` from drei, suspended, preloaded on product-card hover.

### 7.3 Bucket sizes — `bucketProfiles.ts`

Standard pail dimensions. **These are estimates** — replace with tape-measure numbers when available. One file, four numbers per size, no code changes.

```ts
export const bucketProfiles = {
  '1kg':  { height: 120, topDiameter: 130, bottomDiameter: 115, labelHeight: 88 },
  '3kg':  { height: 165, topDiameter: 180, bottomDiameter: 160, labelHeight: 124 },
  '9kg':  { height: 245, topDiameter: 265, bottomDiameter: 235, labelHeight: 186 },
  '20kg': { height: 310, topDiameter: 310, bottomDiameter: 280, labelHeight: 236 }
}
```

Millimetres, divided by 1000 at scene scale so 1 unit = 1 metre. Keeps lighting and shadow softness physically sensible.

Putty sacks (TOP 50/50, 100/100) are not solids of revolution. They get `ProductGallery` photos, not the 3D viewer. Not faking a sack in code.

### 7.4 Room — `RoomStage`

1. One equirectangular interior photo — a single very wide image covering everything around a point.
2. Mapped to the inside of a large sphere via drei `<Environment background files="/room/interior.hdr" />`.
3. Camera sits inside; bucket at origin on the floor line.
4. Dragging orbits the camera around the bucket. The room slides behind correctly because it is a real sphere, not a flat backdrop.
5. The same image lights the bucket — the window in the photo becomes a real highlight on the plastic. This is the step that makes it read as photographed. One line.
6. A soft shadow under the bucket so it sits on the floor. Biggest realism-per-line win.

**Built as:** drei's `<ContactShadows>` was tried first and reads as nothing — the HDRI has no real floor geometry to catch a projected shadow. Replaced with `GroundShadow`: a circle mesh with a canvas-generated radial-gradient texture, squashed along Z. Same look, no shadow pass.

Source: Poly Haven CC0, 1k HDR, ~1 MB, shared by every page. No shoot needed.

### 7.5 Camera — `OrbitRig`

```
enablePan     false
enableZoom    false
polar angle   clamped 42°–88° — cannot orbit under the floor
damping       0.08
autoRotate    0.7, stops permanently on first pointer down
```

**Zoom removed.** OrbitControls swallows the wheel event, so a full-bleed canvas traps page scroll. Not worth one feature nobody asked for.

### 7.6 Performance rules — non-negotiable

- Entire viewer behind `React.lazy`; never in the main bundle.
- Canvas mounts only while in the viewport (`IntersectionObserver`, 200px margin) and unmounts when scrolled away. `frameloop="demand"` was rejected: the idle auto-rotate needs a continuous loop, so visibility gating buys the same idle saving without killing the animation.
- `dpr={[1, 1.75]}` clamp.
- Labels exported at 2048px wide, served as WebP.
- HDR at 1k, not 2k or 4k. Three rooms ≈ 4.7 MB on a cold visit; drop to 512px (~0.4 MB each) if that proves too heavy on Egyptian mobile data.
- `ViewerPoster` always renders first and stays as the fallback.
- No WebGL support, or `prefers-reduced-motion: reduce` → poster + specs only. Site is fully usable with zero 3D.
- One `<Canvas>` per page maximum.

---

## 8. Content layer

All copy in JSON, typed at `src/content/index.ts`. Empty strings now, filled later — no code changes when text arrives.

```ts
type BilingualText = { en: string; ar: string }

export type ProductFamily = 'lg' | 'top' | 'gold' | 'exo' | 'putty' | 'glue'
export type ProductForm = 'bucket' | 'sack'
export type ProductUse = 'interior' | 'exterior' | 'both'

export type Product = {
  slug: string
  name: BilingualText
  family: ProductFamily
  form: ProductForm
  code: string
  use: ProductUse
  finish: BilingualText
  label: string
  poster: string
  sizes: ('1kg' | '3kg' | '9kg' | '20kg')[]
  specs: {
    coverage: BilingualText
    thinning: BilingualText
    dryTime: BilingualText
    recoat: BilingualText
    shelfLife: BilingualText
  }
  description: BilingualText
  features: BilingualText[]
}
```

SKUs to seed: `lg-8000`, `lg-800`, `gold-600`, `exo-900`, `top-plastic-turkish-10-10`, `top-putty-50-50`, `top-putty-100-100`, `white-glue-200`.

`company.json`, `contact.json`, `faq.json` ship with the same shape and empty `{ en: '', ar: '' }` values. Pages render nothing where a value is empty — no lorem, no broken layout.

---

## 9. Language and direction

- Arabic default, English secondary. Header toggle, persisted in `localStorage`.
- `<html dir>` and `data-language` set from `useSitePreferences`.
- Direction via Tailwind logical properties (`ps-*`, `pe-*`, `ms-*`, `text-start`) — no `[dir=rtl]` overrides scattered through components.
- Arabic line height bumped once in `global.css`.
- The 3D scene is direction-agnostic. Only the overlay text flips.

---

## 10. What is needed from the client

### Blocking

**1. Label artwork — PSD / AI / PDF. Yes, that is the right format.**

What is needed specifically:

- The **flat, unwrapped label** — the rectangle as it goes to the printer, before it is curved onto the bucket.
- Full bleed, at print scale, one file per product.
- **Not** a mockup file showing the bucket with the label already wrapped on it. That has the same problem as a photo.
- If the file has a dieline / keyline layer, keep it — it gives exact wrap width and height.

Conversion handled here: flatten, crop to trim, export 2048px WebP into `public/labels/`.

Why a photo will not work: photos already contain curvature, shadow, and perspective. Wrapping an already-curved image onto a round shape curves it twice — text smears and edges go dark.

**2. Product spec sheet.** Confirmed as arriving in the same PSD. Needed per product: coverage, thinning ratio, dry time, recoat time, finish, interior/exterior, pack sizes, shelf life. Transcribed into `products.json`.

### Not blocking

3. Bucket measurements — standard pail dimensions used for now. When a tape measure is available: three numbers per size, one file edit.
4. Company text — empty JSON, fill later.
5. Contact details — empty JSON, fill later.
6. Factory / showroom photos — About page uses a neutral layout until they arrive.
7. Room photo — free CC0 interior for now. Swap later if a branded showroom shot is wanted.

---

## 11. Phases

| # | Phase | Output |
|---|---|---|
| 1 | Scaffold | Vite + React + TS + Tailwind v4 + router, folder structure, token convention, `global.css` palette, ar/en toggle, `PageShell`, `SiteHeader`, `SiteFooter` |
| 2 | Content layer | All JSON files with real product codes, empty copy, typed boundary |
| 3 | Static pages | Home (poster hero, no WebGL), Products, Product detail, About, Contact. **Complete shippable site.** |
| 4 | Viewer spike | One product. Lathe bucket, one label, room HDR, orbit, contact shadow, poster fallback. Prove it before scaling. |
| 5 | All SKUs | Label textures for every bucket product, size variants; sacks stay 2D |
| 6 | Hero integration | 3D moves into `HeroStage`, mobile tap-to-load gate |
| 7 | Polish | Arabic typography pass, focus states, Lighthouse |

Phases 1–3 stand alone as a finished website. 4–7 are additive and can slip without blocking launch.

---

## 12. Risks

| Risk | Mitigation |
|---|---|
| Label files turn out to be mockups, not flats | Front-facing decal on the cylinder only; sides plain brand color. Visibly worse past 45°, still usable. |
| Estimated bucket dimensions look wrong | One file, four numbers per size. Ten-minute fix once measured. |
| WebGL hero hurts mobile performance | Poster is the default on mobile; canvas is opt-in via tap. |
| Client copy never arrives | Empty-string rendering means the site ships and looks intentional regardless. |
