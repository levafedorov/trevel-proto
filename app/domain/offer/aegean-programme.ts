/**
 * The Aegean coast programme, shared by every departure that runs it.
 *
 * Both tours are the same journey — Izmir, Kusadasi, Ephesus, Cesme, Pamukkale
 * — sold on different dates and lengths. Keeping the itinerary, the inclusions
 * and the practical notes here means a copy edit lands on both; duplicating the
 * file would let them drift the first time one of them is corrected.
 *
 * What varies per tour lives in the tour's own file: slug, dates, price,
 * duration, and which optional days are inserted before the departure day.
 *
 * Content is transcribed from the approved design (`docs/ux-ui/first-tour.html`).
 * Russian is the source language; English is a faithful translation. Replace
 * with a CMS fetch later (see offerRepository.ts).
 */
import { InclusionKind, NoteTone, PaymentKind } from './types'
import type { DayNote, InclusionItem, ItineraryDay, LocalizedText, Media, PaymentOption, PracticalItem } from './types'

// Photography lives in `public/` and is referenced by plain path, not imported:
// an import puts it in the Vite module graph and Nitro then emits a
// `<link rel="prefetch">` for every image on every page.
const PHOTOS = '/images/first-tour'

export const coverImg = `${PHOTOS}/izmir-bay-panorama.jpeg`

const hotelRoomImg = `${PHOTOS}/hotel-room.jpeg`
const hotelPoolImg = `${PHOTOS}/hotel-pool.jpeg`
const clockTowerImg = `${PHOTOS}/second-day.jpeg`
const kemeraltiImg = `${PHOTOS}/second-day-1.jpeg`
const yachtImg = `${PHOTOS}/kushadasy.jpeg`
const guletImg = `${PHOTOS}/kusadasy-1.jpeg`
const kusadasyLighthouseImg = `${PHOTOS}/kusadasy-lighthouse.jpeg`
const celsusImg = `${PHOTOS}/efes-celsus.jpeg`
const sirinceImg = `${PHOTOS}/efes-1.jpeg`
const alacatiImg = `${PHOTOS}/alacati-street.jpeg`
const seasideRestaurantImg = `${PHOTOS}/seaside-restaurant.jpeg`
const pamukkaleImg = `${PHOTOS}/pamukkale-terraces.jpeg`
const hierapolisImg = `${PHOTOS}/hierapolis-theatre.jpeg`
const terraceImg = `${PHOTOS}/restaurant-terrace.jpeg`
const izmirStreetImg = `${PHOTOS}/izmir-street.jpeg`
const izmirBayGullImg = `${PHOTOS}/izmir-bay-gull.jpeg`

/** Compact bilingual literal. */
export const t = (ru: string, en: string): LocalizedText => ({ ru, en })

/** Day-note builders: `good` for what's included, `warn` for caveats / extra cost. */
export const good = (ru: string, en: string): DayNote => ({ tone: NoteTone.POSITIVE, text: t(ru, en) })
export const warn = (ru: string, en: string): DayNote => ({ tone: NoteTone.CAUTION, text: t(ru, en) })

export const hero: Media = {
  src: coverImg,
  alt: t('Измирский залив и панорама города', 'The Bay of Izmir and the city skyline'),
}

export const gallery: Media[] = [
  { src: izmirStreetImg, alt: t('Улочки Измира', 'The streets of Izmir') },
  { src: izmirBayGullImg, alt: t('Измирский залив', 'The Bay of Izmir') },
  { src: yachtImg, alt: t('Кушадасы', 'Kusadasi') },
]

/**
 * Days 1–6: arrival, the city, the yacht, Ephesus, Cesme and Pamukkale. Every
 * tour runs these in this order; the days that follow differ per tour.
 */
