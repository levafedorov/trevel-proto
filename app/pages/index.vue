<template>
  <div>
    <HeroSection />
    <AdvantagesSection />
    <RecentOffersSection />

    <!-- CTA Banner -->
    <section class="py-24 bg-amber-600 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <img
          src="https://picsum.photos/seed/cta-banner/1920/400"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
      <UContainer class="relative z-10 text-center">
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
          {{ $t('cta.title') }}
        </h2>
        <p class="text-amber-100 text-lg mb-8 max-w-lg mx-auto">
          {{ $t('cta.subtitle') }}
        </p>
        <NuxtLink to="/dashboard">
          <UButton
            size="xl"
            variant="solid"
            class="bg-white text-amber-700 hover:bg-amber-50 shadow-xl"
            trailing-icon="i-lucide-arrow-right"
          >
            {{ $t('cta.button') }}
          </UButton>
        </NuxtLink>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'OlimpiaTour – Turkey Travel Specialists',
  description: 'Handcrafted Turkey journeys — Istanbul, Cappadocia, the Aegean coast, and beyond. OlimpiaTour takes you to the real Turkey.',
  ogImage: 'https://picsum.photos/seed/wanderlux-og/1200/630',
})
</script>
