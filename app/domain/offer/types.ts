/**
 * Offer domain model — pure TypeScript, framework-agnostic.
 *
 * Mirrors `docs/offer-architecture/domain-model.drawio`. This is the flat, complete
 * shape a CMS would eventually return; the sectioned page (Version A) lays these
 * fields out into fixed sections. No Vue / Nuxt imports here on purpose.
 */

/** Text carried in every supported language. `ru` is the source; `en` the translation. */
export interface LocalizedText {
  ru: string
  en: string
}

export interface Money {
  amount: number
  /** ISO 4217, e.g. 'EUR'. */
  currency: string
}

export interface Media {
  /** Resolved URL (imported asset or remote). */
  src: string
  alt: LocalizedText
}

export interface GeoPoint {
  lat: number
  lng: number
}

export interface SeoMeta {
  title: LocalizedText
  description: LocalizedText
  ogImage?: string
}

/** Whether the offer as a whole can be booked. */
export enum Availability {
  ACTIVE = 'ACTIVE',
  COMING_SOON = 'COMING_SOON',
  SOLD_OUT = 'SOLD_OUT',
  ARCHIVED = 'ARCHIVED',
}

/** Seat availability for a single dated departure. */
export enum DepartureStatus {
  OPEN = 'OPEN',
  FEW_SEATS = 'FEW_SEATS',
  SOLD_OUT = 'SOLD_OUT',
}

/** Whether a line item is part of the price or explicitly not. */
export enum InclusionKind {
  INCLUDED = 'INCLUDED',
  EXCLUDED = 'EXCLUDED',
}

export enum PaymentKind {
  RUB_BY_RATE = 'RUB_BY_RATE',
  BANK_INSTALLMENT = 'BANK_INSTALLMENT',
  INTERNAL_INSTALLMENT = 'INTERNAL_INSTALLMENT',
}

/**
 * Meals covered by the price on a given day. Kept per-day so the itinerary can
 * show small indicators; the aggregate ("6 breakfasts, 1 dinner…") lives in
 * inclusions.
 */
export interface Meals {
  breakfast?: boolean
  lunch?: boolean
  dinner?: boolean
}

/** A single named place shown as a thumbnail in a day card. */
export interface PointOfInterest {
  label: LocalizedText
  image: Media
  geo?: GeoPoint
}

/**
 * One timed line in a day's schedule. `time` is a `LocalizedText` (not a raw
 * string) because some rows are word labels — "day", "shrines" — rather than a
 * universal "07:00".
 */
export interface TimelineEntry {
  time: LocalizedText
  text: LocalizedText
}

export interface ItineraryDay {
  day: number
  title: LocalizedText
  /** Optional short theme/subtitle under the day title. */
  theme?: LocalizedText
  /** Timed schedule; empty for free-form days that only carry `body`. */
  timeline: TimelineEntry[]
  /** Prose paragraphs for days without a strict schedule. */
  body: LocalizedText[]
  pois: PointOfInterest[]
  /** Small caveats: "lunch not included", "bring swimwear", … */
  notes: LocalizedText[]
  meals?: Meals
}

export interface InclusionItem {
  kind: InclusionKind
  label: LocalizedText
  /** Lucide icon name, optional. */
  icon?: string
}

export interface PaymentOption {
  kind: PaymentKind
  label: LocalizedText
}

export interface PracticalItem {
  /** Emoji or Lucide icon name shown before the label. */
  icon: string
  label: LocalizedText
}

export interface Departure {
  id: string
  startDate: string
  endDate: string
  /** Human date range, e.g. "19–25 September 2026". */
  label: LocalizedText
  status: DepartureStatus
  /** Seat hint, e.g. "few seats left". */
  seatsLabel?: LocalizedText
  price: Money
  /** Payment terms line shown under the price. */
  paymentNote: LocalizedText
}

/** Card-sized projection used by lists (home, dashboard). */
export interface OfferSummary {
  slug: string
  title: LocalizedText
  shortDescription: LocalizedText
  location: LocalizedText
  heroImage: Media
  priceFrom: Money
  durationDays: number
  availability: Availability
  category: string
  rating: number
  reviewCount: number
}

/** Full offer aggregate consumed by the detail page. */
export interface Offer {
  slug: string
  title: LocalizedText
  eyebrow: LocalizedText
  subtitle: LocalizedText
  shortDescription: LocalizedText
  location: LocalizedText
  availability: Availability
  category: string
  priceFrom: Money
  durationDays: number
  excursions: number
  rating: number
  reviewCount: number
  /** Guide language badge, e.g. 'RU'. */
  guideLanguage: string
  hero: Media
  description: LocalizedText[]
  gallery: Media[]
  itinerary: ItineraryDay[]
  inclusions: InclusionItem[]
  practicalInfo: PracticalItem[]
  departures: Departure[]
  paymentOptions: PaymentOption[]
  meta: SeoMeta
}
