<template>
  <NuxtLink :to="`/offers/${offer.slug}`" class="group block">
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border border-stone-100 hover:border-amber-100">
      <!-- Image -->
      <div class="relative h-52 overflow-hidden">
        <NuxtImg
          :src="offer.heroImage.src"
          :alt="localize(offer.heroImage.alt)"
          format="webp"
          sizes="xs:100vw sm:50vw md:33vw lg:400px"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <!-- Availability badge -->
        <UBadge
          v-if="showStatus"
          :color="isActive ? 'primary' : 'neutral'"
          variant="solid"
          class="absolute top-3 right-3"
        >
          {{ isActive ? $t('offers.active') : $t('offers.inactive') }}
        </UBadge>
      </div>

      <!-- Content -->
      <div class="p-5">
        <h3 class="font-semibold text-stone-900 text-base mb-1 line-clamp-1 group-hover:text-amber-700 transition-colors">
          {{ localize(offer.title) }}
        </h3>

        <p class="text-stone-500 text-xs flex items-center gap-1 mb-3">
          <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-amber-500 shrink-0" />
          {{ localize(offer.location) }}
        </p>

        <p class="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {{ localize(offer.shortDescription) }}
        </p>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <span class="text-xl font-bold text-amber-600">{{ money(offer.priceFrom) }}</span>
            <span class="text-stone-400 text-xs ml-1">/ {{ $t('offerPage.perPerson') }}</span>
          </div>
          <span class="text-stone-400 text-xs flex items-center gap-1">
            <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
            {{ offer.durationDays }} {{ $t('offerPage.stats.days') }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Availability } from '~/domain/offer/types'
import type { OfferSummary } from '~/domain/offer/types'

const props = defineProps<{
  offer: OfferSummary
  showStatus?: boolean
}>()

const { localize, money } = useLocalizedText()

const isActive = computed(() => props.offer.availability === Availability.ACTIVE)
</script>
