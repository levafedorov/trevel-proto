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
        <h1 class="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 max-w-lg">
          {{ $t('about.heroTitle') }}
        </h1>
        <p class="text-stone-300 text-lg max-w-md">
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

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-stone-100">
              <div v-for="stat in stats" :key="stat.label" class="text-center">
                <div class="font-serif text-3xl font-bold text-amber-600 mb-1">{{ stat.value }}</div>
                <div class="text-stone-500 text-xs">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Manager photo -->
          <div class="flex flex-col items-center lg:items-start">
            <div class="relative">
              <div class="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://picsum.photos/seed/manager-portrait/640/800"
                  alt="Sophie Laurent"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute -bottom-6 -left-6 bg-amber-600 text-white rounded-2xl p-5 shadow-xl">
                <div class="font-serif text-lg font-bold">Sophie Laurent</div>
                <div class="text-amber-200 text-sm">CEO & Head of Experiences</div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Contacts section -->
    <section class="py-24 bg-stone-50">
      <UContainer>
        <div class="text-center mb-14">
          <p class="text-amber-600 font-medium tracking-widest text-sm uppercase mb-3">
            {{ $t('about.contactEyebrow') }}
          </p>
          <h2 class="font-serif text-4xl font-bold text-stone-900">
            {{ $t('about.contactTitle') }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div
            v-for="contact in contacts"
            :key="contact.label"
            class="bg-white rounded-2xl p-8 text-center border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
          >
            <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <UIcon :name="contact.icon" class="w-6 h-6 text-amber-600" />
            </div>
            <div class="text-stone-500 text-sm mb-2">{{ contact.label }}</div>
            <div class="text-stone-900 font-semibold text-sm">{{ contact.value }}</div>
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
  description: 'Learn about OlimpiaTour — Turkey travel specialists dedicated to showing the world what Turkey truly is.',
})

const stats = computed(() => [
  { value: '10+', label: t('about.statsYears') },
  { value: '4.8★', label: t('about.statsRating') },
  { value: '1200+', label: t('about.statsClients') },
])

const contacts = computed(() => [
  {
    icon: 'i-lucide-map-pin',
    label: t('about.contactAddress'),
    value: 'Istiklal Caddesi 45, Beyoğlu, Istanbul',
  },
  {
    icon: 'i-lucide-phone',
    label: t('about.contactPhone'),
    value: '+90 212 123 45 67',
  },
  {
    icon: 'i-lucide-mail',
    label: t('about.contactEmail'),
    value: 'hello@olimpiatour.travel',
  },
])
</script>
