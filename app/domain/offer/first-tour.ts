/**
 * "Pearls of the Aegean Coast" — the single real tour behind the MVP.
 *
 * Content is transcribed from the approved design (`docs/ux-ui/first-tour.html`).
 * Russian is the source language; English is a faithful translation. Replace with
 * a CMS fetch later (see offerRepository.ts).
 */
import { Availability, DepartureStatus, InclusionKind, NoteTone, PaymentKind } from './types'
import type { DayNote, LocalizedText, Media, Offer } from './types'

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

/** Day-note builders: `good` for what's included, `warn` for caveats / extra cost. */
const good = (ru: string, en: string): DayNote => ({ tone: NoteTone.POSITIVE, text: t(ru, en) })
const warn = (ru: string, en: string): DayNote => ({ tone: NoteTone.CAUTION, text: t(ru, en) })

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
  priceFrom: { amount: 1100, currency: 'EUR' },
  durationDays: 7,
  nights: 6,
  groupSize: 16,
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
      'Проживание в отеле в самом сердце Измира со СПА, сауной и бассейном, комфортные трансферы, продуманные экскурсии с русскоговорящим гидом и время на отдых у моря. Семь дней, шесть ночей и небольшая группа — до 16 человек. Тур авторский — камерный, тёплый и без спешки.',
      'You stay at a hotel in the very heart of Izmir with a spa, sauna and pool; comfortable transfers, thoughtfully planned excursions with a Russian-speaking guide, and time to unwind by the sea. Seven days, six nights and a small group of up to 16 people. This is a signature tour — intimate, warm and unhurried.',
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
          'В 14:00 заботливо встретим вас в аэропорту Измира и комфортно доставим в отель в самом сердце города. Там вас ждёт уютная гостеприимная атмосфера со СПА-салоном, сауной и бассейном. Останется только расслабиться, отдохнуть и начать наслаждаться поездкой.',
          'At 14:00 we meet you at Izmir airport and transfer you in comfort to a hotel in the very heart of the city. A cosy, welcoming atmosphere awaits — with a spa, sauna and pool. All that is left is to relax, unwind and start enjoying the trip.',
        ),
        t(
          'Вечером — ужин и приятное знакомство с организаторами тура в аутентичном ресторане с великолепным видом на Измирский залив и живописными закатами. Тёплая атмосфера, приятная музыка и высокий уровень сервиса сделают эту встречу незабываемой и станут приятным началом путешествия.',
          'In the evening, dinner and a warm introduction to the tour hosts at an authentic restaurant with a magnificent view over the Bay of Izmir and its picturesque sunsets. A warm atmosphere, pleasant music and attentive service make this first meeting unforgettable — a lovely start to our journey.',
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
        { time: t('07:00', '07:00'), text: t('Завтрак в отеле — чудесный день начинается неспешно.', 'Breakfast at the hotel — a wonderful day begins at an unhurried pace.') },
        {
          time: t('09:00', '09:00'),
          text: t(
            'Обзорная экскурсия «Измир: между древностью и современностью». Исторический лифт (турецкая и итальянская архитектура, традиционный турецкий кофе с видом на город), Агора — развалины античной Смирны, построенной ещё во времена Александра Македонского, район Кемералты с османской архитектурой, караван-дворцом и крытой торговой улицей, Площадь с Часовой башней — символ Измира, торговая улица Кыбрыс Шехитлери с турецким обедом на ваш выбор. Прогулка на пароходе и Центральный парк.',
            'City sightseeing tour “Izmir: between antiquity and the modern day”. The Historical Elevator (Turkish and Italian architecture, traditional Turkish coffee with a view over the city), the Agora — ruins of ancient Smyrna dating back to the days of Alexander the Great, the Kemeralti quarter with its Ottoman architecture, caravanserai and covered shopping street, Clock Tower Square — the symbol of Izmir, and the Kibris Sehitleri shopping street with a Turkish lunch of your choice. A ferry ride and Kulturpark.',
          ),
        },
        {
          time: t('18:00', '18:00'),
          text: t('Свободное время: турецкий пенный хамам или европейский шоппинг в моллах города.', 'Free time: a Turkish foam hammam or European-style shopping in the city malls.'),
        },
      ],
      body: [],
      pois: [
        { label: t('Часовая башня', 'Clock Tower'), image: { src: clockTowerImg, alt: t('Часовая башня Измира', 'Izmir Clock Tower') } },
        { label: t('Кемералты', 'Kemeralti'), image: { src: kemeraltiImg, alt: t('Базар Кемералты', 'Kemeralti bazaar') } },
      ],
      notes: [warn('Обед и напитки в свободное время — не входят в стоимость экскурсии', 'Lunch and drinks during free time are not included in the excursion price')],
      meals: { breakfast: true },
    },
    {
      day: 3,
      title: t('Магия Кушадасы — прогулка на яхте', 'The magic of Kusadasi — a yacht trip'),
      timeline: [
        {
          time: t('07:30', '07:30'),
          text: t(
            'Выезд из отеля на экскурсию «Магия Кушадасы». Морская прогулка на яхте под бодрящую музыку: захватывающие виды на лазурное побережье, живописные бухты и островки, кристально чистая вода Эгейского моря, купание в открытом море и вкусный обед с прохладительными напитками на борту.',
            'Departure from the hotel for the “Magic of Kusadasi” excursion. A yacht trip set to upbeat music: sweeping views of the turquoise coast, scenic bays and islets, the crystal-clear water of the Aegean, a swim in the open sea and a tasty lunch with soft drinks on board.',
          ),
        },
        {
          time: t('день', 'day'),
          text: t('Знакомство с уютным курортным Кушадасы: Пиратский замок и уникальный исчезающий цветок.', 'Exploring the cosy resort town of Kusadasi: the Pirate Castle and a unique vanishing flower.'),
        },
        { time: t('18:15', '18:15'), text: t('Возвращение в отель', 'Return to the hotel') },
      ],
      body: [],
      pois: [
        { label: t('яхта · Кушадасы', 'yacht · Kusadasi'), image: { src: yachtImg, alt: t('Яхта у Кушадасы', 'Yacht near Kusadasi') } },
        { label: t('Пиратский замок', 'Pirate Castle'), image: { src: pirateCastleImg, alt: t('Пиратский замок Кушадасы', 'Kusadasi Pirate Castle') } },
      ],
      notes: [good('Обед и безалкогольные напитки включены · с собой: пляжные вещи, деньги на сувениры, купальные принадлежности', 'Lunch and soft drinks included · bring: beachwear, money for souvenirs, swimwear')],
      meals: { breakfast: true, lunch: true },
    },
    {
      day: 4,
      title: t('Святыни, античность и винная деревня', 'Shrines, antiquity and a wine village'),
      timeline: [
        {
          time: t('08:00', '08:00'),
          text: t(
            'Выезд из отеля. Храм Артемиды — одно из семи чудес света, мечеть Иса-бея (XIV век), базилика и усыпальница Святого Иоанна.',
            'Departure from the hotel. The Temple of Artemis — one of the Seven Wonders of the Ancient World, the Isa Bey Mosque (14th century), and the basilica and tomb of St John.',
          ),
        },
        {
          time: t('Эфес', 'Ephesus'),
          text: t(
            'Гончарная мастерская турецкой и греческой керамики, прогулка по мраморным улицам древнего Эфеса: Библиотека Цельса, Большой театр, храмовые комплексы и античные бани. Обед среди оливковых рощ в аутентичном ресторане.',
            'A workshop of Turkish and Greek ceramics, then a walk along the marble streets of ancient Ephesus: the Library of Celsus, the Great Theatre, temple complexes and Roman baths. Lunch among olive groves at an authentic restaurant.',
          ),
        },
        {
          time: t('святыни', 'shrines'),
          text: t(
            'Дом Девы Марии — часовня, святой источник и Стена желаний. Финал — греческая деревня Шириндже с дегустацией знаменитых фруктовых вин.',
            'The House of the Virgin Mary — a chapel, a holy spring and the Wishing Wall. The finale — the Greek village of Sirince with a tasting of its famous fruit wines.',
          ),
        },
        { time: t('19:30', '19:30'), text: t('Возвращение в отель', 'Return to the hotel') },
      ],
      body: [],
      pois: [
        { label: t('Эфес · Библиотека Цельса', 'Ephesus · Library of Celsus'), image: { src: ephesusImg, alt: t('Библиотека Цельса', 'Library of Celsus') } },
        { label: t('Шириндже', 'Sirince'), image: { src: sirinceImg, alt: t('Деревня Шириндже', 'Sirince village') } },
      ],
      notes: [good('Обед входит в стоимость · напитки за отдельную плату', 'Lunch included · drinks payable separately')],
      meals: { breakfast: true, lunch: true },
    },
    {
      day: 5,
      title: t('Белая сказка Алачаты, история Чешме и морской бриз Илиджа', 'The white fairy tale of Alacati, the story of Cesme and the sea breeze of Ilica'),
      timeline: [],
      body: [
        t(
          'Экскурсия в Чешме — путешествие туда, где Эгейское море особенно прозрачно, а воздух наполнен солёной свежестью и солнцем. Город встречает мягким светом белых домов, узкими улочками и неспешным ритмом курортной жизни. Старинная крепость возвышается над городом, храня истории морских сражений; с её стен открывается вид на яхты в порту и бескрайнюю синь побережья. Рядом — Алачаты с каменными домами, увитыми бугенвиллией, где пахнет кофе, специями и морским ветром.',
          'An excursion to Cesme — a journey to where the Aegean is especially clear and the air is full of salty freshness and sun. The town greets you with the soft light of white houses, narrow lanes and the unhurried rhythm of resort life. An old fortress rises above the town, keeping the stories of sea battles; from its walls open views of yachts in the harbour and the endless blue of the coast. Nearby lies Alacati, with its stone houses draped in bougainvillea, where the air smells of coffee, spices and the sea breeze.',
        ),
        t(
          'В Илидже нас ждёт чистая песчаная набережная и долгое свободное время для купания и прогулок. Пляж Илыджа — один из лучших на Эгейском побережье: кристально чистая вода, мелкий золотистый песок и тёплые термальные источники, впадающие прямо в море. Возвращение в отель в 19:15.',
          'In Ilica a clean, sandy promenade and plenty of free time for swimming and walks await. Ilica Beach is one of the finest on the Aegean coast: crystal-clear water, fine golden sand and warm thermal springs that flow straight into the sea. Return to the hotel at 19:15.',
        ),
      ],
      pois: [
        // TODO: real photo.
        { label: t('Алачаты', 'Alacati'), image: placeholder('alacati-stone-houses', t('Алачаты', 'Alacati')) },
        { label: t('пляж Илиджа', 'Ilica Beach'), image: placeholder('ilica-beach', t('Пляж Илиджа', 'Ilica Beach')) },
      ],
      notes: [warn('Обед в свободное время — не входит в стоимость · с собой: купальные принадлежности', 'Lunch during free time is not included · bring: swimwear')],
      meals: { breakfast: true },
    },
    {
      day: 6,
      title: t('Памуккале — одно из семи чудес света', 'Pamukkale — one of the Seven Wonders'),
      timeline: [
        { time: t('07:00', '07:00'), text: t('Выезд на экскурсию «Памуккале — одно из семи чудес света». День исцеления души и тела в атмосфере времён Клеопатры.', 'Departure for the “Pamukkale — one of the Seven Wonders” excursion. A day of healing for body and soul, in an atmosphere from the time of Cleopatra.') },
        {
          time: t('10:30', '10:30'),
          text: t(
            'СПА-отель с целебными горячими источниками у подножия «хлопкового замка»: тёплая минеральная вода, горные пейзажи и полное спокойствие. После сытного обеда — Мастерская камня оникс, где мастера десятилетиями хранят семейные секреты обработки камня.',
            'A spa hotel with healing hot springs at the foot of the “cotton castle”: warm mineral water, mountain scenery and complete calm. After a hearty lunch, an onyx stone workshop where craftsmen have preserved their family secrets for decades.',
          ),
        },
        {
          time: t('14:00', '14:00'),
          text: t(
            'Памуккале: белоснежные каскадные террасы, прогулка босиком и панорамные виды. Древний Иераполис и легендарный Бассейн Клеопатры — купание в тёплой минеральной воде среди античных колонн. Наследие ЮНЕСКО.',
            'Pamukkale: snow-white cascading terraces, a barefoot walk and panoramic views. Ancient Hierapolis and the legendary Cleopatra’s Pool — a swim in warm mineral water among antique columns. A UNESCO World Heritage Site.',
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
      notes: [good('Обед входит в стоимость · напитки за отдельную плату · с собой: купальные принадлежности', 'Lunch included · drinks payable separately · bring: swimwear')],
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
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-user', label: t('Услуги профессионального русскоговорящего гида', 'A professional Russian-speaking guide') },
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-users', label: t('Сопровождение во время экскурсий', 'Escort throughout the excursions') },
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-ticket', label: t('Экскурсии со всеми входными билетами: музеи, археологические зоны и другие объекты', 'Excursions with all entry tickets: museums, archaeological sites and other attractions') },
    { kind: InclusionKind.INCLUDED, icon: 'i-lucide-shield-check', label: t('Медицинское страхование во время экскурсий', 'Medical insurance during the excursions') },
    { kind: InclusionKind.EXCLUDED, label: t('5 ужинов и 3 обеда', '5 dinners and 3 lunches') },
    { kind: InclusionKind.EXCLUDED, label: t('Медицинское страхование на время путешествия (вне экскурсий)', 'Medical insurance for the trip (outside excursions)') },
    { kind: InclusionKind.EXCLUDED, label: t('Авиабилеты', 'Flights') },
    { kind: InclusionKind.EXCLUDED, label: t('Дополнительные экскурсии', 'Optional extra excursions') },
    { kind: InclusionKind.EXCLUDED, label: t('Прочие личные расходы', 'Other personal expenses') },
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
      price: { amount: 1100, currency: 'EUR' },
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
    title: t('Жемчужины Эгейского побережья — LovEnRoute', 'Pearls of the Aegean Coast — LovEnRoute'),
    description: t(
      'Авторский тур по Эгейскому побережью Турции: Измир, Кушадасы, Эфес, Памуккале. 7 дней, русскоговорящий гид.',
      'A signature tour of Turkey’s Aegean coast: Izmir, Kusadasi, Ephesus and Pamukkale. 7 days with a Russian-speaking guide.',
    ),
    ogImage: heroImg,
  },
}
