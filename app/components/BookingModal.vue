<template>
  <UModal v-model:open="isOpen" :title="$t('booking.title')" :description="offerName">
    <template #body>
      <!--
        Booking form is switched off for now — enquiries come in by messenger
        instead. Kept here (and the submit logic below) so it can be turned back
        on without rewriting anything. Success state follows in the next block.
      -->
      <!--
      <div v-if="!submitted">
        <UForm
          :schema="schema"
          :state="state"
          class="flex flex-col gap-5"
          @submit="onSubmit"
        >
          <UFormField
            name="name"
            :label="$t('booking.nameLabel')"
            required
          >
            <UInput
              v-model="state.name"
              :placeholder="$t('booking.namePlaceholder')"
              size="lg"
              leading-icon="i-lucide-user"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="email"
            :label="$t('booking.emailLabel')"
            required
          >
            <UInput
              v-model="state.email"
              type="email"
              :placeholder="$t('booking.emailPlaceholder')"
              size="lg"
              leading-icon="i-lucide-mail"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            size="lg"
            color="primary"
            block
            :loading="isSubmitting"
            :disabled="isSubmitting"
            trailing-icon="i-lucide-send"
            class="mt-2"
          >
            {{ isSubmitting ? $t('booking.submitting') : $t('booking.submit') }}
          </UButton>
        </UForm>

        <p class="text-xs text-stone-400 text-center mt-4">
          {{ $t('booking.disclaimer') }}
        </p>
      </div>
      -->

      <!-- Success state, paired with the form above. -->
      <!--
      <div v-else class="flex flex-col items-center text-center py-6 gap-4">
        <div class="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
          <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-amber-600" />
        </div>
        <h3 class="font-serif text-2xl font-bold text-stone-900">
          {{ $t('booking.successTitle') }}
        </h3>
        <p class="text-stone-500 text-sm max-w-xs leading-relaxed">
          {{ $t('booking.successMessage', { email: state.email }) }}
        </p>
        <UButton size="lg" color="primary" variant="outline" @click="closeModal">
          {{ $t('booking.successClose') }}
        </UButton>
      </div>
      -->

      <div class="flex flex-col items-center text-center gap-5 pb-1">
        <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
          <UIcon name="i-lucide-message-circle" class="w-7 h-7 text-amber-600" />
        </div>

        <div>
          <h3 class="font-serif text-2xl font-bold text-stone-900">
            {{ $t('booking.enquiry.title') }}
          </h3>
          <p class="text-stone-600 text-sm leading-relaxed mt-2 max-w-sm mx-auto">
            {{ $t('booking.enquiry.lead') }}
          </p>
        </div>

        <p class="text-stone-500 text-xs uppercase tracking-wider font-medium">
          {{ $t('booking.enquiry.channels') }}
        </p>

        <div class="w-full flex flex-col gap-2.5">
          <div
            v-for="phone in phones"
            :key="phone.tel"
            class="rounded-xl border border-stone-200 bg-[#faf8f5] px-4 py-3 hover:border-amber-300 transition-colors"
          >
            <a
              :href="`tel:${phone.tel}`"
              class="flex items-center justify-center gap-2.5 font-semibold text-stone-900 hover:text-amber-700 transition-colors"
            >
              <span class="text-lg leading-none">{{ phone.flag }}</span>
              {{ phone.number }}
            </a>
            <div class="flex flex-wrap justify-center gap-1.5 mt-2">
              <component
                :is="app.href ? 'a' : 'span'"
                v-for="app in phone.apps"
                :key="app.name"
                :href="app.href"
                :target="app.href ? '_blank' : undefined"
                rel="noopener"
                class="inline-flex items-center gap-1 text-xs text-stone-500 bg-white border border-stone-200 rounded-full px-2 py-0.5"
                :class="app.href ? 'hover:border-amber-300 hover:text-amber-700 transition-colors' : ''"
              >
                <UIcon v-if="app.icon" :name="app.icon" class="w-3 h-3" />
                {{ app.name }}
              </component>
            </div>
          </div>

          <a
            :href="`mailto:${email}`"
            class="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-[#faf8f5] px-4 py-3 text-stone-900 font-semibold hover:border-amber-300 hover:text-amber-700 transition-colors"
          >
            <UIcon name="i-lucide-mail" class="w-4 h-4 text-amber-600" />
            {{ email }}
          </a>
        </div>

        <p class="text-xs text-stone-400 max-w-xs leading-relaxed">
          {{ $t('booking.enquiry.response') }}
        </p>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'

const props = defineProps<{
  offerId: string
  offerName: string
}>()

const isOpen = defineModel<boolean>('open', { default: false })

const { t } = useI18n()
const toast = useToast()
const { createBooking } = useMockDatabase()
const { phones, email } = useContacts()

const schema = z.object({
  name: z.string().min(2, t('booking.validation.nameMin')),
  email: z.string().email(t('booking.validation.emailInvalid')),
})

const state = reactive({
  name: '',
  email: '',
})

const isSubmitting = ref(false)
const submitted = ref(false)

async function onSubmit() {
  isSubmitting.value = true
  try {
    await createBooking({
      offerId: props.offerId,
      offerName: props.offerName,
      name: state.name,
      email: state.email,
    })
    submitted.value = true
  }
  catch {
    toast.add({
      title: t('booking.errorTitle'),
      description: t('booking.errorMessage'),
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  }
  finally {
    isSubmitting.value = false
  }
}

function closeModal() {
  isOpen.value = false
  setTimeout(() => {
    submitted.value = false
    state.name = ''
    state.email = ''
  }, 300)
}

watch(isOpen, (val) => {
  if (!val) closeModal()
})
</script>
