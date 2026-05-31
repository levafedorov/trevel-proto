<template>
  <section class="hero-parallax-container relative h-screen min-h-[600px] max-h-[960px] flex items-center justify-center overflow-hidden">
    <!-- Parallax background -->
    <div
      class="absolute inset-0 bg-cover bg-center will-change-transform"
      :style="{
        backgroundImage: `url('https://picsum.photos/seed/turkey-istanbul-hero/1920/1080')`,
        transform: `scale(1.12) translateY(${parallaxY}px)`,
      }"
    />

    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/65" />

    <!-- Content -->
    <UContainer class="relative z-10 text-center text-white px-4">
      <p class="animate-fade-up text-amber-400 font-medium tracking-widest text-sm uppercase mb-4">
        {{ $t('hero.eyebrow') }}
      </p>

      <h1 class="animate-fade-up-delay-1 font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
        {{ $t('hero.titleLine1') }}<br>
        <em class="not-italic text-amber-400">{{ $t('hero.titleLine2') }}</em>
      </h1>

      <p class="animate-fade-up-delay-2 text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        {{ $t('hero.subtitle') }}
      </p>

      <div class="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/dashboard">
          <UButton
            size="xl"
            color="primary"
            trailing-icon="i-lucide-compass"
            class="shadow-lg shadow-amber-500/30"
          >
            {{ $t('hero.cta') }}
          </UButton>
        </NuxtLink>
        <NuxtLink to="/about">
          <UButton
            size="xl"
            variant="outline"
            class="border-white/50 text-white hover:bg-white/10 hover:border-white"
          >
            {{ $t('hero.ctaSecondary') }}
          </UButton>
        </NuxtLink>
      </div>
    </UContainer>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
      <span class="text-xs tracking-widest uppercase">{{ $t('hero.scroll') }}</span>
      <UIcon name="i-lucide-chevron-down" class="w-5 h-5" />
    </div>
  </section>
</template>

<script setup lang="ts">
const parallaxY = ref(0)

const handleScroll = () => {
  parallaxY.value = window.scrollY * 0.35
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
