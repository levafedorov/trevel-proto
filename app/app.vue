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
const { public: { siteUrl } } = useRuntimeConfig()

const canonical = computed(() => `${siteUrl}${route.path}`)

useHead({
  link: [{ rel: 'canonical', href: canonical }],
})

useSeoMeta({
  ogUrl: canonical,
  ogSiteName: 'LovEnRoute',
  ogType: 'website',
  ogImage: `${siteUrl}/og-cover.jpg`,
  twitterCard: 'summary_large_image',
})
</script>
