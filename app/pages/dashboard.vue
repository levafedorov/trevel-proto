<template>
  <div class="pt-20 min-h-screen bg-stone-50">
    <!-- Page Header -->
    <div class="bg-white border-b border-stone-100">
      <UContainer class="py-10">
        <p class="text-amber-600 font-medium tracking-widest text-sm uppercase mb-2">
          {{ $t('dashboard.eyebrow') }}
        </p>
        <h1 class="font-serif text-4xl lg:text-5xl font-bold text-stone-900 mb-3">
          {{ $t('dashboard.title') }}
        </h1>
        <p class="text-stone-500 text-lg">{{ $t('dashboard.subtitle') }}</p>
      </UContainer>
    </div>

    <UContainer class="py-12">
      <!-- Filter bar -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div class="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-sm border border-stone-100">
          <UButton
            v-for="filter in filters"
            :key="filter.value"
            :variant="activeFilter === filter.value ? 'solid' : 'ghost'"
            :color="activeFilter === filter.value ? 'primary' : 'neutral'"
            size="sm"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
            <UBadge
              :color="activeFilter === filter.value ? 'primary' : 'neutral'"
              variant="subtle"
              class="ml-1.5"
            >
              {{ filter.count }}
            </UBadge>
          </UButton>
        </div>

        <!-- Category filter -->
        <div class="flex items-center gap-2 flex-wrap">
          <UButton
            v-for="cat in categories"
            :key="cat.value"
            size="xs"
            :variant="activeCategory === cat.value ? 'solid' : 'outline'"
            :color="activeCategory === cat.value ? 'primary' : 'neutral'"
            @click="activeCategory = cat.value"
          >
            {{ cat.label }}
          </UButton>
        </div>
      </div>

      <!-- Offers Grid -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        mode="out-in"
      >
        <div v-if="filteredOffers.length" :key="activeFilter + activeCategory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <OfferCard
            v-for="offer in filteredOffers"
            :key="offer.id"
            :offer="offer"
            show-status
          />
        </div>

        <div v-else :key="'empty'" class="py-24 text-center">
          <UIcon name="i-lucide-search-x" class="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <p class="text-stone-500 text-lg font-medium mb-2">{{ $t('dashboard.noResults') }}</p>
          <p class="text-stone-400 text-sm">{{ $t('dashboard.noResultsHint') }}</p>
          <UButton variant="ghost" color="neutral" class="mt-4" @click="resetFilters">
            {{ $t('dashboard.resetFilters') }}
          </UButton>
        </div>
      </Transition>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { offers } = useOffers()

useSeoMeta({
  title: 'All Turkey Tours – OlimpiaTour',
  description: 'Browse our full collection of handcrafted Turkey travel experiences — Istanbul, Cappadocia, Antalya, and more.',
})

const activeFilter = ref<'all' | 'active' | 'inactive'>('all')
const activeCategory = ref<string>('all')

const filters = computed(() => [
  { value: 'all', label: t('dashboard.filterAll'), count: offers.length },
  { value: 'active', label: t('dashboard.filterActive'), count: offers.filter(o => o.active).length },
  { value: 'inactive', label: t('dashboard.filterInactive'), count: offers.filter(o => !o.active).length },
])

const categories = computed(() => {
  const cats = [...new Set(offers.map(o => o.category))]
  return [
    { value: 'all', label: t('dashboard.catAll') },
    ...cats.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) })),
  ]
})

const filteredOffers = computed(() => {
  let result = [...offers]

  if (activeFilter.value === 'active') result = result.filter(o => o.active)
  if (activeFilter.value === 'inactive') result = result.filter(o => !o.active)
  if (activeCategory.value !== 'all') result = result.filter(o => o.category === activeCategory.value)

  return result
})

function resetFilters() {
  activeFilter.value = 'all'
  activeCategory.value = 'all'
}
</script>
