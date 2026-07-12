<template>
  <div v-if="offer.itinerary.length" class="bg-white py-14 lg:py-20 border-t border-stone-100">
    <UContainer>
      <div class="text-center mb-12">
        <h2 class="font-serif text-3xl lg:text-4xl font-bold text-stone-900 mb-2">
          {{ $t('offerPage.itinerary.title') }}
        </h2>
        <p class="text-stone-500 text-sm">{{ subtitle }}</p>
      </div>

      <!-- Winding zig-zag stepper: dashed line + day nodes + alternating cards. -->
      <div class="tl">
        <div class="tl-wave" aria-hidden="true" />
        <div v-for="(day, i) in offer.itinerary" :key="day.day" class="tl-row">
          <div class="tl-node">{{ day.day }}</div>
          <ItineraryDayCard
            :day="day"
            :default-open="i === 0"
            :class="i % 2 === 0 ? 'tl-left' : 'tl-right'"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'
import { nearestDeparture } from '~/domain/offer/offerRules'
import ItineraryDayCard from './ItineraryDayCard.vue'

const props = defineProps<{ offer: Offer }>()

const { t } = useI18n()
const { localize } = useLocalizedText()

const subtitle = computed(() => {
  const hint = t('offerPage.itinerary.hint')
  const nearest = nearestDeparture(props.offer.departures)
  return nearest ? `${localize(nearest.label)} · ${hint}` : hint
})
</script>

<style scoped lang="scss">
.tl {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 8px 0;
}

// Central dashed wave (amber), repeated vertically.
.tl-wave {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  opacity: 0.6;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='240' viewBox='0 0 140 240'%3E%3Cpath d='M70 0 C 6 60 134 180 70 240' fill='none' stroke='%23f59e0b' stroke-width='2.5' stroke-dasharray='5 9' stroke-linecap='round'/%3E%3C/svg%3E") repeat-y center top;
  background-size: 140px 240px;
  pointer-events: none;
}

.tl-row {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 140px 1fr;
  align-items: start;
  margin-bottom: 26px;
}

.tl-node {
  grid-column: 2;
  justify-self: center;
  margin-top: 14px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #f59e0b;
  color: #1c1917;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 6px #fff, 0 6px 16px -6px rgba(217, 119, 6, 0.6);
}

// Card placement: alternate sides of the wave.
:deep(.tl-left) {
  grid-column: 1;
  justify-self: end;
  margin-right: 26px;
  max-width: 380px;
}

:deep(.tl-right) {
  grid-column: 3;
  justify-self: start;
  margin-left: 26px;
  max-width: 380px;
}

@media (max-width: 1000px) {
  .tl {
    max-width: none;
  }

  .tl-wave {
    left: 23px;
    transform: none;
    width: 46px;
    background-size: 46px 170px;
  }

  .tl-row {
    grid-template-columns: 46px 1fr;
    column-gap: 6px;
    margin-bottom: 12px;
  }

  .tl-node {
    grid-column: 1;
    margin-top: 12px;
    width: 38px;
    height: 38px;
    font-size: 14px;
  }

  :deep(.tl-left),
  :deep(.tl-right) {
    grid-column: 2;
    justify-self: stretch;
    max-width: none;
    margin: 0;
  }
}
</style>
