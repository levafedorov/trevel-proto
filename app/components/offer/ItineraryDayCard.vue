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

      <!-- Meal / logistics notes as coloured badges: green = included, amber = caveat. -->
      <div v-if="day.notes.length" class="mt-4 space-y-2">
        <div
          v-for="(note, i) in day.notes"
          :key="i"
          class="flex items-start gap-1.5 text-xs font-semibold rounded-lg border px-3 py-2"
          :class="toneClass[note.tone]"
        >
          <UIcon :name="toneIcon[note.tone]" class="w-3.5 h-3.5 shrink-0 mt-px" />
          <span>{{ localize(note.text) }}</span>
        </div>
      </div>

      <PoiList v-if="day.pois.length" :pois="day.pois" class="mt-4" />
    </div>
  </details>
</template>

<script setup lang="ts">
import type { ItineraryDay } from '~/domain/offer/types'
import { NoteTone } from '~/domain/offer/types'
import DayTimeline from './DayTimeline.vue'
import PoiList from './PoiList.vue'

defineProps<{
  day: ItineraryDay
  defaultOpen?: boolean
}>()

const { localize } = useLocalizedText()

const toneClass: Record<NoteTone, string> = {
  [NoteTone.POSITIVE]: 'bg-green-50 border-green-200 text-green-700',
  [NoteTone.CAUTION]: 'bg-amber-50 border-amber-200 text-amber-700',
}

const toneIcon: Record<NoteTone, string> = {
  [NoteTone.POSITIVE]: 'i-lucide-check-circle',
  [NoteTone.CAUTION]: 'i-lucide-info',
}
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
