<template>
  <footer class="bg-stone-800 text-stone-300">
    <UContainer>
      <div class="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2.5 mb-4">
            <span class="logo-mark text-amber-500" aria-hidden="true" />
            <span class="font-serif text-xl font-bold text-white">LovEnRoute</span>
          </div>
          <p class="text-stone-400 text-sm leading-relaxed max-w-xs">
            {{ $t('footer.tagline') }}
          </p>
          <div class="flex items-center gap-3 mt-6">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.href"
              class="w-9 h-9 rounded-full bg-stone-700 hover:bg-amber-600 flex items-center justify-center transition-colors duration-200"
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
              Izmir, Turkey
            </li>
            <li
              v-for="phone in phones"
              :key="phone.tel"
              class="flex items-start gap-2 text-sm text-stone-400"
            >
              <UIcon name="i-lucide-phone" class="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
              <span>
                <a :href="`tel:${phone.tel}`" class="hover:text-amber-400 transition-colors">
                  {{ phone.flag }} {{ phone.number }}
                </a>
                <span class="block text-stone-500 text-xs mt-0.5">
                  {{ phone.apps.map(app => app.name).join(' · ') }}
                </span>
              </span>
            </li>
            <li class="flex items-center gap-2 text-sm text-stone-400">
              <UIcon name="i-lucide-mail" class="w-4 h-4 text-amber-500 shrink-0" />
              <a :href="`mailto:${email}`" class="hover:text-amber-400 transition-colors">
                {{ email }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-stone-700 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-stone-500 text-sm">
          © {{ new Date().getFullYear() }} LovEnRoute. {{ $t('footer.rights') }}
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
const { phones, email } = useContacts()

// TODO: replace '#' with real profile / messenger links once provided.
const socials = [
  { name: 'WhatsApp', href: '#', icon: 'i-simple-icons-whatsapp' },
  { name: 'Telegram', href: '#', icon: 'i-simple-icons-telegram' },
  { name: 'Instagram', href: '#', icon: 'i-lucide-instagram' },
  { name: 'Facebook', href: '#', icon: 'i-lucide-facebook' },
]

const quickLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/dashboard', label: t('nav.destinations') },
  { to: '/about', label: t('nav.about') },
  { to: '/contacts', label: t('nav.contacts') },
])
</script>
