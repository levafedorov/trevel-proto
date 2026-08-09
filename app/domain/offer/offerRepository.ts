/**
 * Data-access boundary for offers. Today it serves a single hardcoded tour;
 * swap the internals for a CMS/Supabase fetch later without touching callers.
 */
import type { Offer, OfferSummary } from './types'
import { nearestDeparture } from './offerRules'
import { aegeanPearls } from './first-tour'
import { aegeanPearlsOctober } from './second-tour'

/** Every tour the platform currently knows about. */
const offers: Offer[] = [aegeanPearls, aegeanPearlsOctober]

/** Project a full offer down to the card-sized summary used by lists. */
export function toSummary(offer: Offer): OfferSummary {
  return {
    slug: offer.slug,
    title: offer.title,
    shortDescription: offer.shortDescription,
    location: offer.location,
    heroImage: offer.hero,
    priceFrom: offer.priceFrom,
    durationDays: offer.durationDays,
    availability: offer.availability,
    category: offer.category,
    // Two tours now run the same route on different dates, so the dates are
    // what tells the cards apart — the card carries the nearest bookable one.
    departureLabel: nearestDeparture(offer.departures)?.label,
  }
}

export function listOfferSummaries(): OfferSummary[] {
  return offers.map(toSummary)
}

export function findOfferBySlug(slug: string): Offer | null {
  return offers.find(o => o.slug === slug) ?? null
}
