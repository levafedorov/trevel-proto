<template>
  <details class="acc tl-card" :open="defaultOpen">
    <summary class="flex items-start gap-3 p-5">
      <span class="flex-1 min-w-0">
        <span class="block font-serif text-lg font-bold text-stone-900 leading-snug">
          {{ localize(day.title) }}
        </span>
        <span v-if="day.theme" class="block text-stone-500 text-sm mt-0.5">{{ localize(day.theme) }}</span>
      </span>
      <UIcon name="i-lucide-chevron-down" class="chev shrink-0 w-5 h-5 text-stone-400 mt-1" />
    </summary>

    <div class="day-body px-5 pb-5">
      <DayTimeline v-if="day.timeline.length" :entries="day.timeline" />

      <div v-if="day.body.length" class="space-y-3 text-stone-600 text-sm leading-relaxed">
        <p v-for="(paragraph, i) in day.body" :key="i">{{ localize(paragraph) }}</p>
      </div>

      <!-- Meals covered by the price on this day -->
      <div v-if="meals.length" class="flex flex-wrap gap-2 mt-4">
        <span
          v-for="meal in meals"
          :key="meal.key"
          class="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 rounded-full px-2.5 py-1"
        >
          <UIcon :name="meal.icon" class="w-3.5 h-3.5" />
          {{ meal.label }}
        </span>
      </div>

      <ul v-if="day.notes.length" class="mt-4 space-y-1">
        <li v-for="(note, i) in day.notes" :key="i" class="text-stone-400 text-xs flex gap-1.5">
          <UIcon name="i-lucide-info" class="w-3.5 h-3.5 shrink-0 mt-0.5" />
          {{ localize(note) }}
        </li>
      </ul>

      <PoiList v-if="day.pois.length" :pois="day.pois" class="mt-4" />
    </div>
  </details>
</template>

<script setup lang="ts">
import type { ItineraryDay } from '~/domain/offer/types'
import DayTimeline from './DayTimeline.vue'
import PoiList from './PoiList.vue'

const props = defineProps<{
  day: ItineraryDay
  defaultOpen?: boolean
}>()

const { t } = useI18n()
const { localize } = useLocalizedText()

const MEAL_ICONS = {
  breakfast: 'i-lucide-coffee',
  lunch: 'i-lucide-utensils',
  dinner: 'i-lucide-wine',
} as const

const meals = computed(() =>
  (['breakfast', 'lunch', 'dinner'] as const)
    .filter(key => props.day.meals?.[key])
    .map(key => ({ key, icon: MEAL_ICONS[key], label: t(`offerPage.meals.${key}`) })),
)
</script>

<style scoped lang="scss">
.tl-card {
  width: 100%;
  background: #fff;
  border: 1px solid #eee6d9;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 30px -18px rgba(60, 45, 20, 0.3);
}

details.acc > summary {
  list-style: none;
  cursor: pointer;

  &::-webkit-details-marker {
    display: none;
  }
}

details.acc[open] .chev {
  transform: rotate(180deg);
}

.chev {
  transition: transform 0.2s;
}
</style>
