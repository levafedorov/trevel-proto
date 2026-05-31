<template>
  <footer class="bg-stone-900 text-stone-300">
    <UContainer>
      <div class="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-amber-500">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2C7.373 2 2 7.373 2 14s5.373 12 12 12 12-5.373 12-12S20.627 2 14 2z" fill="currentColor" fill-opacity="0.15"/>
                <path d="M14 6c-1.5 3-4 5-8 6 0 4 2 7.5 8 10 6-2.5 8-6 8-10-4-1-6.5-3-8-6z" fill="currentColor"/>
              </svg>
            </span>
            <span class="font-serif text-xl font-bold text-white">OlimpiaTour</span>
          </div>
          <p class="text-stone-400 text-sm leading-relaxed max-w-xs">
            {{ $t('footer.tagline') }}
          </p>
          <div class="flex items-center gap-3 mt-6">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.href"
              class="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-600 flex items-center justify-center transition-colors duration-200"
              :aria-label="social.name"
            >
              <UIcon :name="social.icon" class="w-4 h-4 text-stone-300" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            {{ $t('footer.quickLinks') }}
          </h4>
          <ul class="flex flex-col gap-2">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-200"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            {{ $t('footer.contact') }}
          </h4>
          <ul class="flex flex-col gap-3">
            <li class="flex items-start gap-2 text-sm text-stone-400">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
              Istiklal Caddesi 45,<br>Beyoğlu, Istanbul 34430, Turkey
            </li>
            <li class="flex items-center gap-2 text-sm text-stone-400">
              <UIcon name="i-lucide-phone" class="w-4 h-4 text-amber-500 shrink-0" />
              +90 212 123 45 67
            </li>
            <li class="flex items-center gap-2 text-sm text-stone-400">
              <UIcon name="i-lucide-mail" class="w-4 h-4 text-amber-500 shrink-0" />
              hello@olimpiatour.travel
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-stone-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-stone-500 text-sm">
          © {{ new Date().getFullYear() }} OlimpiaTour. {{ $t('footer.rights') }}
        </p>
        <p class="text-stone-600 text-xs">
          {{ $t('footer.crafted') }}
        </p>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()

const socials = [
  { name: 'Instagram', href: '#', icon: 'i-lucide-instagram' },
  { name: 'Facebook', href: '#', icon: 'i-lucide-facebook' },
  { name: 'Twitter', href: '#', icon: 'i-lucide-twitter' },
]

const quickLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/dashboard', label: t('nav.destinations') },
  { to: '/about', label: t('nav.about') },
])
</script>
