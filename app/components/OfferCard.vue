<template>
  <NuxtLink :to="`/offers/${offer.id}`" class="group block">
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border border-stone-100 hover:border-amber-100">
      <!-- Image -->
      <div class="relative h-52 overflow-hidden">
        <img
          :src="offer.image"
          :alt="offer.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <!-- Badge -->
        <UBadge
          v-if="showStatus"
          :color="offer.active ? 'success' : 'neutral'"
          variant="solid"
          class="absolute top-3 right-3"
        >
          {{ offer.active ? $t('offers.active') : $t('offers.inactive') }}
        </UBadge>

        <!-- Category -->
        <span class="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full capitalize">
          {{ offer.category }}
        </span>
      </div>

      <!-- Content -->
      <div class="p-5">
        <h3 class="font-semibold text-stone-900 text-base mb-1 line-clamp-1 group-hover:text-amber-700 transition-colors">
          {{ offer.name }}
        </h3>

        <p class="text-stone-500 text-xs flex items-center gap-1 mb-3">
          <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-amber-500 shrink-0" />
          {{ offer.location }}
        </p>

        <p class="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {{ offer.shortDescription }}
        </p>

        <!-- Rating -->
        <div class="flex items-center gap-1 mb-4">
          <div class="flex">
            <UIcon
              v-for="n in 5"
              :key="n"
              name="i-lucide-star"
              :class="[
                'w-3.5 h-3.5',
                n <= Math.round(offer.rating) ? 'text-amber-400' : 'text-stone-200',
              ]"
            />
          </div>
          <span class="text-stone-500 text-xs ml-1">{{ offer.rating }} ({{ offer.reviewCount }})</span>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <span class="text-xl font-bold text-amber-600">€{{ offer.price.toLocaleString() }}</span>
            <span class="text-stone-400 text-xs ml-1">/ person</span>
          </div>
          <span class="text-stone-400 text-xs flex items-center gap-1">
            <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
            {{ offer.duration }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { TouristicOffer } from '~/composables/useOffers'

defineProps<{
  offer: TouristicOffer
  showStatus?: boolean
}>()
</script>
