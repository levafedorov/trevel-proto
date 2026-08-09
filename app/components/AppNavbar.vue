<template>
  <header
    :class="[
      // The bar never moves. It used to hide on scroll-down and return on
      // scroll-up (and on a timer), which meant a full-width blurred strip
      // sliding across the hero throughout normal reading — every flick sent it
      // away, every pause brought it back. No amount of thresholds made that
      // feel steady, because the movement itself was the problem.
      //
      // What is left is one boolean and one threshold. `transition` names only
      // the two cheap properties it needs: it must never cover
      // `backdrop-filter`, or changing the blur radius animates it, re-blurring
      // the strip of hero behind the bar for the whole 300ms.
      'fixed top-0 left-0 right-0 z-50 backdrop-blur-md',
      'transition-[background-color,box-shadow] duration-300',
      isScrolled ? 'bg-white/98 shadow-sm' : 'bg-white/90',
    ]"
  >
    <UContainer>
      <nav class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo. The mark is masked rather than inlined or served as <img>:
             the source SVG carries no fill, so masking lets it take the brand
             amber from `currentColor` while the 2.3KB path stays a single
             cacheable file instead of being repeated in every page's HTML.
             The wordmark is desktop-only; on mobile the mark stands alone. -->
        <NuxtLink to="/" class="flex items-center gap-2.5 shrink-0" aria-label="LovEnRoute">
          <span class="logo-mark text-amber-600" aria-hidden="true" />
          <span class="hidden sm:block font-serif text-xl font-bold text-stone-900">
            LovEnRoute
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
            @click="toggleMobileMenu"
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

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

// A named handler rather than an inline assignment: Nuxt UI types the button's
// click handler as returning void, and `a = !a` evaluates to the new boolean.
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const localeOptions = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
] as const

const navLinks = computed(() => [
  { to: '/', label: t('nav.home'), icon: 'i-lucide-home' },
  { to: '/dashboard', label: t('nav.destinations'), icon: 'i-lucide-map' },
  { to: '/about', label: t('nav.about'), icon: 'i-lucide-info' },
  { to: '/contacts', label: t('nav.contacts'), icon: 'i-lucide-phone' },
])

// Two thresholds rather than one, so a scroll position sitting exactly on the
// boundary cannot flip the background back and forth.
const SOLID_BELOW = 48
const TRANSPARENT_ABOVE = 16

const handleScroll = () => {
  const y = window.scrollY
  if (!isScrolled.value && y > SOLID_BELOW) isScrolled.value = true
  else if (isScrolled.value && y < TRANSPARENT_ABOVE) isScrolled.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
