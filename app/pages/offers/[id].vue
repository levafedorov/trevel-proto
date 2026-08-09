<template>
  <div class="pt-16 lg:pt-20 bg-[#faf8f5] min-h-screen">
    <OfferSkeleton v-if="pending" />
    <OfferError v-else-if="error" @retry="retry" />
    <OfferNotFound v-else-if="notFound || !offer" />
    <OfferLayout v-else :offer="offer" />
  </div>
</template>

<script setup lang="ts">
import { DepartureStatus } from '~/domain/offer/types'
import { nearestDeparture } from '~/domain/offer/offerRules'
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

/**
 * TouristTrip schema for the offer. Two tours now run the same route on
 * different dates, so the departure window and the price are what a search
 * result needs in order to be worth clicking. Everything here is read off the
 * offer — nothing is restated by hand, so it cannot contradict the page.
 */
const tripLd = computed(() => {
  const current = offer.value
  if (!current) return ''

  const departure = nearestDeparture(current.departures)

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    'name': localize(current.title),
    'description': localize(current.shortDescription),
    'url': `${siteUrl}/offers/${current.slug}`,
    'image': `${siteUrl}${current.hero.src}`,
    'provider': { '@id': `${siteUrl}/#organization` },
    'touristType': localize(current.eyebrow),
    'itinerary': {
      '@type': 'ItemList',
      'numberOfItems': current.itinerary.length,
      'itemListElement': current.itinerary.map(day => ({
        '@type': 'ListItem',
        'position': day.day,
        'name': localize(day.title),
      })),
    },
    ...(departure && {
      offers: {
        '@type': 'Offer',
        'price': departure.price.amount,
        'priceCurrency': departure.price.currency,
        'availability': departure.status === DepartureStatus.SOLD_OUT
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
        'url': `${siteUrl}/offers/${current.slug}`,
        'validThrough': departure.startDate,
      },
      startDate: departure.startDate,
      endDate: departure.endDate,
    }),
  })
})

useHead({
  script: [{ type: 'application/ld+json', innerHTML: tripLd }],
})
</script>
