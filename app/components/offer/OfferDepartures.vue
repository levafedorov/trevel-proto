<template>
  <div v-if="offer.departures.length" class="bg-[#faf8f5] py-14 lg:py-20">
    <UContainer>
      <h2 class="font-serif text-3xl lg:text-4xl font-bold text-stone-900 mb-8">
        {{ $t('offerPage.departures.title') }}
      </h2>

      <!-- Dark "next departure" card; extra dated cards stack below on all sizes. -->
      <div class="flex flex-col gap-4">
        <div
          v-for="(departure, i) in orderedDepartures"
          :key="departure.id"
          class="phd rounded-2xl p-6 lg:p-8 text-white"
          :class="{ 'ring-1 ring-amber-500/40': i === 0 }"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p v-if="i === 0" class="text-amber-400 text-xs font-medium uppercase tracking-wide mb-2">
                {{ $t('offerPage.departures.nearest') }}
                <template v-if="departure.seatsLabel"> · {{ localize(departure.seatsLabel) }}</template>
              </p>
              <p class="font-serif text-2xl font-bold">{{ localize(departure.label) }}</p>
              <p class="text-white/70 text-sm mt-2">
                {{ money(departure.price) }} {{ $t('offerPage.perPerson') }} · {{ localize(departure.paymentNote) }}
              </p>
            </div>

            <div class="shrink-0">
              <UButton
                size="lg"
                color="primary"
                :disabled="booking.disabled.value"
                @click="onBook"
              >
                {{ booking.label.value }}
              </UButton>
              <p class="text-white/50 text-xs mt-2 text-center">{{ $t('offerPage.cta.hint') }}</p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'
import { nearestDeparture } from '~/domain/offer/offerRules'

const props = defineProps<{ offer: Offer }>()

const { localize, money } = useLocalizedText()
const bookingModal = useOfferBooking()
const booking = useBookingState(() => props.offer.availability)

// Nearest first, then the rest by date.
const orderedDepartures = computed(() => {
  const nearest = nearestDeparture(props.offer.departures)
  if (!nearest) return props.offer.departures
  return [nearest, ...props.offer.departures.filter(d => d.id !== nearest.id)]
})

function onBook() {
  if (!booking.disabled.value) bookingModal.open()
}
</script>

<style scoped lang="scss">
// Dark textured card (matches the reference "next departure" panel).
.phd {
  background: linear-gradient(135deg, #3b342c, #26221c);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0 10px, transparent 10px 20px);
    pointer-events: none;
  }

  > * {
    position: relative;
  }
}
</style>
