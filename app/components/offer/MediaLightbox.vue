<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && images.length"
        ref="root"
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
          <!-- Deliberately a plain <img>, not <NuxtImg>. This dialog sits behind
               `v-if="open"`, so it never renders while Nitro prerenders the
               page — and the ipxStatic provider only writes variants it saw
               rendered. A <NuxtImg> here would point at an /_ipx/ URL that was
               never generated and 404 in production. The original file in
               `public/` is always served, and full size is what a lightbox
               wants anyway. -->
          <img
            :src="current.src"
            :alt="localize(current.alt)"
            class="max-w-full max-h-[78vh] object-contain rounded-lg select-none"
            draggable="false"
          >
          <figcaption class="text-white/80 text-sm mt-3">
            {{ localize(current.alt) }}
            <template v-if="images.length > 1"> · {{ index + 1 }} / {{ images.length }}</template>
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
</template>

<script setup lang="ts">
import { useEventListener, useSwipe } from '@vueuse/core'
import type { Media } from '~/domain/offer/types'

const props = defineProps<{ images: Media[] }>()
const open = defineModel<boolean>('open', { default: false })
const index = defineModel<number>('index', { default: 0 })

const { localize } = useLocalizedText()

const current = computed(() => props.images[index.value] ?? props.images[0]!)

function close() {
  open.value = false
}
function prev() {
  index.value = (index.value - 1 + props.images.length) % props.images.length
}
function next() {
  index.value = (index.value + 1) % props.images.length
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
})

// Swipe left/right to page through on touch devices.
const root = ref<HTMLElement | null>(null)
const { direction } = useSwipe(root, {
  onSwipeEnd() {
    if (props.images.length < 2) return
    if (direction.value === 'left') next()
    else if (direction.value === 'right') prev()
  },
})
</script>
