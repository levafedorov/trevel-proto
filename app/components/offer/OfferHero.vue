<template>
  <section class="bg-[#faf8f5]">
    <div class="hero-split">
      <!-- Image slider -->
      <div ref="heroImg" class="hero-img relative overflow-hidden group">
        <button
          v-for="(slide, i) in slides"
          :key="i"
          type="button"
          class="absolute inset-0 w-full h-full transition-opacity duration-500"
          :class="i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'"
          :aria-label="localize(slide.alt)"
          @click="lightbox.show(active)"
        >
          <img
            :src="slide.src"
            :alt="localize(slide.alt)"
            class="w-full h-full object-cover"
            :fetchpriority="i === 0 ? 'high' : 'auto'"
            :loading="i === 0 ? 'eager' : 'lazy'"
          >
        </button>

        <div class="absolute inset-0 bg-gradient-to-t from-amber-950/30 to-transparent pointer-events-none" />

        <template v-if="slides.length > 1">
          <button
            type="button"
            class="hero-arrow left-3"
            aria-label="Previous photo"
            @click.stop="prev"
          >
            <UIcon name="i-lucide-chevron-left" class="w-6 h-6" />
          </button>
          <button
            type="button"
            class="hero-arrow right-3"
            aria-label="Next photo"
            @click.stop="next"
          >
            <UIcon name="i-lucide-chevron-right" class="w-6 h-6" />
          </button>

          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button
              v-for="(slide, i) in slides"
              :key="i"
              type="button"
              class="h-2 rounded-full transition-all"
              :class="i === active ? 'w-6 bg-white' : 'w-2 bg-white/55 hover:bg-white/80'"
              :aria-label="`Photo ${i + 1}`"
              @click.stop="active = i"
            />
          </div>
        </template>
      </div>

      <!-- Copy -->
      <div class="hero-copy flex flex-col justify-center">
        <p class="text-amber-600 font-medium tracking-wide text-sm mb-4">
          {{ localize(offer.eyebrow) }}
        </p>
        <h1 class="hero-title font-serif text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {{ localize(offer.title) }}
        </h1>
        <p class="text-stone-600 text-lg mt-5 leading-relaxed">
          {{ localize(offer.subtitle) }}
        </p>

        <div class="mt-8 flex items-baseline gap-3">
          <span class="font-serif text-5xl font-bold text-amber-600">{{ money(offer.priceFrom) }}</span>
        </div>
        <p class="text-stone-500 text-sm mt-2">{{ priceMeta }}</p>
      </div>
    </div>

    <MediaLightbox v-model:open="lightbox.open" v-model:index="lightbox.index" :images="slides" />
  </section>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import type { Offer } from '~/domain/offer/types'
import { nearestDeparture } from '~/domain/offer/offerRules'
import MediaLightbox from './MediaLightbox.vue'

const props = defineProps<{ offer: Offer }>()

const { t } = useI18n()
const { localize, money } = useLocalizedText()
const lightbox = useLightbox()

// Hero photo first, then the gallery — one swipeable reel.
const slides = computed(() => [props.offer.hero, ...props.offer.gallery])

const active = ref(0)
function prev() {
  active.value = (active.value - 1 + slides.value.length) % slides.value.length
}
function next() {
  active.value = (active.value + 1) % slides.value.length
}

const heroImg = ref<HTMLElement | null>(null)
const { direction } = useSwipe(heroImg, {
  onSwipeEnd() {
    if (slides.value.length < 2) return
    if (direction.value === 'left') next()
    else if (direction.value === 'right') prev()
  },
})

// "per person · 7 days · 19–25 September 2026"
const priceMeta = computed(() => {
  const parts = [
    t('offerPage.perPerson'),
    `${props.offer.durationDays} ${t('offerPage.stats.days')}`,
  ]
  const nearest = nearestDeparture(props.offer.departures)
  if (nearest) parts.push(localize(nearest.label))
  return parts.join(' · ')
})
</script>

<style scoped lang="scss">
// Split hero: image beside copy on desktop, stacked on mobile.
.hero-split {
  display: flex;
}

.hero-img {
  width: 54%;
  min-height: 460px;
}

.hero-copy {
  flex: 1;
  padding: 48px 44px;
}

.hero-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #1c1917;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 6px 16px -6px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;

  &:hover {
    background: #fff;
  }
}

.group:hover .hero-arrow {
  opacity: 1;
}

@media (max-width: 767px) {
  .hero-split {
    flex-direction: column;
  }

  .hero-img {
    width: 100%;
    min-height: 260px;
    height: 260px;
  }

  .hero-copy {
    padding: 28px 22px;
  }

  .hero-title {
    font-size: 1.875rem; // 30px, matches the reference mobile size
  }

  // Touch devices have no hover — keep the arrows visible.
  .hero-arrow {
    opacity: 1;
  }
}
</style>
