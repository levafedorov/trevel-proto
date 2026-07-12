/**
 * "Pearls of the Aegean Coast" — the single real tour behind the MVP.
 *
 * Content is transcribed from the approved design (`docs/ux-ui/first-tour.html`).
 * Russian is the source language; English is a faithful translation. Replace with
 * a CMS fetch later (see offerRepository.ts).
 */
import { Availability, DepartureStatus, InclusionKind, PaymentKind } from './types'
import type { LocalizedText, Media, Offer } from './types'

// Real photography (days 1–4). Vite resolves these imports to hashed URLs.
import heroImg from '~/assets/images/first-tour/second-day.jpeg'
import bayImg from '~/assets/images/first-tour/first-day.jpeg'
import hotelImg from '~/assets/images/first-tour/first-day-1.jpeg'
import clockTowerImg from '~/assets/images/first-tour/second-day.jpeg'
import kemeraltiImg from '~/assets/images/first-tour/second-day-1.jpeg'
import yachtImg from '~/assets/images/first-tour/kushadasy.jpeg'
import pirateCastleImg from '~/assets/images/first-tour/kusadasy-1.jpeg'
import ephesusImg from '~/assets/images/first-tour/efes.jpeg'
import sirinceImg from '~/assets/images/first-tour/efes-1.jpeg'

/** Compact bilingual literal. */
const t = (ru: string, en: string): LocalizedText => ({ ru, en })

/**
 * Placeholder for scenes we have no real photo of yet (days 5–7, Pamukkale).
 * picsum is already an allowed image domain. TODO: real photo.
 */
const placeholder = (seed: string, alt: LocalizedText): Media => ({
  src: `https://picsum.photos/seed/${seed}/800/600`,
  alt,
})

