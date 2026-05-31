<template>
  <UModal v-model:open="isOpen" :title="$t('booking.title')" :description="offerName">
    <template #body>
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

      <!-- Success state -->
      <div v-else class="flex flex-col items-center text-center py-6 gap-4">
        <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-green-600" />
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
