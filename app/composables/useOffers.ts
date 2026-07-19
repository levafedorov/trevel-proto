import { listOfferSummaries } from '~/domain/offer/offerRepository'
import { Availability } from '~/domain/offer/types'
import type { OfferSummary } from '~/domain/offer/types'

/**
 * Card-sized offer lists for the home page, RecentOffersSection and dashboard.
 * Backed by the domain repository (MVP: a single tour). Name kept for callers.
 */
export function useOffers() {
  const offers: OfferSummary[] = listOfferSummaries()

  const activeOffers = computed(() => offers.filter(o => o.availability === Availability.ACTIVE))

  const recentOffers = computed(() => activeOffers.value.slice(0, 3))

  const getSummaryBySlug = (slug: string): OfferSummary | null =>
    offers.find(o => o.slug === slug) ?? null

  return { offers, activeOffers, recentOffers, getSummaryBySlug }
}
