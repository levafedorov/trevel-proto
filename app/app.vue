<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// Site-wide SEO defaults. Individual pages override title/description via
// their own useSeoMeta; canonical and og:url are derived from the route here
// so no page has to remember to set them.
const route = useRoute()
const { locale } = useI18n()
const { public: { siteUrl } } = useRuntimeConfig()
const { phones, email } = useContacts()

const canonical = computed(() => `${siteUrl}${route.path}`)

/**
 * Organization schema, so search engines can attach the brand name and the new
 * logo to the site rather than guessing both from the page. Contact details
 * come from `useContacts` — the same source the footer and contacts page use,
 * so the markup cannot drift from what a visitor actually sees.
 */
const organizationLd = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${siteUrl}/#organization`,
  'name': 'LovEnRoute',
  'url': siteUrl,
  'logo': `${siteUrl}/logo-512.png`,
  'image': `${siteUrl}/og-cover.jpg`,
  'email': email,
  'telephone': phones.map(p => p.tel),
  'areaServed': 'TR',
  'knowsLanguage': ['ru', 'en'],
}))

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [{ type: 'application/ld+json', innerHTML: organizationLd }],
})

useSeoMeta({
  ogUrl: canonical,
  ogSiteName: 'LovEnRoute',
  ogType: 'website',
  ogImage: `${siteUrl}/og-cover.jpg`,
  // Scrapers that will not download the image to measure it still need the box.
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'LovEnRoute',
  ogLocale: () => (locale.value === 'en' ? 'en_US' : 'ru_RU'),
  twitterCard: 'summary_large_image',
})
</script>
