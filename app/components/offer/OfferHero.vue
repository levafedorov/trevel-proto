<template>
  <section class="bg-[#faf8f5]">
    <div class="hero-split">
      <!-- Looping footage of the bay. Muted and inline so mobile browsers autoplay it. -->
      <div class="hero-img relative overflow-hidden">
        <video
          class="hero-video w-full h-full object-cover"
          poster="/video/izmir-bay-poster.jpg"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          :aria-label="localize(offer.hero.alt)"
        >
          <source src="/video/izmir-bay.mp4" type="video/mp4">
        </video>

        <div class="hero-wash pointer-events-none" />
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

// The footage was shot at dusk and reads dark against the cream page, so lift it and
// lay a warm light wash over it instead of the dark mask the slider used to carry.
// $wash is the one knob worth turning: higher = lighter, hazier.
// The sky is already pale (mean luma 215/255), so the lift stays mostly in the water:
// pushing the whole frame evenly blows the sunset out to flat white.
$wash: 0.16;

.hero-video {
  filter: brightness(1.03) saturate(1.04);
}

.hero-wash {
  position: absolute;
  inset: 0;
  background:
    // Strongest at the bottom, where the water meets the cream section below.
    linear-gradient(
      to top,
      rgba(250, 248, 245, $wash * 2),
      rgba(250, 248, 245, $wash * 0.4) 60%,
      rgba(250, 248, 245, 0)
    ),
    // Flat amber haze over the whole frame.
    rgba(255, 251, 235, $wash * 0.3);
}

// Autoplaying footage is motion: honour the OS preference and hold the poster instead.
@media (prefers-reduced-motion: reduce) {
  .hero-video {
    display: none;
  }

  .hero-img {
    background-image: url('/video/izmir-bay-poster.jpg');
    background-position: center;
    background-size: cover;
  }
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
}
</style>
