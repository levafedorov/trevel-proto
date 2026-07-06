<template>
  <div class="pt-16">
    <!-- Page Hero -->
    <section class="relative py-28 overflow-hidden bg-stone-900">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-30"
        style="background-image: url('https://picsum.photos/seed/contacts-hero/1920/600');"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-900/40" />
      <UContainer class="relative z-10">
        <p class="text-amber-400 font-medium tracking-widest text-sm uppercase mb-4">
          {{ $t('contacts.eyebrow') }}
        </p>
        <h1 class="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 max-w-xl">
          {{ $t('contacts.title') }}
        </h1>
        <p class="text-stone-300 text-lg max-w-xl">
          {{ $t('contacts.subtitle') }}
        </p>
      </UContainer>
    </section>

    <!-- Contact cards -->
    <section class="py-24 bg-stone-50">
      <UContainer>
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
  title: 'Contacts – OlimpiaTour',
  description: 'Get in touch with OlimpiaTour — signature tours across Turkey.',
})

// TODO: replace with real contact details once provided.
const contacts = computed(() => [
  {
    icon: 'i-lucide-map-pin',
    label: t('contacts.address'),
    value: 'Izmir, Turkey',
  },
  {
    icon: 'i-lucide-phone',
    label: t('contacts.phone'),
    value: '+90 000 000 00 00',
  },
  {
    icon: 'i-lucide-mail',
    label: t('contacts.email'),
    value: 'hello@olimpiatour.travel',
  },
])
</script>
