<template>
  <section class="relative h-screen min-h-[600px] max-h-[960px] flex items-center justify-center overflow-hidden">
    <!-- A real <img> rather than a CSS background so @nuxt/image can resize it
         and so it can be preloaded as the LCP.

         Every breakpoint is spelled out because @nuxt/image emits a srcset
         candidate per *listed* screen — a lone `xs:100vw` yields just a 320px
         image (plus its 2x), which is badly soft on a desktop. It stops at
         xxl/1536 because the source file is 1600px wide, and `densities="x1"`
         keeps it from asking for a 3072px variant that cannot exist. -->
    <NuxtImg
      src="/images/hero-aegean-bay.jpeg"
      alt=""
      format="webp"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw"
      densities="x1"
      preload
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Warm amber wash — "yellow glasses" tint instead of a dark mask -->
    <div class="absolute inset-0 bg-gradient-to-b from-amber-900/35 via-amber-800/25 to-amber-950/60" />

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
            class="!ring-white/60 !text-white hover:!bg-white/10 hover:!ring-white"
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
