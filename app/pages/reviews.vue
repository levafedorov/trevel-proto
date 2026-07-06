<template>
  <div class="pt-16">
    <!-- Page Hero -->
    <section class="relative py-28 overflow-hidden bg-stone-900">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-30"
        style="background-image: url('https://picsum.photos/seed/reviews-hero/1920/600');"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-900/40" />
      <UContainer class="relative z-10">
        <p class="text-amber-400 font-medium tracking-widest text-sm uppercase mb-4">
          {{ $t('reviews.eyebrow') }}
        </p>
        <h1 class="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 max-w-xl">
          {{ $t('reviews.title') }}
        </h1>
        <p class="text-stone-300 text-lg max-w-xl">
          {{ $t('reviews.subtitle') }}
        </p>
      </UContainer>
    </section>

    <!-- Reviews grid -->
    <section class="py-24 bg-white">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="review in reviews"
            :key="review.key"
            class="flex flex-col p-8 rounded-2xl bg-stone-50 border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex mb-4">
              <UIcon
                v-for="n in 5"
                :key="n"
                name="i-lucide-star"
                class="w-4 h-4 text-amber-400"
              />
            </div>
            <p class="text-stone-600 leading-relaxed flex-1 mb-6">«{{ review.text }}»</p>
            <div>
              <div class="font-semibold text-stone-900 text-sm">{{ review.name }}</div>
              <div class="text-stone-400 text-xs">{{ review.location }}</div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Reviews – OlimpiaTour',
  description: 'What our guests say about their signature journeys across Turkey.',
})

// Placeholder testimonials — replace with real guest reviews when available.
const reviews = computed(() =>
  ['one', 'two', 'three'].map(key => ({
    key,
    name: t(`reviews.items.${key}.name`),
    location: t(`reviews.items.${key}.location`),
    text: t(`reviews.items.${key}.text`),
  })),
)
</script>
