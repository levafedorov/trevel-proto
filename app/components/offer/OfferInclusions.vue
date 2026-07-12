<template>
  <div v-if="items.length" class="bg-[#faf8f5] py-14 lg:py-20">
    <UContainer>
      <h2 class="font-serif text-3xl lg:text-4xl font-bold text-stone-900 mb-10">
        {{ $t('offerPage.inclusions.title') }}
      </h2>

      <div class="incl-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <!-- Included -->
        <div v-if="included.length">
          <h3 class="text-amber-700 font-semibold text-sm uppercase tracking-wide mb-4">
            {{ $t('offerPage.inclusions.included') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="(item, i) in included" :key="i" class="flex items-start gap-3">
              <span class="shrink-0 w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center mt-0.5">
                <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-white" />
              </span>
              <span class="text-stone-700">{{ localize(item.label) }}</span>
            </li>
          </ul>
        </div>

        <!-- Excluded -->
        <div v-if="excluded.length">
          <h3 class="text-stone-500 font-semibold text-sm uppercase tracking-wide mb-4">
            {{ $t('offerPage.inclusions.excluded') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="(item, i) in excluded" :key="i" class="flex items-start gap-3">
              <span class="shrink-0 w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center mt-0.5">
                <UIcon name="i-lucide-x" class="w-3.5 h-3.5 text-stone-500" />
              </span>
              <span class="text-stone-500">{{ localize(item.label) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { InclusionKind } from '~/domain/offer/types'
import type { InclusionItem } from '~/domain/offer/types'

const props = defineProps<{ items: InclusionItem[] }>()

const { localize } = useLocalizedText()

const included = computed(() => props.items.filter(i => i.kind === InclusionKind.INCLUDED))
const excluded = computed(() => props.items.filter(i => i.kind === InclusionKind.EXCLUDED))
</script>
