export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  // Single source of truth for the public origin. Canonical links, og:url,
  // the OG image and sitemap.xml all derive from it, so a domain change is a
  // one-line edit (or a NUXT_PUBLIC_SITE_URL override at build time).
  runtimeConfig: {
    public: {
      siteUrl: 'https://lovenroute.com',
    },
  },

  future: {
    compatibilityVersion: 4,
  },
  
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],

  // Icons must ship inside the client bundle. @nuxt/icon's default is to fetch
  // any icon it did not see server-rendered from `/api/_nuxt_icon/*` at
  // runtime — an endpoint that cannot exist on a static bucket. It only bites
  // icons rendered client-side, which is why it went unnoticed: the lightbox
  // arrows and its close button sit behind `v-if="open"`, so on production they
  // silently rendered as nothing. `provider: 'none'` removes the runtime
  // fallback entirely so this fails loudly at build time instead.
  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },

  ui: {
    // The site is light-only: no `dark:` styles, no theme toggle. Without this,
    // @nuxt/ui registers color-mode, which adds `.dark` to <html> whenever the
    // visitor's OS prefers dark — flipping Nuxt UI components (the booking modal
    // most visibly) while our own markup stays light.
    colorMode: false,
  },

  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'ru',
        language: 'ru-RU',
        name: 'Русский',
        file: 'ru.json',
      },
    ],
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  // Photography is served from `public/images` and resized at build time: the
  // `static` nitro preset below switches @nuxt/image to the `ipxStatic`
  // provider, which writes every requested variant into `.output/public/_ipx`
  // during prerender. Nothing resizes at runtime — the bucket has no server.
  //
  // Caveat that shapes the markup: ipxStatic only emits a variant it actually
  // saw rendered while crawling. Anything behind a `v-if` (the lightbox) never
  // renders during prerender, so it must NOT use <NuxtImg> — it points straight
  // at the original file in `public/`, which is always there.
  image: {
    domains: ['picsum.photos', 'images.unsplash.com'],
    format: ['webp'],
    quality: 72,
  },

  // Deployed as a fully prerendered site to Yandex Object Storage: no server
  // runtime, so every route must exist as an .html file in the bucket.
  // `crawlLinks` walks the internal <NuxtLink>s from `/` and picks up the
  // offer detail pages; `/dashboard` is listed because nothing links to it
  // from a crawled page yet.
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/dashboard'],
      failOnError: true,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      // Fallback for routes that set no meta of their own (the 404 page above
      // all). Russian, because that is the default locale — pages that do set
      // meta take theirs from i18n under `seo.*` and override this.
      title: 'LovEnRoute — авторские туры по Турции',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Авторские туры по побережьям Турции от человека, который живёт этой страной.' },
        // Tints the browser chrome on mobile to the brand amber.
        { name: 'theme-color', content: '#d97706' },
      ],
      // No Google Fonts <link> here on purpose: @nuxt/fonts (bundled with
      // @nuxt/ui) reads --font-sans / --font-serif from main.css, downloads
      // Inter and Playfair Display at build time — Cyrillic subsets included —
      // and serves them from /_fonts. Re-adding the CDN link would fetch the
      // same faces twice over a render-blocking request to a host that is slow
      // and unreliable from Russia.
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  devtools: { enabled: true },
})
