import { findOfferBySlug } from '~/domain/offer/offerRepository'
import type { Offer } from '~/domain/offer/types'

/**
 * Load a full offer by slug via `useAsyncData`, exposing the four page states:
 * pending, notFound (slug unknown), error (fetch failure — wired for retry),
 * and success (`data`). Mock latency mirrors `useMockDatabase`.
 */
export function useOfferDetail(slug: string) {
  const { data, pending, error, refresh } = useAsyncData<Offer | null>(
    `offer-detail-${slug}`,
    async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      // A thrown error here surfaces via `error` and is recoverable with retry();
      // the repository never throws today, so this path is dormant by design.
      return findOfferBySlug(slug)
    },
  )

  // Derived (not a separate ref) so it survives SSR → client hydration.
  const notFound = computed(() => !pending.value && !error.value && data.value === null)

  const retry = () => refresh()

  return { data, pending, error, notFound, retry }
}
