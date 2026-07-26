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

    <!-- Fixed section order lives here. Bottom padding clears the mobile booking bar. -->
    <div class="pb-24 lg:pb-0">
      <section id="overview" class="scroll-mt-32">
        <OfferOverview :offer="offer" />
      </section>
      <section id="itinerary" class="scroll-mt-32">
        <OfferItinerary :offer="offer" />
      </section>
      <section id="inclusions" class="scroll-mt-32">
        <OfferInclusions :items="offer.inclusions" />
      </section>
      <section id="practical" class="scroll-mt-32">
        <OfferPractical :items="offer.practicalInfo" :notes="offer.practicalNotes" />
      </section>
      <section id="departures" class="scroll-mt-32">
        <OfferDepartures :offer="offer" />
      </section>
    </div>

    <BookingBar :offer="offer" />

    <BookingModal
      v-model:open="booking.isOpen.value"
      :offer-id="offer.slug"
      :offer-name="localize(offer.title)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'
import OfferHero from './OfferHero.vue'
import OfferStats from './OfferStats.vue'
import OfferSubNav from './OfferSubNav.vue'
import OfferOverview from './OfferOverview.vue'
import OfferItinerary from './OfferItinerary.vue'
import OfferInclusions from './OfferInclusions.vue'
import OfferPractical from './OfferPractical.vue'
import OfferDepartures from './OfferDepartures.vue'
import BookingBar from './BookingBar.vue'

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
