<template>
  <div class="min-h-[70vh] flex items-center justify-center px-6">
    <div class="text-center max-w-md">
      <UIcon name="i-lucide-map-pin-off" class="w-16 h-16 text-stone-300 mx-auto mb-5" />
      <h1 class="font-serif text-3xl font-bold text-stone-800 mb-3">
        {{ $t('offerPage.states.notFound.title') }}
      </h1>
      <p class="text-stone-500 mb-8">
        {{ $t('offerPage.states.notFound.subtitle') }}
      </p>
      <UButton to="/dashboard" color="primary" size="lg" icon="i-lucide-arrow-left">
        {{ $t('offerPage.states.notFound.back') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// Shown when the slug does not resolve to a tour (404).
</script>
