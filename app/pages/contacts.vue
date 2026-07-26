<template>
  <div class="pt-16">
    <!-- Page Hero -->
    <section class="relative py-28 overflow-hidden bg-amber-950">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-40"
        style="background-image: url('https://picsum.photos/seed/contacts-hero/1920/600');"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-amber-950/75 to-amber-900/35" />
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
          <!-- Address -->
          <div class="bg-white rounded-2xl p-8 text-center border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-map-pin" class="w-6 h-6 text-amber-600" />
            </div>
            <div class="text-stone-500 text-sm mb-2">{{ $t('contacts.address') }}</div>
            <div class="text-stone-900 font-semibold text-sm">Izmir, Turkey</div>
          </div>

          <!-- Phones -->
          <div class="bg-white rounded-2xl p-8 text-center border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-phone" class="w-6 h-6 text-amber-600" />
            </div>
            <div class="text-stone-500 text-sm mb-4">{{ $t('contacts.phone') }}</div>
            <div class="flex flex-col gap-4">
              <div v-for="phone in phones" :key="phone.tel">
                <a
                  :href="`tel:${phone.tel}`"
                  class="text-stone-900 font-semibold text-sm hover:text-amber-600 transition-colors"
                >
                  {{ phone.flag }} {{ phone.number }}
                </a>
                <div class="flex flex-wrap justify-center gap-1.5 mt-2">
                  <component
                    :is="app.href ? 'a' : 'span'"
                    v-for="app in phone.apps"
                    :key="app.name"
                    :href="app.href"
                    :target="app.href ? '_blank' : undefined"
                    :rel="app.href ? 'noopener' : undefined"
                    class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700"
                    :class="app.href ? 'hover:bg-amber-100 transition-colors' : ''"
                  >
                    <UIcon v-if="app.icon" :name="app.icon" class="w-3 h-3" />
                    {{ app.name }}
                  </component>
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="bg-white rounded-2xl p-8 text-center border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-lucide-mail" class="w-6 h-6 text-amber-600" />
            </div>
            <div class="text-stone-500 text-sm mb-2">{{ $t('contacts.email') }}</div>
            <a
              :href="`mailto:${email}`"
              class="text-stone-900 font-semibold text-sm hover:text-amber-600 transition-colors"
            >
              {{ email }}
            </a>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Contacts – LovEnRoute',
  description: 'Get in touch with LovEnRoute — signature tours across Turkey.',
})

const { phones, email } = useContacts()
</script>
