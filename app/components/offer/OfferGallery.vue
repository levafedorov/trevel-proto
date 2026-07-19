<template>
  <div v-if="images.length">
    <!-- Grid on desktop, swipe-snap carousel on mobile. -->
    <div class="gallery flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory">
      <button
        v-for="(image, i) in images"
        :key="i"
        type="button"
        class="group relative shrink-0 basis-[82%] md:basis-auto snap-center rounded-xl overflow-hidden aspect-[4/3] bg-stone-100"
        @click="lightbox.show(i)"
      >
        <img
          :src="image.src"
          :alt="localize(image.alt)"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        >
        <span class="absolute bottom-2 left-2 text-white text-xs font-medium px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
          {{ localize(image.alt) }}
        </span>
      </button>
    </div>

    <MediaLightbox v-model:open="lightbox.open" v-model:index="lightbox.index" :images="images" />
  </div>
</template>

<script setup lang="ts">
import type { Media } from '~/domain/offer/types'
import MediaLightbox from './MediaLightbox.vue'

defineProps<{ images: Media[] }>()

const { localize } = useLocalizedText()
const lightbox = useLightbox()
</script>

<style scoped lang="scss">
.gallery {
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
