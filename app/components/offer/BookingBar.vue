<template>
  <!-- Mobile only: fixed bottom booking bar (price + CTA). -->
  <div class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.15)]">
    <div class="bookbar-inner flex items-center gap-4 px-4 py-3">
      <div class="min-w-0">
        <div class="font-serif text-xl font-bold text-stone-900 leading-none">{{ money(offer.priceFrom) }}</div>
        <div class="text-stone-500 text-xs mt-0.5 truncate">{{ meta }}</div>
      </div>
      <UButton
        class="ml-auto shrink-0"
        size="lg"
        color="primary"
        :disabled="booking.disabled.value"
        @click="onBook"
      >
        {{ booking.label.value }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'
import { nearestDeparture } from '~/domain/offer/offerRules'

const props = defineProps<{ offer: Offer }>()

const { t } = useI18n()
const { localize, money } = useLocalizedText()
const bookingModal = useOfferBooking()
const booking = useBookingState(() => props.offer.availability)

// "per person · 19–25 September 2026 · few seats left"
const meta = computed(() => {
  const parts = [t('offerPage.perPerson')]
  const nearest = nearestDeparture(props.offer.departures)
  if (nearest) {
    parts.push(localize(nearest.label))
    if (nearest.seatsLabel) parts.push(localize(nearest.seatsLabel))
  }
  return parts.join(' · ')
})

function onBook() {
  if (!booking.disabled.value) bookingModal.open()
}
</script>
