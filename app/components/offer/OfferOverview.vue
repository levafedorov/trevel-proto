<template>
  <div class="bg-[#faf8f5] py-14 lg:py-20">
    <UContainer>
      <div class="max-w-3xl">
        <h2 class="font-serif text-3xl lg:text-4xl font-bold text-stone-900 mb-6">
          {{ $t('offerPage.overview.title') }}
        </h2>
        <div class="space-y-4 text-stone-600 text-lg leading-relaxed">
          <p v-for="(paragraph, i) in paragraphs" :key="i">{{ paragraph }}</p>
        </div>
      </div>

      <div class="mt-10">
        <OfferGallery :images="offer.gallery" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { Offer } from '~/domain/offer/types'
import OfferGallery from './OfferGallery.vue'

const props = defineProps<{ offer: Offer }>()

const { localize } = useLocalizedText()

const paragraphs = computed(() => props.offer.description.map(localize))
</script>
