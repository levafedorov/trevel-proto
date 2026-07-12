<template>
  <section class="bg-[#faf8f5]">
    <div class="hero-split">
      <!-- Image -->
      <div class="hero-img relative">
        <img
          :src="offer.hero.src"
          :alt="localize(offer.hero.alt)"
          class="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
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
  </section>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'
import { nearestDeparture } from '~/domain/offer/offerRules'

const props = defineProps<{ offer: Offer }>()

const { t } = useI18n()
const { localize, money } = useLocalizedText()

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

@media (max-width: 767px) {
  .hero-split {
    flex-direction: column;
  }

  .hero-img {
    width: 100%;
    min-height: 220px;
    height: 220px;
  }

  .hero-copy {
    padding: 28px 22px;
  }

  .hero-title {
    font-size: 1.875rem; // 30px, matches the reference mobile size
  }
}
</style>
