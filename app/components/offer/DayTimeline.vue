<template>
  <ol class="flex flex-col gap-4">
    <li v-for="(entry, i) in entries" :key="i" class="flex gap-3">
      <span class="shrink-0 mt-0.5 min-w-14 text-center text-xs font-semibold text-amber-700 bg-amber-50 rounded-md px-2 py-1 h-fit">
        {{ localize(entry.time) }}
      </span>
      <p class="text-stone-600 text-sm leading-relaxed">{{ localize(entry.text) }}</p>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { TimelineEntry } from '~/domain/offer/types'

defineProps<{ entries: TimelineEntry[] }>()

const { localize } = useLocalizedText()
</script>