export const coreDays: ItineraryDay[] = [
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
      { label: t('двухместный номер', 'double room'), image: { src: hotelRoomImg, alt: t('Двухместный номер в отеле', 'A double room at the hotel') } },
      { label: t('бассейн · СПА', 'pool · spa'), image: { src: hotelPoolImg, alt: t('Бассейн отеля', 'The hotel pool') } },
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
      { time: t('18:30', '18:30'), text: t('Возврат в отель.', 'Return to the hotel.') },
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
      { label: t('яхта · Кушадасы', 'yacht · Kusadasi'), image: { src: guletImg, alt: t('Гулет на якоре в бухте у Кушадасы', 'A gulet anchored in a bay near Kusadasi') } },
      { label: t('маяк · Кушадасы', 'lighthouse · Kusadasi'), image: { src: kusadasyLighthouseImg, alt: t('Маяк в Кушадасы', 'A lighthouse in Kusadasi') } },
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
      { label: t('Эфес · Библиотека Цельса', 'Ephesus · Library of Celsus'), image: { src: celsusImg, alt: t('Фасад Библиотеки Цельса в Эфесе', 'The facade of the Library of Celsus at Ephesus') } },
      { label: t('Шириндже', 'Sirince'), image: { src: sirinceImg, alt: t('Кафе в деревне Шириндже', 'A cafe in the village of Sirince') } },
    ],
    notes: [good('Обед входит в стоимость · напитки за отдельную плату', 'Lunch included · drinks payable separately')],
    meals: { breakfast: true, lunch: true },
  },
  {
    day: 5,
    title: t('Белая сказка Алачаты, история Чешме и морской бриз Илиджа', 'The white fairy tale of Alacati, the story of Cesme and the sea breeze of Ilica'),
    timeline: [
      { time: t('08:00', '08:00'), text: t('Завтрак перед экскурсией.', 'Breakfast before the excursion.') },
      {
        time: t('экскурсия', 'excursion'),
        text: t(
          'Экскурсия в Чешме — путешествие туда, где Эгейское море особенно прозрачно, а воздух наполнен солёной свежестью и солнцем. Город встречает мягким светом белых домов, узкими улочками и неспешным ритмом курортной жизни. Старинная крепость возвышается над городом, храня истории морских сражений; с её стен открывается вид на яхты в порту и бескрайнюю синь побережья. Рядом — Алачаты с каменными домами, увитыми бугенвиллией, где пахнет кофе, специями и морским ветром.',
          'An excursion to Cesme — a journey to where the Aegean is especially clear and the air is full of salty freshness and sun. The town greets you with the soft light of white houses, narrow lanes and the unhurried rhythm of resort life. An old fortress rises above the town, keeping the stories of sea battles; from its walls open views of yachts in the harbour and the endless blue of the coast. Nearby lies Alacati, with its stone houses draped in bougainvillea, where the air smells of coffee, spices and the sea breeze.',
        ),
      },
      {
        time: t('отдых', 'rest'),
        text: t(
          'В Илидже нас ждёт чистая песчаная набережная и долгое свободное время для купания и прогулок. Пляж Илыджа — один из лучших на Эгейском побережье: кристально чистая вода, мелкий золотистый песок и тёплые термальные источники, впадающие прямо в море. Возвращение в отель в 19:15.',
          'In Ilica a clean, sandy promenade and plenty of free time for swimming and walks await. Ilica Beach is one of the finest on the Aegean coast: crystal-clear water, fine golden sand and warm thermal springs that flow straight into the sea. Return to the hotel at 19:15.',
        ),
      },
    ],
    body: [],
    pois: [
      { label: t('Алачаты', 'Alacati'), image: { src: alacatiImg, alt: t('Улочка Алачаты с белёными домами', 'An Alacati lane with whitewashed houses') } },
      { label: t('Чешме · у моря', 'Cesme · by the sea'), image: { src: seasideRestaurantImg, alt: t('Терраса ресторана у самой воды', 'A restaurant terrace right at the water') } },
    ],
    notes: [warn('Обед в свободное время — не входит в стоимость · с собой: купальные принадлежности', 'Lunch during free time is not included · bring: swimwear')],
    meals: { breakfast: true },
  },
  {
    day: 6,
    title: t('Памуккале — одно из семи чудес света', 'Pamukkale — one of the Seven Wonders'),
    timeline: [
      { time: t('07:00', '07:00'), text: t('Берём с собой ланч-бокс с завтраком и выезжаем из отеля. День исцеления души и тела в атмосфере времён Клеопатры.', 'We take a packed breakfast with us and leave the hotel. A day of healing for body and soul, in an atmosphere from the time of Cleopatra.') },
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
      { label: t('Памуккале · травертины', 'Pamukkale · travertines'), image: { src: pamukkaleImg, alt: t('Белые травертины Памуккале с минеральной купелью', 'The white travertines of Pamukkale with a mineral pool') } },
      { label: t('Иераполис · античный театр', 'Hierapolis · the ancient theatre'), image: { src: hierapolisImg, alt: t('Античный театр Иераполиса', 'The ancient theatre of Hierapolis') } },
    ],
    notes: [good('Обед входит в стоимость · напитки за отдельную плату · с собой: купальные принадлежности', 'Lunch included · drinks payable separately · bring: swimwear')],
    meals: { breakfast: true, lunch: true },
  },
]

