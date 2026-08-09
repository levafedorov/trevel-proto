<template>
  <div>
    <OfferHero :offer="offer" />
    <OfferStats :offer="offer" />
    <OfferSubNav
      :offer="offer"
      :sections="sections"
      :active-id="activeId"
      @navigate="scrollTo"
    />

    <!-- Fixed section order lives here. Bottom padding clears the mobile booking bar.

         The `<section>` wrappers stay eager: `useSectionNav` observes them by id
         for the sticky sub-nav, and `scrollTo` looks them up the same way. Only
         their contents defer, so scroll-spy keeps working while none of this
         costs hydration on load. -->
    <div class="pb-24 lg:pb-0">
      <section id="overview" class="scroll-mt-32">
        <LazyOfferOverview :offer="offer" :hydrate-on-visible="{ rootMargin: '200px' }" />
      </section>
      <section id="itinerary" class="scroll-mt-32">
        <LazyOfferItinerary :offer="offer" :hydrate-on-visible="{ rootMargin: '200px' }" />
      </section>
      <section id="inclusions" class="scroll-mt-32">
        <LazyOfferInclusions :items="offer.inclusions" :hydrate-on-visible="{ rootMargin: '200px' }" />
      </section>
      <section id="practical" class="scroll-mt-32">
        <LazyOfferPractical :items="offer.practicalInfo" :notes="offer.practicalNotes" :hydrate-on-visible="{ rootMargin: '200px' }" />
      </section>
      <section id="departures" class="scroll-mt-32">
        <LazyOfferDepartures :offer="offer" :hydrate-on-visible="{ rootMargin: '200px' }" />
      </section>
    </div>

    <!-- Fixed to the bottom of the viewport on mobile — visible and tappable
         from the start, so it is not a candidate for deferral. -->
    <OfferBookingBar :offer="offer" />

    <!-- The modal carries the Zod schema, a 26 KB gzip chunk that every visitor
         downloaded and hydrated whether or not they ever opened it. Tying
         hydration to the flag that opens it defers both until the click. -->
    <LazyBookingModal
      v-model:open="booking.isOpen.value"
      :offer-id="offer.slug"
      :offer-name="localize(offer.title)"
      :hydrate-when="booking.isOpen.value"
    />
  </div>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'
// Above-the-fold pieces stay explicitly imported and hydrate with the page.
// The deferred sections below are referenced through their auto-import names
// instead — the `Lazy` prefix and its hydration props only exist there.
import OfferHero from './OfferHero.vue'
import OfferStats from './OfferStats.vue'
import OfferSubNav from './OfferSubNav.vue'

defineProps<{ offer: Offer }>()

const { t } = useI18n()
const { localize } = useLocalizedText()

// Provided to the whole subtree; sub-nav CTA, departures and booking bar share it.
const booking = provideOfferBooking()

const SECTION_IDS = ['overview', 'itinerary', 'inclusions', 'practical', 'departures'] as const

const sections = computed(() =>
  SECTION_IDS.map(id => ({ id, label: t(`offerPage.nav.${id}`) })),
)

const { activeId, scrollTo } = useSectionNav([...SECTION_IDS])
</script>
