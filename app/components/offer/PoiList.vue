<template>
  <div class="day-body-img flex gap-2">
    <figure v-for="(poi, i) in pois" :key="i" class="flex-1 min-w-0">
      <div class="rounded-xl overflow-hidden aspect-[16/10] bg-stone-100">
        <img
          :src="poi.image.src"
          :alt="localize(poi.image.alt)"
          loading="lazy"
          class="w-full h-full object-cover"
        >
      </div>
      <figcaption class="text-stone-500 text-xs mt-1.5 truncate">{{ localize(poi.label) }}</figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { PointOfInterest } from '~/domain/offer/types'

defineProps<{ pois: PointOfInterest[] }>()

const { localize } = useLocalizedText()
</script>
