import type { MaybeRefOrGetter } from 'vue'
import { resolveBookingState } from '~/domain/offer/offerRules'
import type { Availability } from '~/domain/offer/types'

/**
 * Reactive booking CTA state derived from an offer's availability: the resolved
 * label (via i18n), whether the CTA is disabled, and the booking mode.
 */
export function useBookingState(availability: MaybeRefOrGetter<Availability>) {
  const { t } = useI18n()

  const state = computed(() => resolveBookingState(toValue(availability)))
  const label = computed(() => t(state.value.labelKey))
  const disabled = computed(() => state.value.disabled)
  const mode = computed(() => state.value.mode)

  return { state, label, disabled, mode }
}
