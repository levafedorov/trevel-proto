<template>
  <section class="py-24 bg-white">
    <UContainer>
      <div class="text-center mb-16">
        <p class="text-amber-600 font-medium tracking-widest text-sm uppercase mb-3">
          {{ $t('advantages.eyebrow') }}
        </p>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
          {{ $t('advantages.title') }}
        </h2>
        <p class="text-stone-500 text-lg max-w-xl mx-auto">
          {{ $t('advantages.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(item, i) in advantages"
          :key="i"
          class="group flex flex-col items-center text-center p-8 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50 transition-all duration-300"
        >
          <div class="w-16 h-16 rounded-2xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center mb-5 transition-colors duration-300">
            <UIcon :name="item.icon" class="w-7 h-7 text-amber-600" />
          </div>
          <h3 class="font-semibold text-stone-900 text-lg mb-3">{{ item.title }}</h3>
          <p class="text-stone-500 text-sm leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const advantages = computed(() => [
  {
    icon: 'i-lucide-gem',
    title: t('advantages.items.curated.title'),
    description: t('advantages.items.curated.description'),
  },
  {
    icon: 'i-lucide-users',
    title: t('advantages.items.guides.title'),
    description: t('advantages.items.guides.description'),
  },
  {
    icon: 'i-lucide-badge-percent',
    title: t('advantages.items.price.title'),
    description: t('advantages.items.price.description'),
  },
  {
    icon: 'i-lucide-headphones',
    title: t('advantages.items.support.title'),
    description: t('advantages.items.support.description'),
  },
])
</script>