export const aegeanPearls: Offer = {
  slug: 'aegean-pearls',
  title: t('Жемчужины Эгейского побережья', 'Pearls of the Aegean Coast'),
  eyebrow: t('Авторский тур · Измир, Турция', 'Signature tour · Izmir, Turkey'),
  subtitle: t(
    'Измир · Кушадасы · Эфес · Чешме · Памуккале. Семь дней у лазурного моря — с русскоговорящим гидом.',
    'Izmir · Kusadasi · Ephesus · Cesme · Pamukkale. Seven days by the turquoise sea — with a Russian-speaking guide.',
  ),
  shortDescription: t(
    'Семь дней у лазурного Эгейского моря: Измир, Кушадасы, Эфес, Памуккале — с русскоговорящим гидом.',
    'Seven days by the turquoise Aegean: Izmir, Kusadasi, Ephesus and Pamukkale — with a Russian-speaking guide.',
  ),
  location: t('Измир, Турция', 'Izmir, Turkey'),
  availability: Availability.ACTIVE,
  category: 'cultural',
  priceFrom: { amount: 1000, currency: 'EUR' },
  durationDays: 7,
  excursions: 6,
  rating: 4.9,
  reviewCount: 318,
  guideLanguage: 'RU',

  hero: {
    src: heroImg,
    alt: t('Измирский залив на закате', 'The Bay of Izmir at sunset'),
  },

  description: [
    t(
      'Семь дней вдоль лазурного Эгейского моря — от Измира, где древность встречается с современностью, до белоснежных травертинов Памуккале. Морская прогулка по бухтам Кушадасы, античный Эфес и Дом Девы Марии, узкие улочки Алачаты и Чешме, дегустация фруктовых вин в греческой деревне Шириндже.',
      'Seven days along the turquoise Aegean — from Izmir, where antiquity meets the modern city, to the snow-white travertines of Pamukkale. A boat trip around the bays of Kusadasi, ancient Ephesus and the House of the Virgin Mary, the narrow lanes of Alacati and Cesme, and a fruit-wine tasting in the Greek village of Sirince.',
    ),
    t(
      'Проживание в отеле в самом сердце Измира со СПА, сауной и бассейном, комфортные трансферы, продуманные экскурсии с русскоговорящим гидом и время на отдых у моря. Тур авторский — камерный, тёплый и без спешки.',
      'You stay at a hotel in the very heart of Izmir with a spa, sauna and pool; comfortable transfers, thoughtfully planned excursions with a Russian-speaking guide, and time to unwind by the sea. This is a signature tour — intimate, warm and unhurried.',
    ),
  ],

  gallery: [
    { src: ephesusImg, alt: t('Эфес', 'Ephesus') },
    { src: yachtImg, alt: t('Кушадасы', 'Kusadasi') },
    // TODO: real photo — no Pamukkale shot yet.
    placeholder('pamukkale-terraces', t('Памуккале', 'Pamukkale')),
  ],

  itinerary: [
    {
      day: 1,
      title: t('Добро пожаловать в Измир!', 'Welcome to Izmir!'),
      timeline: [],
      body: [
        t(
          'Встреча в аэропорту Измира и комфортный трансфер в отель в самом сердце города — с уютной атмосферой, СПА-салоном, сауной и бассейном. Останется только расслабиться и начать наслаждаться поездкой.',
          'You are met at Izmir airport and transferred in comfort to a hotel in the very heart of the city — cosy, with a spa, sauna and pool. All that is left is to relax and start enjoying the trip.',
        ),
        t(
          'Вечером — ужин и приятное знакомство с организаторами тура в аутентичном ресторане с великолепным видом на Измирский залив и знаменитыми закатами.',
          'In the evening, dinner and a warm welcome from the tour hosts at an authentic restaurant with a magnificent view over the Bay of Izmir and its famous sunsets.',
        ),
      ],
      pois: [
        { label: t('Измирский залив', 'Bay of Izmir'), image: { src: bayImg, alt: t('Измирский залив', 'Bay of Izmir') } },
        { label: t('отель · СПА', 'hotel · spa'), image: { src: hotelImg, alt: t('Отель со СПА', 'Hotel with spa') } },
      ],
      notes: [],
      meals: { dinner: true },
    },
    {
      day: 2,
      title: t('Измир: между древностью и современностью', 'Izmir: between antiquity and the modern day'),
      timeline: [
        { time: t('07:00', '07:00'), text: t('Завтрак в отеле', 'Breakfast at the hotel') },
        {
          time: t('09:00', '09:00'),
          text: t(
            'Обзорная экскурсия: Исторический Лифт (турецкий кофе с видом на город), Агора античной Смирны, район Кемералты с османской архитектурой и караван-дворцом, Площадь с Часовой башней, торговая улица Кыбрыс Шехитлери. Прогулка на пароходе и Центральный парк.',
            'City sightseeing tour: the Historical Elevator (Turkish coffee with a view over the city), the Agora of ancient Smyrna, the Kemeralti quarter with its Ottoman architecture and caravanserai, Clock Tower Square, and the Kibris Sehitleri shopping street. A ferry ride and Kulturpark.',
          ),
        },
        {
          time: t('18:00', '18:00'),
          text: t('Свободное время: турецкий хамам или шоппинг в моллах города.', 'Free time: a Turkish hammam or shopping in the city malls.'),
        },
      ],
      body: [],
      pois: [
        { label: t('Часовая башня', 'Clock Tower'), image: { src: clockTowerImg, alt: t('Часовая башня Измира', 'Izmir Clock Tower') } },
        { label: t('Кемералты', 'Kemeralti'), image: { src: kemeraltiImg, alt: t('Базар Кемералты', 'Kemeralti bazaar') } },
      ],
      notes: [t('Стоимость обеда и напитков оплачивается гостями', 'Lunch and drinks are paid by guests')],
      meals: { breakfast: true },
    },
    {
      day: 3,
      title: t('Магия Кушадасы — прогулка на яхте', 'The magic of Kusadasi — a yacht trip'),
      timeline: [
        {
          time: t('07:30', '07:30'),
          text: t(
            'Выезд на экскурсию «Магия Кушадасы». Морская прогулка на яхте: живописные бухты и островки, кристально чистая вода, купание в открытом море, обед с напитками на борту.',
            'Departure for the “Magic of Kusadasi” excursion. A yacht trip: scenic bays and islets, crystal-clear water, swimming in the open sea, and lunch with drinks on board.',
          ),
        },
        {
          time: t('день', 'day'),
          text: t('Знакомство с курортным Кушадасы: Пиратский замок и уникальный исчезающий цветок.', 'Exploring the resort town of Kusadasi: the Pirate Castle and a unique vanishing flower.'),
        },
        { time: t('18:15', '18:15'), text: t('Возвращение в отель', 'Return to the hotel') },
      ],
      body: [],
      pois: [
        { label: t('яхта · Кушадасы', 'yacht · Kusadasi'), image: { src: yachtImg, alt: t('Яхта у Кушадасы', 'Yacht near Kusadasi') } },
        { label: t('Пиратский замок', 'Pirate Castle'), image: { src: pirateCastleImg, alt: t('Пиратский замок Кушадасы', 'Kusadasi Pirate Castle') } },
      ],
      notes: [t('Обед включён · с собой: пляжные вещи, деньги на сувениры', 'Lunch included · bring: beachwear, money for souvenirs')],
      meals: { breakfast: true, lunch: true },
    },
    {
      day: 4,
      title: t('Святыни, античность и винная деревня', 'Shrines, antiquity and a wine village'),
      timeline: [
        {
          time: t('08:00', '08:00'),
          text: t(
            'Выезд. Храм Артемиды — одно из семи чудес света, мечеть Иса-бея (XIV век), базилика и усыпальница Святого Иоанна, средневековый замок.',
            'Departure. The Temple of Artemis — one of the Seven Wonders of the World, the Isa Bey Mosque (14th century), the basilica and tomb of St John, and a medieval castle.',
          ),
        },
        {
          time: t('Эфес', 'Ephesus'),
          text: t(
            'Гончарная мастерская керамики, прогулка по мраморным улицам древнего Эфеса: Библиотека Цельса, Большой театр, античные бани. Обед среди оливковых рощ.',
            'A pottery workshop, then a walk along the marble streets of ancient Ephesus: the Library of Celsus, the Great Theatre and the Roman baths. Lunch among olive groves.',
          ),
        },
        {
          time: t('святыни', 'shrines'),
          text: t(
            'Дом Девы Марии — часовня, святой источник, Стена желаний. Финал — греческая деревня Шириндже с дегустацией фруктовых вин.',
            'The House of the Virgin Mary — a chapel, a holy spring and the Wishing Wall. Finish in the Greek village of Sirince with a fruit-wine tasting.',
          ),
        },
        { time: t('19:30', '19:30'), text: t('Возвращение в отель', 'Return to the hotel') },
      ],
      body: [],
      pois: [
        { label: t('Эфес · Библиотека Цельса', 'Ephesus · Library of Celsus'), image: { src: ephesusImg, alt: t('Библиотека Цельса', 'Library of Celsus') } },
        { label: t('Шириндже', 'Sirince'), image: { src: sirinceImg, alt: t('Деревня Шириндже', 'Sirince village') } },
      ],
      notes: [t('Обед и напитки входят в стоимость', 'Lunch and drinks are included')],
      meals: { breakfast: true, lunch: true },
    },
    {
      day: 5,
      title: t('Белая сказка Алачаты, Чешме и бриз Илиджа', 'The white fairy tale of Alacati, Cesme and the breeze of Ilica'),
      timeline: [],
      body: [
        t(
          'Экскурсия в Чешме, где Эгейское море особенно прозрачно: старинная крепость над городом, яхты в порту. Рядом — Алачаты с каменными домами, увитыми бугенвиллией. В Илидже — песчаная набережная, термальные источники, впадающие прямо в море, и свободное время для купания. Возвращение в 19:15.',
          'An excursion to Cesme, where the Aegean is especially clear: an old fortress above the town and yachts in the harbour. Nearby lies Alacati, with its stone houses draped in bougainvillea. In Ilica — a sandy promenade, thermal springs that flow straight into the sea, and free time for a swim. Return at 19:15.',
        ),
      ],
      pois: [
        // TODO: real photo.
        { label: t('Алачаты', 'Alacati'), image: placeholder('alacati-stone-houses', t('Алачаты', 'Alacati')) },
        { label: t('пляж Илиджа', 'Ilica Beach'), image: placeholder('ilica-beach', t('Пляж Илиджа', 'Ilica Beach')) },
      ],
      notes: [t('Обед и напитки не входят · с собой: купальные принадлежности', 'Lunch and drinks not included · bring: swimwear')],
      meals: { breakfast: true },
    },
    {
      day: 6,
      title: t('Памуккале — одно из семи чудес света', 'Pamukkale — one of the Seven Wonders'),
      timeline: [
        { time: t('07:00', '07:00'), text: t('Выезд. День исцеления души и тела в атмосфере времён Клеопатры.', 'Departure. A day of healing for body and soul, in an atmosphere from the time of Cleopatra.') },
        {
          time: t('10:30', '10:30'),
          text: t(
            'СПА-отель с целебными горячими источниками у подножия «хлопкового замка». После обеда — Мастерская камня оникс.',
            'A spa hotel with healing hot springs at the foot of the “cotton castle”. After lunch, an onyx stone workshop.',
          ),
        },
        {
          time: t('14:00', '14:00'),
          text: t(
            'Памуккале: белоснежные каскадные террасы, прогулка босиком. Древний Иераполис и Бассейн Клеопатры — купание среди античных колонн. Наследие ЮНЕСКО.',
            'Pamukkale: snow-white cascading terraces and a barefoot walk. Ancient Hierapolis and Cleopatra’s Pool — a swim among antique columns. A UNESCO World Heritage Site.',
          ),
        },
        { time: t('20:00', '20:00'), text: t('Возвращение в отель', 'Return to the hotel') },
      ],
      body: [],
      pois: [
        // TODO: real photo.
        { label: t('Памуккале · травертины', 'Pamukkale · travertines'), image: placeholder('pamukkale-white', t('Травертины Памуккале', 'Pamukkale travertines')) },
        { label: t('Бассейн Клеопатры', 'Cleopatra’s Pool'), image: placeholder('cleopatra-pool', t('Бассейн Клеопатры', 'Cleopatra’s Pool')) },
      ],
      notes: [t('Обед и напитки входят · с собой: купальные принадлежности', 'Lunch and drinks included · bring: swimwear')],
      meals: { breakfast: true, lunch: true },
    },
    {
      day: 7,
      title: t('Свободное время · вылет', 'Free time · departure'),
      timeline: [],
      body: [t('Заключительный завтрак в отеле, свободное время и трансфер в аэропорт.', 'A final breakfast at the hotel, free time and a transfer to the airport.')],
      pois: [
        // TODO: real photo.
        { label: t('свободное утро', 'a free morning'), image: placeholder('izmir-morning', t('Свободное утро в Измире', 'A free morning in Izmir')) },
      ],
      notes: [],
      meals: { breakfast: true },
    },
  ],

  inclusions: [
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-utensils', label: t('6 завтраков, 1 ужин, 3 обеда', '6 breakfasts, 1 dinner, 3 lunches') },
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-car-front', label: t('Трансфер в аэропорт и обратно', 'Airport transfers both ways') },
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-ticket', label: t('Экскурсии со всеми входными билетами в музеи', 'Excursions with all museum entrance tickets') },
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-shield-check', label: t('Страхование во время экскурсий', 'Insurance during excursions') },
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-user', label: t('Русскоговорящий гид', 'Russian-speaking guide') },
    { kind: InclusionKind.EXCLUDED, label: t('5 ужинов и 3 обеда', '5 dinners and 3 lunches') },
    { kind: InclusionKind.EXCLUDED, label: t('Авиабилеты', 'Flights') },
    { kind: InclusionKind.EXCLUDED, label: t('Страховка на время всего путешествия', 'Insurance for the whole trip') },
  ],

  practicalInfo: [
    { icon: '🩱', label: t('Купальные принадлежности (дни 3, 5, 6)', 'Swimwear (days 3, 5, 6)') },
    { icon: '💶', label: t('Деньги на обеды и сувениры', 'Money for lunches and souvenirs') },
    { icon: '☀️', label: t('Лёгкая одежда и головной убор', 'Light clothing and a hat') },
    { icon: '👟', label: t('Удобная обувь для прогулок', 'Comfortable walking shoes') },
  ],

  departures: [
    {
      id: 'aegean-pearls-2026-09-19',
      startDate: '2026-09-19',
      endDate: '2026-09-25',
      label: t('19–25 сентября 2026', '19–25 September 2026'),
      status: DepartureStatus.FEW_SEATS,
      seatsLabel: t('осталось мало мест', 'few seats left'),
      price: { amount: 1000, currency: 'EUR' },
      paymentNote: t(
        'оплата в рублях по курсу · рассрочка от банка или внутренняя',
        'payment in rubles at the current rate · bank or in-house instalments',
      ),
    },
  ],

  paymentOptions: [
    { kind: PaymentKind.RUB_BY_RATE, label: t('Оплата в рублях по курсу', 'Payment in rubles at the current rate') },
    { kind: PaymentKind.BANK_INSTALLMENT, label: t('Рассрочка от банка', 'Bank instalments') },
    { kind: PaymentKind.INTERNAL_INSTALLMENT, label: t('Внутренняя рассрочка', 'In-house instalments') },
  ],

  meta: {
    title: t('Жемчужины Эгейского побережья — OlimpiaTour', 'Pearls of the Aegean Coast — OlimpiaTour'),
    description: t(
      'Авторский тур по Эгейскому побережью Турции: Измир, Кушадасы, Эфес, Памуккале. 7 дней, русскоговорящий гид.',
      'A signature tour of Turkey’s Aegean coast: Izmir, Kusadasi, Ephesus and Pamukkale. 7 days with a Russian-speaking guide.',
    ),
    ogImage: heroImg,
  },
}
