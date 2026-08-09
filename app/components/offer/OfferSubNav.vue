<template>
  <!-- Desktop only: sticky scroll-spy tabs + compact price + book CTA.
       `top` tracks the navbar's bottom edge so the bar docks under it while the
       navbar is visible and slides up to the very top when it hides. -->
  <!-- Docks directly under the navbar, which is h-20 (80px) at this breakpoint
       and no longer moves — so this is a constant offset, not a tracked one. -->
  <nav class="hidden lg:block sticky top-20 z-30 bg-[#faf8f5]/95 backdrop-blur border-b border-stone-200/70">
    <UContainer>
      <div class="flex items-center justify-between h-14">
        <ul class="flex items-center gap-1">
          <li v-for="section in sections" :key="section.id">
            <button
              type="button"
              class="px-3.5 py-2 text-sm font-medium rounded-md transition-colors"
              :class="section.id === activeId
                ? 'text-amber-700 bg-amber-50'
                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'"
              @click="emit('navigate', section.id)"
            >
              {{ section.label }}
            </button>
          </li>
        </ul>

        <div class="flex items-center gap-4">
          <div class="text-right leading-tight">
            <div class="font-serif text-lg font-bold text-stone-900">{{ money(offer.priceFrom) }}</div>
            <div class="text-stone-400 text-xs">{{ $t('offerPage.perPerson') }}</div>
          </div>
          <UButton color="primary" :disabled="booking.disabled.value" @click="onBook">
            {{ booking.label.value }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </nav>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'

const props = defineProps<{
  offer: Offer
  sections: Array<{ id: string, label: string }>
  activeId: string
}>()

const emit = defineEmits<{ navigate: [id: string] }>()

const { money } = useLocalizedText()
const bookingModal = useOfferBooking()
const booking = useBookingState(() => props.offer.availability)

function onBook() {
  if (!booking.disabled.value) bookingModal.open()
}
</script>
