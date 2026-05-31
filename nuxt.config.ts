export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  ui: {
    colors: {
      primary: 'amber',
      neutral: 'stone',
    },
  },

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
    defaultLocale: 'en',
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

  image: {
    domains: ['picsum.photos', 'images.unsplash.com'],
    format: ['webp', 'jpg'],
  },

  nitro: {
    preset: 'vercel',
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'OlimpiaTour – Turkey Travel Specialists',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'OlimpiaTour — Turkey travel specialists. Handcrafted journeys to Istanbul, Cappadocia, the Aegean coast, and beyond.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..700;1,14..32,300..700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&subset=latin,cyrillic&display=swap',
        },
      ],
    },
  },

  devtools: { enabled: true },
})
