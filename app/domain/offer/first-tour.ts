/**
 * "Pearls of the Aegean Coast" — the September departure, 7 days.
 *
 * Only what is specific to this departure lives here: dates, price, length and
 * the copy that mentions them. The itinerary, inclusions and practical notes
 * come from `aegean-programme.ts`, shared with every tour running the same
 * journey.
 */
import { Availability, DepartureStatus } from './types'
import type { Offer } from './types'
import {
  coreDays,
  coverImg,
  departureDay,
  gallery,
  hero,
  inclusions,
  paymentNote,
  paymentOptions,
  practicalInfo,
  practicalNotes,
  t,
} from './aegean-programme'

export const aegeanPearls: Offer = {
  slug: 'aegean-pearls',
  title: t('Жемчужины Эгейского побережья', 'Pearls of the Aegean Coast'),
  eyebrow: t('Авторский тур · Измир, Турция', 'Signature tour · Izmir, Turkey'),
  subtitle: t(
    'Измир · Кушадасы · Эфес · Чешме · Алачаты · Памуккале. Семь дней у лазурного моря — с русскоговорящим гидом.',
    'Izmir · Kusadasi · Ephesus · Cesme · Alacati · Pamukkale. Seven days by the turquoise sea — with a Russian-speaking guide.',
  ),
  shortDescription: t(
    'Семь дней у лазурного Эгейского моря: Измир, Кушадасы, Эфес, Памуккале — с русскоговорящим гидом.',
    'Seven days by the turquoise Aegean: Izmir, Kusadasi, Ephesus and Pamukkale — with a Russian-speaking guide.',
  ),
  location: t('Измир, Турция', 'Izmir, Turkey'),
  availability: Availability.ACTIVE,
  category: 'cultural',
  priceFrom: { amount: 1100, currency: 'EUR' },
  durationDays: 7,
  nights: 6,
  groupSize: 16,
  guideLanguage: 'RU',

  hero,

  description: [
    t(
      'Семь дней вдоль лазурного Эгейского моря — от Измира, где древность встречается с современностью, до белоснежных травертинов Памуккале. Морская прогулка по бухтам Кушадасы, античный Эфес и Дом Девы Марии, узкие улочки Алачаты и Чешме, дегустация фруктовых вин в греческой деревне Шириндже.',
      'Seven days along the turquoise Aegean — from Izmir, where antiquity meets the modern city, to the snow-white travertines of Pamukkale. A boat trip around the bays of Kusadasi, ancient Ephesus and the House of the Virgin Mary, the narrow lanes of Alacati and Cesme, and a fruit-wine tasting in the Greek village of Sirince.',
    ),
    t(
      'Проживание в 5* отеле при 2-х местном размещении в номере в самом сердце 💗 Измира со СПА, сауной и бассейном, комфортные трансферы, продуманные экскурсии с русскоговорящим гидом и время на отдых у моря. Семь дней, шесть ночей и небольшая группа — до 16 человек. Тур авторский — камерный, тёплый и без спешки.',
      'You stay at a 5* hotel in a double room in the very heart of 💗 Izmir, with a spa, sauna and pool; comfortable transfers, thoughtfully planned excursions with a Russian-speaking guide, and time to unwind by the sea. Seven days, six nights and a small group of up to 16 people. This is a signature tour — intimate, warm and unhurried.',
    ),
  ],

  gallery,

  itinerary: [...coreDays, departureDay(7)],

  inclusions,
  practicalNotes,
  practicalInfo,

  departures: [
    {
      id: 'aegean-pearls-2026-09-19',
      startDate: '2026-09-19',
      endDate: '2026-09-25',
      label: t('19–25 сентября 2026', '19–25 September 2026'),
      status: DepartureStatus.FEW_SEATS,
      seatsLabel: t('осталось мало мест', 'few seats left'),
      price: { amount: 1100, currency: 'EUR' },
      paymentNote,
    },
  ],

  paymentOptions,

  meta: {
    title: t('Жемчужины Эгейского побережья — LovEnRoute', 'Pearls of the Aegean Coast — LovEnRoute'),
    description: t(
      'Авторский тур по Эгейскому побережью Турции: Измир, Кушадасы, Эфес, Памуккале. 7 дней, русскоговорящий гид.',
      'A signature tour of Turkey’s Aegean coast: Izmir, Kusadasi, Ephesus and Pamukkale. 7 days with a Russian-speaking guide.',
    ),
    ogImage: coverImg,
  },
}
