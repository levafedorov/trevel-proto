<template>
  <section class="bg-[#faf8f5] border-y border-stone-200/70">
    <UContainer>
      <div class="stats flex flex-wrap gap-x-10 gap-y-5 py-6">
        <div v-for="(stat, i) in stats" :key="i" class="flex items-center gap-3">
          <span class="font-serif text-3xl font-bold text-amber-600 leading-none">{{ stat.value }}</span>
          <span class="text-stone-500 text-sm leading-tight">{{ stat.label }}</span>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'

const props = defineProps<{ offer: Offer }>()

const { t } = useI18n()

const stats = computed(() => [
  { value: props.offer.durationDays, label: t('offerPage.stats.days') },
  { value: props.offer.excursions, label: t('offerPage.stats.excursions') },
  { value: props.offer.rating, label: t('offerPage.stats.reviews', { count: props.offer.reviewCount }) },
  { value: props.offer.guideLanguage, label: t('offerPage.stats.guide') },
])
</script>
