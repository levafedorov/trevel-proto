<template>
  <div class="min-h-[70vh] flex items-center justify-center px-6">
    <div class="text-center max-w-md">
      <UIcon name="i-lucide-triangle-alert" class="w-16 h-16 text-amber-400 mx-auto mb-5" />
      <h1 class="font-serif text-3xl font-bold text-stone-800 mb-3">
        {{ $t('offerPage.states.error.title') }}
      </h1>
      <p class="text-stone-500 mb-8">
        {{ $t('offerPage.states.error.subtitle') }}
      </p>
      <UButton color="primary" size="lg" icon="i-lucide-rotate-cw" @click="emit('retry')">
        {{ $t('offerPage.states.error.retry') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// Shown on a fetch failure; retry re-runs the loader.
const emit = defineEmits<{ retry: [] }>()
</script>
