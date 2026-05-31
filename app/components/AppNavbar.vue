<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isVisible ? 'translate-y-0' : '-translate-y-full',
      isScrolled
        ? 'bg-white/98 backdrop-blur-md shadow-sm'
        : 'bg-white/90 backdrop-blur-sm',
    ]"
  >
    <UContainer>
      <nav class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 shrink-0">
          <span class="text-amber-600">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2C7.373 2 2 7.373 2 14s5.373 12 12 12 12-5.373 12-12S20.627 2 14 2z" fill="currentColor" fill-opacity="0.15"/>
              <path d="M14 6c-1.5 3-4 5-8 6 0 4 2 7.5 8 10 6-2.5 8-6 8-10-4-1-6.5-3-8-6z" fill="currentColor"/>
            </svg>
          </span>
          <span class="font-serif text-xl font-bold text-stone-900">
            OlimpiaTour
          </span>
        </NuxtLink>

        <!-- Desktop Links -->
        <ul class="hidden md:flex items-center gap-1">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-stone-700 hover:text-amber-600 hover:bg-amber-50',
                $route.path === link.to && 'text-amber-600 bg-amber-50',
              ]"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Right side: language switcher + CTA -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Language switcher -->
          <div class="flex items-center gap-0 bg-stone-100 rounded-lg p-1">
            <button
              v-for="loc in localeOptions"
              :key="loc.code"
              :class="[
                'px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide transition-all duration-200 cursor-pointer',
                locale === loc.code
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-800',
              ]"
              @click="setLocale(loc.code)"
            >
              {{ loc.label }}
            </button>
          </div>

          <!-- CTA -->
          <NuxtLink to="/dashboard">
            <UButton
              size="sm"
              color="primary"
              trailing-icon="i-lucide-arrow-right"
            >
              {{ $t('nav.explore') }}
            </UButton>
          </NuxtLink>
        </div>

        <!-- Mobile: lang switcher + hamburger -->
        <div class="md:hidden flex items-center gap-2">
          <div class="flex items-center gap-0 bg-stone-100 rounded-lg p-1">
            <button
              v-for="loc in localeOptions"
              :key="loc.code"
              :class="[
                'px-2 py-0.5 rounded text-xs font-semibold uppercase cursor-pointer transition-all duration-200',
                locale === loc.code
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-500',
              ]"
              @click="setLocale(loc.code)"
            >
              {{ loc.label }}
            </button>
          </div>
          <UButton
            variant="ghost"
            color="neutral"
            :icon="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="text-stone-800"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </nav>
    </UContainer>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white border-t border-stone-100 shadow-lg"
      >
        <UContainer>
          <ul class="py-4 flex flex-col gap-1">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-700 hover:text-amber-600 hover:bg-amber-50 transition-colors font-medium"
                :class="$route.path === link.to && 'text-amber-600 bg-amber-50'"
                @click="mobileMenuOpen = false"
              >
                <UIcon :name="link.icon" class="w-4 h-4" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </UContainer>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const route = useRoute()
const { isVisible } = useScrollNavbar()

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const localeOptions = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
]

const navLinks = computed(() => [
  { to: '/', label: t('nav.home'), icon: 'i-lucide-home' },
  { to: '/dashboard', label: t('nav.destinations'), icon: 'i-lucide-map' },
  { to: '/about', label: t('nav.about'), icon: 'i-lucide-info' },
])

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 40
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
