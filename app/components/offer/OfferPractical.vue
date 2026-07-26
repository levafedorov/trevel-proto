<template>
  <div v-if="items.length" class="bg-white py-14 lg:py-20 border-t border-stone-100">
    <UContainer>
      <h2 class="font-serif text-3xl lg:text-4xl font-bold text-stone-900 mb-8">
        {{ $t('offerPage.practical.title') }}
      </h2>

      <div v-if="notes?.length" class="space-y-3 text-stone-600 text-lg leading-relaxed max-w-3xl mb-8 -mt-2">
        <p v-for="(note, i) in notes" :key="i">{{ localize(note) }}</p>
      </div>

      <div class="flex flex-wrap gap-3">
        <span
          v-for="(item, i) in items"
          :key="i"
          class="inline-flex items-center gap-2.5 bg-[#faf8f5] border border-stone-200 rounded-full px-4 py-2.5 text-stone-700"
        >
          <span class="text-lg leading-none" aria-hidden="true">{{ item.icon }}</span>
          {{ localize(item.label) }}
        </span>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { LocalizedText, PracticalItem } from '~/domain/offer/types'

defineProps<{ items: PracticalItem[], notes?: LocalizedText[] }>()

const { localize } = useLocalizedText()
</script>
