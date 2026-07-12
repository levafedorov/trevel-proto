/**
 * Pure business rules for offers. No Vue / i18n here — these functions return
 * data and i18n keys; the presentation layer resolves the keys to text.
 */
import { Availability, DepartureStatus } from './types'
import type { Departure, LocalizedText, Money } from './types'

export type BookingMode = 'BOOK' | 'COMING_SOON' | 'WAITLIST'

export interface BookingState {
  mode: BookingMode
  disabled: boolean
  /** i18n key under `offerPage.*` for the CTA label. */
  labelKey: string
}

/** Map overall availability to how the booking CTA should behave. */
export function resolveBookingState(availability: Availability): BookingState {
  switch (availability) {
    case Availability.ACTIVE:
      return { mode: 'BOOK', disabled: false, labelKey: 'offerPage.cta.book' }
    case Availability.SOLD_OUT:
      return { mode: 'WAITLIST', disabled: false, labelKey: 'offerPage.cta.waitlist' }
    case Availability.COMING_SOON:
    case Availability.ARCHIVED:
    default:
      return { mode: 'COMING_SOON', disabled: true, labelKey: 'offerPage.cta.comingSoon' }
  }
}

/** Seat status order used when picking the most relevant open departure. */
const OPENNESS: Record<DepartureStatus, number> = {
  [DepartureStatus.OPEN]: 0,
  [DepartureStatus.FEW_SEATS]: 1,
  [DepartureStatus.SOLD_OUT]: 2,
}

/**
 * The soonest still-bookable departure (earliest start date, preferring more
 * open seats), or the earliest of any if all are sold out.
 */
export function nearestDeparture(departures: Departure[]): Departure | null {
  if (departures.length === 0) return null

  const byDate = [...departures].sort((a, b) => a.startDate.localeCompare(b.startDate))
  const bookable = byDate.filter(d => d.status !== DepartureStatus.SOLD_OUT)
  const pool = bookable.length ? bookable : byDate

  return [...pool].sort(
    (a, b) => OPENNESS[a.status] - OPENNESS[b.status] || a.startDate.localeCompare(b.startDate),
  )[0] ?? null
}

/** Format money for display in a given locale. */
export function formatMoney(money: Money, locale: string): string {
  return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount)
}

/** Resolve a `LocalizedText` to a string, falling back to Russian (source). */
export function localize(text: LocalizedText, locale: string): string {
  const value = locale === 'en' ? text.en : text.ru
  return value || text.ru
}
