# CLAUDE.md

## Project: LovEnRoute Touristic Platform

A premium travel agency web platform built with Nuxt 4.

## Commands

```bash
# Start dev server (PowerShell / Windows)
node .\node_modules\nuxt\bin\nuxt.mjs dev

# Or add nuxt to PATH first, then:
npm run dev

# Build for production
npx nuxt build

# Preview production build
npx nuxt preview
```

## Tech Stack

- **Framework**: Nuxt 4.4 (`future.compatibilityVersion: 4`) — source in `app/`
- **UI / Design**: Nuxt UI v3 (`@nuxt/ui`) + Tailwind CSS v4 (included)
- **Icons**: Lucide (`@iconify-json/lucide`) via Nuxt UI
- **Images**: `@nuxt/image` — external domains: `picsum.photos`
- **i18n**: `@nuxtjs/i18n` v9 — English locale in `i18n/locales/en.json`
- **Validation**: Zod v3 (bundled as Nuxt UI peer dep) — used in `BookingModal.vue`
- **Fonts**: Inter (sans) + Playfair Display (serif) from Google Fonts
- **Composables**: VueUse via `@vueuse/nuxt`

## Architecture

```
app/
  app.vue            # Root — wraps with <UApp> for toasts/modals
  layouts/
    default.vue      # Navbar + Footer wrapper
  pages/
    index.vue        # Home: Hero + Advantages + Recent Offers + CTA
    about.vue        # About: Story + Manager photo + Contacts
    dashboard.vue    # All offers with active/inactive + category filters
    offers/[id].vue  # Offer detail with booking CTA modal
  components/
    AppNavbar.vue    # Fixed navbar, hides on scroll, shows on scroll-stop
    AppFooter.vue
    HeroSection.vue         # Full-screen parallax hero
    AdvantagesSection.vue   # 4-column advantages row
    RecentOffersSection.vue # 3 most recent active offers
    OfferCard.vue           # Reusable card (home + dashboard)
    BookingModal.vue        # Zod-validated booking form with mock submit
  composables/
    useScrollNavbar.ts    # Navbar hide/show on scroll direction
    useOffers.ts          # Mock offer data (6 offers)
    useMockDatabase.ts    # Mock Supabase: createBooking() + email logging
  assets/css/main.css    # Tailwind imports + page transitions + fonts
  locales/               # Unused — actual locales at i18n/locales/
i18n/
  locales/
    en.json              # All UI strings
```

## Design System

- Primary color: **Amber** (warm travel orange) — CTAs, prices, badges
- Neutral: **Stone** — backgrounds, text
- Typography: Inter for body, Playfair Display (serif) for headings
- Page transition: fade + translateY (`page-enter-active` CSS class)
- Navbar: transparent over hero, white with shadow when scrolled

## Key Conventions

- All mock data is in `app/composables/useOffers.ts` — replace with Supabase
- All mock DB/email logic is in `app/composables/useMockDatabase.ts` — replace with Supabase + Resend/etc
- `@` in i18n JSON values triggers vue-i18n parser — avoid `@` in translation strings
- `app/locales/` is an artifact — `i18n/locales/` is the active locale directory

### Images

Photography lives in `public/images/` and is referenced by plain path
(`/images/first-tour/foo.jpeg`), never imported. Importing it puts the file in
the Vite module graph, and Nitro then emits a `<link rel="prefetch" as="image">`
for every one — which is how 4.3 MB of JPEG once landed on every page.

Render them with `<NuxtImg>`, always with `format="webp"` and an explicit
`sizes`. Two traps:

- `sizes` emits a srcset candidate **per listed breakpoint**. `sizes="100vw"`
  or a lone `xs:100vw` produces a single tiny variant, not a responsive set —
  spell out `xs: sm: md: lg: …` up to the source file's real width.
- The `ipxStatic` provider only writes variants it saw rendered while
  prerendering. **Anything behind `v-if` must not use `<NuxtImg>`** — it would
  point at an `/_ipx/` URL that was never generated and 404 in production while
  working in dev. `MediaLightbox.vue` is the standing example: plain `<img>`.

### Scroll effects

**The header never moves.** It is fixed, always visible, and only swaps its
background once the page has scrolled (two thresholds, 48/16, so a position
resting on the boundary cannot flicker). It previously hid on scroll-down and
returned on scroll-up and on a 600ms timer — which slid a full-width blurred
strip across the hero throughout normal reading, since reading is flick, pause,
flick. Thresholds did not help; the movement was the problem. Do not reinstate
hide-on-scroll. Its `transition` must also never be `all` or include
`backdrop-filter`, or the blur radius animates and the strip behind it is
re-blurred for the whole 300ms. `test/e2e/navbar.spec.ts` pins this.

**The hero has no parallax.** It is a still, full-bleed image; `HeroSection.vue`
is template-only. If one is ever wanted again, do not drive it from a `scroll`
handler — that event fires after the browser has painted the new offset, so the
image is permanently a frame behind the content in front of it and jitters. Use
a scroll-driven CSS animation (`animation-timeline: scroll()`), which the
compositor evaluates. Nuxt UI has no parallax component, and VueUse's
`useParallax` is tilt-based, not scroll.

### Hydration

Below-the-fold and on-demand components defer hydration via the `Lazy` prefix
and a strategy prop (`hydrate-on-visible`, `hydrate-when`). Rules that matter:

- Strategy props only exist on **auto-imported** components. A component reached
  through an explicit `import` cannot use them — `OfferLayout` keeps explicit
  imports only for the pieces that hydrate eagerly.
- **Anything driving first-gesture behaviour must stay eager**: `AppNavbar`
  (hides on scroll), `HeroSection` (parallax listener), `OfferSubNav`,
  `OfferBookingBar`.
- The `<section id="…">` wrappers in `OfferLayout` stay eager because
  `useSectionNav` observes them by id; only their contents defer.
- Any prop change hydrates the component immediately, so this only works while
  the data is stable — it is, because the offer comes from the prerender payload.
- A native `<details>` (the itinerary day cards) opens with no JavaScript, so it
  is useless as a probe for whether a section hydrated. Test a real click
  handler instead.

### Icons

`icon.provider` is `'none'` with `clientBundle.scan` — every icon must ship in
the client build. The default runtime fallback fetches `/api/_nuxt_icon/*`,
which cannot exist on the static bucket, so client-only icons rendered blank.
Keep icon names as static literals or the scanner will miss them.

## Testing

Playwright e2e in `test/e2e/`, run against the **built** bundle (they assert on
prerendered output and generated image variants):

```bash
npx nuxt build && npm run test:e2e
```

`test/e2e/static-server.mjs` mimics Object Storage — directory-index resolution
and real 404s — and shares its header logic with `scripts/deploy.mjs` via
`scripts/asset-headers.mjs`, so what the suite checks is what the bucket gets.
