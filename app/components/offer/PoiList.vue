<template>
  <div class="day-body-img flex gap-2">
    <figure v-for="(poi, i) in pois" :key="i" class="flex-1 min-w-0">
      <button
        type="button"
        class="group block w-full rounded-xl overflow-hidden aspect-[16/10] bg-stone-100"
        @click="lightbox.show(i)"
      >
        <img
          :src="poi.image.src"
          :alt="localize(poi.image.alt)"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        >
      </button>
      <figcaption class="text-stone-500 text-xs mt-1.5 truncate">{{ localize(poi.label) }}</figcaption>
    </figure>

    <MediaLightbox v-model:open="lightbox.open" v-model:index="lightbox.index" :images="images" />
  </div>
</template>

<script setup lang="ts">
import type { PointOfInterest } from '~/domain/offer/types'
import MediaLightbox from './MediaLightbox.vue'

const props = defineProps<{ pois: PointOfInterest[] }>()

const { localize } = useLocalizedText()
const lightbox = useLightbox()

// The day's photos, laid out for the shared viewer.
const images = computed(() => props.pois.map(poi => poi.image))
</script>