/**
 * A day off between the excursions and the flight home: the shops and the city
 * at the traveller's own pace. Only the longer tours carry it, so the day
 * number is passed in.
 */
export const freeDay = (day: number): ItineraryDay => ({
  day,
  title: t('Свободный день: шоппинг и прогулки', 'A free day: shopping and walking'),
  timeline: [
    { time: t('завтрак', 'breakfast'), text: t('Неспешный завтрак в отеле — сегодня никуда не нужно торопиться.', 'An unhurried breakfast at the hotel — there is nowhere to rush today.') },
    {
      time: t('день', 'day'),
      text: t(
        'День принадлежит только вам. Кемералты — старейший базар Измира, где в лабиринте крытых рядов пахнет специями, кофе и свежей кожей: здесь торгуются за сладости, ковры, серебро и турецкий текстиль. Кто предпочитает витрины поспокойнее — идёт на Кыбрыс Шехитлери с марками и кофейнями или в большой торговый центр с кондиционером.',
        'The day belongs to you. Kemeralti is the oldest bazaar in Izmir, a labyrinth of covered rows smelling of spices, coffee and fresh leather, where people haggle over sweets, carpets, silver and Turkish textiles. Anyone who prefers calmer shop windows heads to Kibris Sehitleri with its brands and coffee houses, or to a large air-conditioned mall.',
      ),
    },
    {
      time: t('вечер', 'evening'),
      text: t(
        'Ближе к закату — набережная Кордон: длинная приморская аллея, где местные катаются на велосипедах, сидят на траве у воды и ждут, когда солнце сядет за залив. Кофе с видом на яхты, ужин в выбранном вами месте и тихое возвращение в отель.',
        'Towards sunset, the Kordon embankment: a long seaside promenade where locals cycle, sit on the grass by the water and wait for the sun to drop behind the bay. Coffee with a view of the yachts, dinner wherever you choose, and a quiet walk back to the hotel.',
      ),
    },
  ],
  body: [],
  pois: [
    { label: t('Кемералты · базар', 'Kemeralti · the bazaar'), image: { src: kemeraltiImg, alt: t('Базар Кемералты', 'Kemeralti bazaar') } },
    { label: t('улицы Измира', 'the streets of Izmir'), image: { src: izmirStreetImg, alt: t('Улочки Измира', 'The streets of Izmir') } },
  ],
  notes: [
    warn('Обед, ужин и покупки — за свой счёт · гид на связи, если понадобится помощь', 'Lunch, dinner and any purchases are at your own expense · your guide stays reachable if you need help'),
  ],
  meals: { breakfast: true },
})

/** The last morning: breakfast, a little time, and the airport. */
export const departureDay = (day: number): ItineraryDay => ({
  day,
  title: t('Свободное время · вылет', 'Free time · departure'),
  timeline: [],
  body: [t('Заключительный завтрак в отеле, свободное время и трансфер в аэропорт.', 'A final breakfast at the hotel, free time and a transfer to the airport.')],
  pois: [
    { label: t('свободное утро', 'a free morning'), image: { src: terraceImg, alt: t('Терраса под бугенвиллеей', 'A terrace under bougainvillea') } },
  ],
  notes: [],
  meals: { breakfast: true },
})

