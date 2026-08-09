<template>
  <div class="pt-16 lg:pt-20 bg-[#faf8f5] min-h-screen">
    <OfferSkeleton v-if="pending" />
    <OfferError v-else-if="error" @retry="retry" />
    <OfferNotFound v-else-if="notFound || !offer" />
    <OfferLayout v-else :offer="offer" />
  </div>
</template>

<script setup lang="ts">
import OfferLayout from '~/components/offer/OfferLayout.vue'
import OfferSkeleton from '~/components/offer/states/OfferSkeleton.vue'
import OfferNotFound from '~/components/offer/states/OfferNotFound.vue'
import OfferError from '~/components/offer/states/OfferError.vue'

const route = useRoute()
const slug = computed(() => String(route.params.id))

const { data: offer, pending, error, notFound, retry } = useOfferDetail(slug.value)

const { localize } = useLocalizedText()

// og:image has to be absolute — crawlers do not resolve it against the page.
const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: () => (offer.value ? localize(offer.value.meta.title) : 'LovEnRoute'),
  description: () => (offer.value ? localize(offer.value.meta.description) : ''),
  ogImage: () => {
    const path = offer.value?.meta.ogImage
    return path ? `${siteUrl}${path}` : `${siteUrl}/og-cover.jpg`
  },
})
</script>
