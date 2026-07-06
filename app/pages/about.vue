<template>
  <div class="pt-16">
    <!-- Page Hero -->
    <section class="relative py-28 overflow-hidden bg-stone-900">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-30"
        style="background-image: url('https://picsum.photos/seed/about-hero/1920/600');"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-900/40" />
      <UContainer class="relative z-10">
        <p class="text-amber-400 font-medium tracking-widest text-sm uppercase mb-4">
          {{ $t('about.eyebrow') }}
        </p>
        <h1 class="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 max-w-xl">
          {{ $t('about.heroTitle') }}
        </h1>
        <p class="text-stone-300 text-lg max-w-xl">
          {{ $t('about.heroSubtitle') }}
        </p>
      </UContainer>
    </section>

    <!-- Story section -->
    <section class="py-24 bg-white">
      <UContainer>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p class="text-amber-600 font-medium tracking-widest text-sm uppercase mb-4">
              {{ $t('about.storyEyebrow') }}
            </p>
            <h2 class="font-serif text-4xl font-bold text-stone-900 mb-6">
              {{ $t('about.storyTitle') }}
            </h2>
            <div class="prose prose-stone text-stone-600 leading-relaxed space-y-4">
              <p>{{ $t('about.storyParagraph1') }}</p>
              <p>{{ $t('about.storyParagraph2') }}</p>
              <p>{{ $t('about.storyParagraph3') }}</p>
            </div>

            <!-- Signature quote -->
            <blockquote class="mt-10 pt-8 border-t border-stone-100 font-serif text-2xl text-stone-900 italic leading-snug">
              «{{ $t('about.quote') }}»
            </blockquote>
          </div>

          <!-- Manager photo -->
          <div class="flex flex-col items-center lg:items-start">
            <div class="relative">
              <div class="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://picsum.photos/seed/manager-portrait/640/800"
                  :alt="$t('about.managerName')"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute -bottom-6 -left-6 bg-amber-600 text-white rounded-2xl p-5 shadow-xl">
                <div class="font-serif text-lg font-bold">{{ $t('about.managerName') }}</div>
                <div class="text-amber-200 text-sm">{{ $t('about.managerRole') }}</div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Philosophy section -->
    <section class="py-24 bg-stone-900 text-white overflow-hidden relative">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-15"
        style="background-image: url('https://picsum.photos/seed/turkey-philosophy/1920/700');"
      />
      <UContainer class="relative z-10 text-center max-w-3xl">
        <p class="text-amber-400 font-medium tracking-widest text-sm uppercase mb-4">
          {{ $t('about.philosophyEyebrow') }}
        </p>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold mb-6">
          {{ $t('about.philosophyTitle') }}
        </h2>
        <p class="text-stone-300 text-lg lg:text-xl leading-relaxed">
          {{ $t('about.philosophyText') }}
        </p>
      </UContainer>
    </section>

    <!-- Values section -->
    <section class="py-24 bg-white">
      <UContainer>
        <div class="text-center mb-14">
          <p class="text-amber-600 font-medium tracking-widest text-sm uppercase mb-3">
            {{ $t('about.valuesEyebrow') }}
          </p>
          <h2 class="font-serif text-4xl font-bold text-stone-900">
            {{ $t('about.valuesTitle') }}
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          <div
            v-for="value in values"
            :key="value.key"
            class="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
          >
            <div class="text-4xl mb-4">{{ value.emoji }}</div>
            <div class="text-stone-700 text-sm font-semibold leading-snug">{{ value.label }}</div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'About Us – OlimpiaTour',
  description: 'Learn about OlimpiaTour — signature tours across Turkey, from someone who truly lives this country.',
})

// Emoji are language-neutral and live here; only the label text is translated.
const values = computed(() => [
  { key: 'soul', emoji: '🌿', label: t('about.values.soul') },
  { key: 'authentic', emoji: '🫒', label: t('about.values.authentic') },
  { key: 'comfort', emoji: '☀️', label: t('about.values.comfort') },
  { key: 'care', emoji: '💙', label: t('about.values.care') },
  { key: 'hidden', emoji: '🌊', label: t('about.values.hidden') },
])
</script>
