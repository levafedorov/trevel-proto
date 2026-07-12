import type { InjectionKey, Ref } from 'vue'

interface BookingControls {
  isOpen: Ref<boolean>
  open: () => void
}

const KEY: InjectionKey<BookingControls> = Symbol('offer-booking')

/**
 * Booking-modal control shared across the offer subtree. `OfferLayout` provides
 * it; the sub-nav CTA, departures card and mobile booking bar all open the same
 * modal through it — no prop drilling.
 */
export function provideOfferBooking(): BookingControls {
  const isOpen = ref(false)
  const controls: BookingControls = { isOpen, open: () => { isOpen.value = true } }
  provide(KEY, controls)
  return controls
}

export function useOfferBooking(): BookingControls {
  return inject(KEY, { isOpen: ref(false), open: () => {} })
}
