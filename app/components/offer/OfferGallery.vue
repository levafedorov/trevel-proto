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
        <NuxtImg
          :src="image.src"
          :alt="localize(image.alt)"
          format="webp"
          sizes="xs:82vw sm:82vw md:33vw lg:340px xl:420px"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span class="absolute bottom-2 left-2 text-white text-xs font-medium px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
          {{ localize(image.alt) }}
        </span>
      </button>
    </div>

    <!-- Nothing of the viewer is on screen until a thumbnail is clicked, and it
         brings a swipe handler and a keydown listener with it. Hydrating it on
         the same flag that opens it keeps all of that out of page load. -->
    <LazyOfferMediaLightbox
      v-model:open="lightbox.open"
      v-model:index="lightbox.index"
      :images="images"
      :hydrate-when="lightbox.open"
    />
  </div>
</template>

<script setup lang="ts">
import type { Media } from '~/domain/offer/types'

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
