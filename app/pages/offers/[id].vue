<template>
  <div class="pt-16">
    <!-- 404 state -->
    <div v-if="!offer" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <UIcon name="i-lucide-map-x" class="w-20 h-20 text-stone-300 mx-auto mb-4" />
        <h1 class="font-serif text-3xl font-bold text-stone-800 mb-2">{{ $t('offerPage.notFound') }}</h1>
        <NuxtLink to="/dashboard">
          <UButton color="primary">{{ $t('offerPage.backToDashboard') }}</UButton>
        </NuxtLink>
      </div>
    </div>

    <template v-else>
      <!-- Hero image -->
      <section class="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          :src="offer.image"
          :alt="offer.name"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />

        <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <UContainer>
            <div class="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 mb-3">
                  <UBadge :color="offer.active ? 'success' : 'neutral'" variant="solid">
                    {{ offer.active ? $t('offers.active') : $t('offers.inactive') }}
                  </UBadge>
                  <span class="bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full capitalize">
                    {{ offer.category }}
                  </span>
                </div>
                <h1 class="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                  {{ offer.name }}
                </h1>
                <p class="text-white/80 flex items-center gap-1.5 mt-2 text-lg">
                  <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-amber-400" />
                  {{ offer.location }}
                </p>
              </div>

              <div class="text-right">
                <div class="text-4xl font-bold text-white font-serif">
                  €{{ offer.price.toLocaleString() }}
                </div>
                <div class="text-white/60 text-sm">per person</div>
              </div>
            </div>
          </UContainer>
        </div>
      </section>

      <!-- Content -->
      <section class="py-16 bg-white">
        <UContainer>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Main content -->
            <div class="lg:col-span-2">
              <!-- Meta info row -->
              <div class="flex flex-wrap gap-6 pb-8 mb-8 border-b border-stone-100">
                <div class="flex items-center gap-2 text-stone-600">
                  <UIcon name="i-lucide-clock" class="w-5 h-5 text-amber-500" />
                  <span class="font-medium">{{ offer.duration }}</span>
                </div>
                <div class="flex items-center gap-2 text-stone-600">
                  <div class="flex">
                    <UIcon
                      v-for="n in 5"
                      :key="n"
                      name="i-lucide-star"
                      :class="['w-4 h-4', n <= Math.round(offer.rating) ? 'text-amber-400' : 'text-stone-200']"
                    />
                  </div>
                  <span class="font-medium">{{ offer.rating }}</span>
                  <span class="text-stone-400 text-sm">({{ offer.reviewCount }} reviews)</span>
                </div>
              </div>

              <!-- Description -->
              <h2 class="font-serif text-2xl font-bold text-stone-900 mb-4">
                {{ $t('offerPage.aboutTrip') }}
              </h2>
              <div class="text-stone-600 leading-relaxed space-y-4">
                <p v-for="(paragraph, i) in descriptionParagraphs" :key="i">{{ paragraph }}</p>
              </div>

              <!-- Highlights -->
              <div class="mt-12">
                <h3 class="font-serif text-xl font-bold text-stone-900 mb-6">
                  {{ $t('offerPage.highlights') }}
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    v-for="(highlight, i) in offer.highlights"
                    :key="i"
                    class="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100"
                  >
                    <div class="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
                      <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-white" />
                    </div>
                    <span class="text-stone-700 text-sm font-medium">{{ highlight }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar / Booking card -->
            <div class="lg:col-span-1">
              <div class="sticky top-24 bg-stone-50 rounded-2xl border border-stone-200 p-7 shadow-lg">
                <div class="text-center mb-6">
                  <div class="font-serif text-4xl font-bold text-stone-900 mb-1">
                    €{{ offer.price.toLocaleString() }}
                  </div>
                  <div class="text-stone-500 text-sm">per person · {{ offer.duration }}</div>
                </div>

                <USeparator class="mb-6" />

                <ul class="flex flex-col gap-3 mb-8 text-sm text-stone-600">
                  <li class="flex items-center gap-2">
                    <UIcon name="i-lucide-plane" class="w-4 h-4 text-amber-500 shrink-0" />
                    {{ $t('offerPage.includes.flights') }}
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon name="i-lucide-hotel" class="w-4 h-4 text-amber-500 shrink-0" />
                    {{ $t('offerPage.includes.hotel') }}
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon name="i-lucide-users" class="w-4 h-4 text-amber-500 shrink-0" />
                    {{ $t('offerPage.includes.guide') }}
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-amber-500 shrink-0" />
                    {{ $t('offerPage.includes.insurance') }}
                  </li>
                </ul>

                <UButton
                  size="xl"
                  color="primary"
                  block
                  trailing-icon="i-lucide-heart"
                  :disabled="!offer.active"
                  class="shadow-lg shadow-amber-500/20"
                  @click="bookingOpen = true"
                >
                  {{ offer.active ? $t('offerPage.iAmIn') : $t('offerPage.unavailable') }}
                </UButton>

                <p v-if="!offer.active" class="text-center text-stone-400 text-xs mt-3">
                  {{ $t('offerPage.unavailableHint') }}
                </p>
                <p v-else class="text-center text-stone-400 text-xs mt-3">
                  {{ $t('offerPage.noCommitment') }}
                </p>
              </div>
            </div>
          </div>
        </UContainer>
      </section>
    </template>

    <!-- Booking Modal -->
    <BookingModal
      v-if="offer"
      v-model:open="bookingOpen"
      :offer-id="offer.id"
      :offer-name="offer.name"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getOfferById } = useOffers()

const offer = computed(() => getOfferById(String(route.params.id)))

const descriptionParagraphs = computed(() =>
  offer.value?.description.split('\n\n').filter(Boolean) ?? []
)

const bookingOpen = ref(false)

useSeoMeta({
  title: computed(() => offer.value ? `${offer.value.name} – WanderLux` : 'Offer – WanderLux'),
  description: computed(() => offer.value?.shortDescription ?? ''),
  ogImage: computed(() => offer.value?.image ?? ''),
})
</script>
