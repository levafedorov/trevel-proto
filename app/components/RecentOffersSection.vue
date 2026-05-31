<template>
  <section class="py-24 bg-stone-50">
    <UContainer>
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
        <div>
          <p class="text-amber-600 font-medium tracking-widest text-sm uppercase mb-3">
            {{ $t('offers.eyebrow') }}
          </p>
          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-stone-900">
            {{ $t('offers.title') }}
          </h2>
        </div>
        <NuxtLink to="/dashboard">
          <UButton variant="ghost" color="neutral" trailing-icon="i-lucide-arrow-right">
            {{ $t('offers.viewAll') }}
          </UButton>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <OfferCard
          v-for="offer in recentOffers"
          :key="offer.id"
          :offer="offer"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { recentOffers } = useOffers()
</script>
