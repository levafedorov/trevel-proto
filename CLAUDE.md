# CLAUDE.md

## Project: OlimpiaTour Touristic Platform

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
- Images use `picsum.photos/seed/{name}/{w}/{h}` URLs — replace with real photography
- `app/locales/` is an artifact — `i18n/locales/` is the active locale directory
