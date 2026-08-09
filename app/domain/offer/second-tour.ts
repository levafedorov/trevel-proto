/**
 * "Pearls of the Aegean Coast" — the October departure, 8 days.
 *
 * The same journey as the September tour, one night longer: a free day for
 * shopping and unhurried walking sits between Pamukkale and the flight home.
 * Everything shared comes from `aegean-programme.ts`.
 */
import { Availability, DepartureStatus } from './types'
import type { Offer } from './types'
import {
  coreDays,
  coverImg,
  departureDay,
  freeDay,
  gallery,
  hero,
  inclusions,
  paymentNote,
  paymentOptions,
  practicalInfo,
  practicalNotes,
  t,
} from './aegean-programme'

export const aegeanPearlsOctober: Offer = {
  slug: 'aegean-pearls-october',
  title: t('Жемчужины Эгейского побережья — октябрь', 'Pearls of the Aegean Coast — October'),
  eyebrow: t('Авторский тур · Измир, Турция', 'Signature tour · Izmir, Turkey'),
  subtitle: t(
    'Измир · Кушадасы · Эфес · Чешме · Алачаты · Памуккале. Восемь дней у лазурного моря, со свободным днём на шоппинг — с русскоговорящим гидом.',
    'Izmir · Kusadasi · Ephesus · Cesme · Alacati · Pamukkale. Eight days by the turquoise sea, with a free day for shopping — and a Russian-speaking guide.',
  ),
  shortDescription: t(
    'Восемь дней у лазурного Эгейского моря: Измир, Кушадасы, Эфес, Памуккале и свободный день на шоппинг и прогулки.',
    'Eight days by the turquoise Aegean: Izmir, Kusadasi, Ephesus, Pamukkale and a free day for shopping and walking.',
  ),
  location: t('Измир, Турция', 'Izmir, Turkey'),
  availability: Availability.ACTIVE,
  category: 'cultural',
  priceFrom: { amount: 1160, currency: 'EUR' },
  durationDays: 8,
  nights: 7,
  groupSize: 16,
  guideLanguage: 'RU',

  hero,

  description: [
    t(
      'Восемь дней вдоль лазурного Эгейского моря — от Измира, где древность встречается с современностью, до белоснежных травертинов Памуккале. Морская прогулка по бухтам Кушадасы, античный Эфес и Дом Девы Марии, узкие улочки Алачаты и Чешме, дегустация фруктовых вин в греческой деревне Шириндже.',
      'Eight days along the turquoise Aegean — from Izmir, where antiquity meets the modern city, to the snow-white travertines of Pamukkale. A boat trip around the bays of Kusadasi, ancient Ephesus and the House of the Virgin Mary, the narrow lanes of Alacati and Cesme, and a fruit-wine tasting in the Greek village of Sirince.',
    ),
    t(
      'Октябрьский заезд идёт на день дольше сентябрьского: после Памуккале — целый свободный день на базар Кемералты, торговые улицы и набережную Кордон, без расписания и спешки.',
      'The October departure runs a day longer than the September one: after Pamukkale comes a whole free day for the Kemeralti bazaar, the shopping streets and the Kordon embankment — no schedule, no rush.',
    ),
    t(
      'Проживание в 5* отеле при 2-х местном размещении в номере в самом сердце 💗 Измира со СПА, сауной и бассейном, комфортные трансферы, продуманные экскурсии с русскоговорящим гидом и время на отдых у моря. Восемь дней, семь ночей и небольшая группа — до 16 человек. Тур авторский — камерный, тёплый и без спешки.',
      'You stay at a 5* hotel in a double room in the very heart of 💗 Izmir, with a spa, sauna and pool; comfortable transfers, thoughtfully planned excursions with a Russian-speaking guide, and time to unwind by the sea. Eight days, seven nights and a small group of up to 16 people. This is a signature tour — intimate, warm and unhurried.',
    ),
  ],

  gallery,

  itinerary: [...coreDays, freeDay(7), departureDay(8)],

  inclusions,
  practicalNotes,
  practicalInfo,

  departures: [
    {
      id: 'aegean-pearls-2026-10-10',
      startDate: '2026-10-10',
      endDate: '2026-10-17',
      label: t('10–17 октября 2026', '10–17 October 2026'),
      status: DepartureStatus.OPEN,
      price: { amount: 1160, currency: 'EUR' },
      paymentNote,
    },
  ],

  paymentOptions,

  meta: {
    title: t('Жемчужины Эгейского побережья, октябрь — LovEnRoute', 'Pearls of the Aegean Coast, October — LovEnRoute'),
    description: t(
      'Авторский тур по Эгейскому побережью Турции: Измир, Кушадасы, Эфес, Памуккале. 8 дней с 10 октября, свободный день на шоппинг, русскоговорящий гид.',
      'A signature tour of Turkey’s Aegean coast: Izmir, Kusadasi, Ephesus and Pamukkale. 8 days from 10 October, a free day for shopping, and a Russian-speaking guide.',
    ),
    ogImage: coverImg,
  },
}
