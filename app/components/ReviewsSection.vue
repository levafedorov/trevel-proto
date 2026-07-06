<template>
  <section id="reviews" class="py-24 bg-white scroll-mt-24">
    <UContainer>
      <div class="text-center mb-14">
        <p class="text-amber-600 font-medium tracking-widest text-sm uppercase mb-3">
          {{ $t('reviews.eyebrow') }}
        </p>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
          {{ $t('reviews.title') }}
        </h2>
        <p class="text-stone-500 text-lg max-w-xl mx-auto">
          {{ $t('reviews.subtitle') }}
        </p>
      </div>

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
</template>

<script setup lang="ts">
const { t } = useI18n()

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
