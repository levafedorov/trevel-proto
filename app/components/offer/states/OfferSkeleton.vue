<template>
  <div class="animate-pulse" aria-hidden="true">
    <!-- Hero -->
    <div class="h-[42vh] min-h-72 bg-stone-200" />

    <UContainer class="py-10">
      <!-- Stats row -->
      <div class="flex flex-wrap gap-8 mb-12">
        <div v-for="n in 4" :key="n" class="h-12 w-24 rounded-lg bg-stone-200" />
      </div>

      <!-- Body -->
      <div class="max-w-2xl space-y-4">
        <div class="h-7 w-64 rounded bg-stone-200" />
        <div class="h-4 w-full rounded bg-stone-200" />
        <div class="h-4 w-full rounded bg-stone-200" />
        <div class="h-4 w-3/4 rounded bg-stone-200" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        <div v-for="n in 3" :key="n" class="h-40 rounded-xl bg-stone-200" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
// Loading placeholder for the offer detail page (pending state).
</script>
