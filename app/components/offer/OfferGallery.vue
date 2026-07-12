<template>
  <div v-if="images.length">
    <!-- Grid on desktop, swipe-snap carousel on mobile. -->
    <div class="gallery flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory">
      <button
        v-for="(image, i) in images"
        :key="i"
        type="button"
        class="group relative shrink-0 basis-[82%] md:basis-auto snap-center rounded-xl overflow-hidden aspect-[4/3] bg-stone-100"
        @click="openAt(i)"
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

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          @click="close"
        >
          <button
            type="button"
            class="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            aria-label="Close"
            @click.stop="close"
          >
            <UIcon name="i-lucide-x" class="w-7 h-7" />
          </button>

          <button
            v-if="images.length > 1"
            type="button"
            class="absolute left-3 md:left-6 text-white/80 hover:text-white p-2"
            aria-label="Previous"
            @click.stop="prev"
          >
            <UIcon name="i-lucide-chevron-left" class="w-9 h-9" />
          </button>

          <figure class="max-w-4xl max-h-[85vh] flex flex-col items-center" @click.stop>
            <img
              :src="images[current]!.src"
              :alt="localize(images[current]!.alt)"
              class="max-w-full max-h-[78vh] object-contain rounded-lg"
            >
            <figcaption class="text-white/80 text-sm mt-3">
              {{ localize(images[current]!.alt) }} · {{ current + 1 }} / {{ images.length }}
            </figcaption>
          </figure>

          <button
            v-if="images.length > 1"
            type="button"
            class="absolute right-3 md:right-6 text-white/80 hover:text-white p-2"
            aria-label="Next"
            @click.stop="next"
          >
            <UIcon name="i-lucide-chevron-right" class="w-9 h-9" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import type { Media } from '~/domain/offer/types'

const props = defineProps<{ images: Media[] }>()

const { localize } = useLocalizedText()

const lightboxOpen = ref(false)
const current = ref(0)

function openAt(i: number) {
  current.value = i
  lightboxOpen.value = true
}
function close() {
  lightboxOpen.value = false
}
function prev() {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}
function next() {
  current.value = (current.value + 1) % props.images.length
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
})
</script>

<style scoped lang="scss">
.gallery {
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
