import type { LocalizedText, Money } from '~/domain/offer/types'
import { formatMoney, localize as localizeText } from '~/domain/offer/offerRules'

/**
 * Resolve domain `LocalizedText` / `Money` against the active UI locale.
 * The tour content lives in the domain as `{ ru, en }`; this is the bridge to it.
 */
export function useLocalizedText() {
  const { locale } = useI18n()

  const localize = (text: LocalizedText): string => localizeText(text, locale.value)
  const money = (value: Money): string => formatMoney(value, locale.value)

  return { locale, localize, money }
}