export const inclusions: InclusionItem[] = [
  { kind: InclusionKind.INCLUDED, icon: 'i-lucide-utensils', label: t('Завтраки в отеле, ужин и обеды по программе экскурсий', 'Breakfasts at the hotel, plus the dinner and lunches in the excursion programme') },
  { kind: InclusionKind.INCLUDED, icon: 'i-lucide-car-front', label: t('Трансфер в аэропорт и обратно', 'Airport transfers both ways') },
  { kind: InclusionKind.INCLUDED, icon: 'i-lucide-user', label: t('Услуги профессионального русскоговорящего гида', 'A professional Russian-speaking guide') },
  { kind: InclusionKind.INCLUDED, icon: 'i-lucide-users', label: t('Сопровождение во время экскурсий', 'Escort throughout the excursions') },
  { kind: InclusionKind.INCLUDED, icon: 'i-lucide-ticket', label: t('Экскурсии со всеми входными билетами: музеи, археологические зоны и другие объекты', 'Excursions with all entry tickets: museums, archaeological sites and other attractions') },
  { kind: InclusionKind.INCLUDED, icon: 'i-lucide-shield-check', label: t('Медицинское страхование во время экскурсий', 'Medical insurance during the excursions') },
  { kind: InclusionKind.INCLUDED, icon: 'i-lucide-headset', label: t('Поддержка куратора 24/7', 'A coordinator on call 24/7') },
  { kind: InclusionKind.EXCLUDED, label: t('Ужины и обеды, не включённые в программу экскурсий', 'Dinners and lunches not covered by the excursion programme') },
  { kind: InclusionKind.EXCLUDED, label: t('Медицинское страхование на время путешествия (вне экскурсий)', 'Medical insurance for the trip (outside excursions)') },
  { kind: InclusionKind.EXCLUDED, label: t('Авиабилеты', 'Flights') },
  { kind: InclusionKind.EXCLUDED, label: t('Дополнительные экскурсии', 'Optional extra excursions') },
  { kind: InclusionKind.EXCLUDED, label: t('Прочие личные расходы', 'Other personal expenses') },
]

export const practicalNotes: LocalizedText[] = [
  t(
    'Нами будут предложены дополнительные экскурсии за доплату.',
    'We will offer optional extra excursions at additional cost.',
  ),
  t(
    'Для поездки обязательно: загранпаспорт сроком не менее 120 дней с даты въезда в Турцию.',
    'Required for the trip: a passport valid for at least 120 days from the date of entry into Turkey.',
  ),
]

export const practicalInfo: PracticalItem[] = [
  { icon: '🩱', label: t('Купальные принадлежности (дни 3, 5, 6)', 'Swimwear (days 3, 5, 6)') },
  { icon: '💶', label: t('Деньги на обеды и сувениры', 'Money for lunches and souvenirs') },
  { icon: '☀️', label: t('Лёгкая одежда, удобная обувь и головной убор', 'Light clothing, comfortable shoes and a hat') },
  { icon: '⏱️', label: t('Время в программе экскурсии — примерное', 'Times in the itinerary are approximate') },
]

export const paymentOptions: PaymentOption[] = [
  { kind: PaymentKind.RUB_BY_RATE, label: t('Оплата в рублях по курсу', 'Payment in rubles at the current rate') },
  { kind: PaymentKind.BANK_INSTALLMENT, label: t('Рассрочка от банка', 'Bank instalments') },
  { kind: PaymentKind.INTERNAL_INSTALLMENT, label: t('Внутренняя рассрочка', 'In-house instalments') },
]

export const paymentNote = t(
  'оплата в рублях по курсу · рассрочка от банка или внутренняя',
  'payment in rubles at the current rate · bank or in-house instalments',
)
