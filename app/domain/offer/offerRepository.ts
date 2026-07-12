/**
 * Data-access boundary for offers. Today it serves a single hardcoded tour;
 * swap the internals for a CMS/Supabase fetch later without touching callers.
 */
import type { Offer, OfferSummary } from './types'
import { aegeanPearls } from './first-tour'

/** Every tour the platform currently knows about. MVP: exactly one. */
const offers: Offer[] = [aegeanPearls]

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
    rating: offer.rating,
    reviewCount: offer.reviewCount,
  }
}

export function listOfferSummaries(): OfferSummary[] {
  return offers.map(toSummary)
}

export function findOfferBySlug(slug: string): Offer | null {
  return offers.find(o => o.slug === slug) ?? null
}
