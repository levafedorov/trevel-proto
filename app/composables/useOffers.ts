export interface TouristicOffer {
  id: string
  name: string
  shortDescription: string
  description: string
  location: string
  country: string
  image: string
  price: number
  duration: string
  durationDays: number
  category: 'beach' | 'city' | 'adventure' | 'cultural' | 'nature'
  active: boolean
  rating: number
  reviewCount: number
  highlights: string[]
}

const offersData: TouristicOffer[] = [
  {
    id: "1",
    name: "Istanbul: Where East Meets West",
    shortDescription: "Four days immersed in Byzantine mosaics, Ottoman splendour, and legendary bazaars.",
    description: "Istanbul is unlike any other city on earth — a place where two continents collide and twelve centuries of history pile one on top of another. This four-day journey begins at the Hagia Sophia, a cathedral-turned-mosque-turned-museum that still manages to silence every visitor who walks through its doors.\n\nWe move through the Topkapi Palace, the Grand Bazaar's labyrinthine alleys, and the meditative calm of the Blue Mosque. A private Bosphorus cruise at sunset lets you see the city from the water, watching the skyline shift from European to Asian shore. In the evenings, we eat where the locals eat — meyhanes in Beyoglu, fish restaurants in Karakoy, and street simit stalls everywhere.\n\nThis is Istanbul done right: slowly, personally, and with a guide who has lived here for years.",
    location: "Istanbul, Turkey",
    country: "Turkey",
    image: "https://picsum.photos/seed/istanbul-bosphorus/1200/800",
    price: 699,
    duration: "4 days",
    durationDays: 4,
    category: "city",
    active: true,
    rating: 4.9,
    reviewCount: 318,
    highlights: ["Hagia Sophia & Blue Mosque", "Topkapi Palace private tour", "Grand Bazaar with local guide", "Bosphorus sunset cruise"],
  },
  {
    id: "2",
    name: "Cappadocia: Sky & Stone",
    shortDescription: "Three magical days among fairy chimneys, ancient underground cities, and hot air balloons at dawn.",
    description: "Nothing in Turkey prepares you for Cappadocia. The landscape — carved by volcanic eruptions millions of years ago and shaped by thousands of years of human habitation — looks like something from another planet. Conical rock formations called fairy chimneys rise from the valleys, many of them hollowed out into homes, chapels, and entire underground cities.\n\nThe centrepiece of your stay is the early morning hot air balloon flight. Drifting over the Rose Valley as the sun rises is one of those rare travel experiences that exceeds all expectations. On the ground, we explore the Goreme Open-Air Museum with its cave churches adorned with Byzantine frescoes, descend into the underground city of Derinkuyu, and watch a local pottery master at work in Avanos.\n\nYou stay in a cave hotel carved directly into the rock — a night here, with its curved stone walls and its silence, stays with you long after you leave.",
    location: "Goreme, Cappadocia",
    country: "Turkey",
    image: "https://picsum.photos/seed/cappadocia-fairy/1200/800",
    price: 879,
    duration: "3 days",
    durationDays: 3,
    category: "adventure",
    active: true,
    rating: 5.0,
    reviewCount: 204,
    highlights: ["Hot air balloon at sunrise", "Goreme cave church frescoes", "Underground city of Derinkuyu", "Authentic cave hotel stay"],
  },
  {
    id: "3",
    name: "Turkish Riviera, Antalya",
    shortDescription: "Seven days along the turquoise coast — ancient ruins, crystal bays, and sun-soaked evenings.",
    description: "The Turkish Riviera stretches along the Mediterranean coast in a ribbon of turquoise sea, pine-covered mountains, and ancient ruins that appear so casually you stumble across a Roman theatre while looking for a place to swim. Antalya is the jewel of this coast — its old town, Kaleici, is a maze of cobblestone streets and Ottoman-era houses tumbling down to a harbour full of wooden gulets.\n\nWe take you to the waterfall gardens at Duden, where freshwater pours directly into the Mediterranean. We walk through Perge, one of the best-preserved Roman cities in the world, and explore the breathtaking ruins of Aspendos. A full day on a private wooden boat takes you to hidden coves accessible only by sea — places where the water is so clear you can see the bottom in twenty metres.\n\nThis is a trip for people who want beauty, history, and warmth in equal measure.",
    location: "Antalya, Turkey",
    country: "Turkey",
    image: "https://picsum.photos/seed/antalya-riviera/1200/800",
    price: 1199,
    duration: "7 days",
    durationDays: 7,
    category: "beach",
    active: true,
    rating: 4.8,
    reviewCount: 276,
    highlights: ["Kaleici old harbour district", "Private gulet boat day", "Ancient city of Perge", "Duden Waterfalls"],
  },
  {
    id: "4",
    name: "Pamukkale & Ephesus Heritage",
    shortDescription: "Five days between cotton-white thermal terraces and the ancient world's most complete Roman city.",
    description: "Two of Turkey's most extraordinary sights happen to be a short drive apart, and this five-day tour links them into a journey that spans geological time and human civilisation in equal measure.\n\nPamukkale — the Cotton Castle — is a hillside coated in brilliant white calcium carbonate terraces, each filled with warm turquoise thermal water. Bathing in these pools, looking out over the Menderes Valley, feels otherworldly. Above the terraces lie the ruins of Hierapolis, a Roman spa city that sent its wealthy inhabitants to these same waters two thousand years ago.\n\nEphesus is in another league entirely. Once the second-largest city in the Roman Empire, it is now the most complete ancient city open to visitors anywhere in the world. Walking down the marble-paved Curetes Street, past a library facade that would not look out of place on a Hollywood set, past temples and fountains and public bathhouses, it is impossible not to feel the weight of what once happened here.",
    location: "Pamukkale & Selcuk, Turkey",
    country: "Turkey",
    image: "https://picsum.photos/seed/pamukkale-white/1200/800",
    price: 899,
    duration: "5 days",
    durationDays: 5,
    category: "cultural",
    active: true,
    rating: 4.9,
    reviewCount: 189,
    highlights: ["Thermal pools at Pamukkale", "Ephesus Library of Celsus", "Hierapolis ancient spa city", "House of the Virgin Mary"],
  },
  {
    id: "5",
    name: "Bodrum Aegean Dream",
    shortDescription: "Six languid days on the Aegean — crusader castles, whitewashed villages, and sapphire bays.",
    description: "Bodrum occupies a peninsula that juts into the Aegean where the water shifts between impossible shades of blue and green. The town itself is anchored by its crusader castle, the Castle of St. Peter, which rises from the harbour and houses one of the world's great underwater archaeology museums — a collection so remarkable it alone justifies the trip.\n\nBeyond the castle, Bodrum unfolds into a series of whitewashed villages, each with its own personality: Turkbuku for its stylish beach clubs, Bitez for its windsurfers and fig orchards, Gumuslukofor its fish restaurants at the water's edge built on the ruins of the ancient city of Myndos.\n\nA day's sailing on a traditional gulet takes you to beaches that remain blissfully empty even in summer. In the evenings, the Bodrum nightlife is among the most animated in Turkey, but the real magic is in the quieter hours: breakfast on a rooftop terrace with a view of the castle and the castle's reflection in still water.",
    location: "Bodrum, Turkey",
    country: "Turkey",
    image: "https://picsum.photos/seed/bodrum-castle/1200/800",
    price: 1099,
    duration: "6 days",
    durationDays: 6,
    category: "beach",
    active: true,
    rating: 4.7,
    reviewCount: 142,
    highlights: ["Castle of St. Peter & museum", "Private gulet sailing", "Gumuslukoharborfront dining", "Hidden Aegean coves"],
  },
  {
    id: "6",
    name: "Trabzon & the Black Sea",
    shortDescription: "Seven days exploring the lush landscapes and Byzantine heritage of Turkey's Black Sea coast.",
    description: "The Black Sea coast of Turkey is one of the country's least-visited and most rewarding regions — a place of steep green mountains, tea plantations, dramatic sea cliffs, and a Byzantine heritage that sits quietly beneath the region's Ottoman mosques and modern fishing towns.\n\nTrabzon was once Trebizond, capital of the Empire of Trebizond, a Byzantine successor state that survived for more than two and a half centuries after Constantinople fell. The Hagia Sophia of Trebizond contains some of the finest Byzantine frescoes still visible in Turkey.\n\nFrom Trabzon, we drive into the mountains to Sumela Monastery, a spectacular complex built into a sheer cliff face above a forested gorge. The monastery, founded in the fourth century, clings to the rock as though it grew there. Further inland, the lake of Uzungol sits in a valley so green it looks artificially saturated — a favourite subject for landscape photographers and a perfect place to slow down for a day.",
    location: "Trabzon & Black Sea Coast",
    country: "Turkey",
    image: "https://picsum.photos/seed/trabzon-blacksea/1200/800",
    price: 1049,
    duration: "7 days",
    durationDays: 7,
    category: "nature",
    active: false,
    rating: 4.8,
    reviewCount: 67,
    highlights: ["Sumela Monastery cliff complex", "Uzungol mountain lake", "Byzantine Hagia Sophia frescoes", "Black Sea tea plantations"],
  },
]

export function useOffers() {
  const getOfferById = (id: string) => offersData.find(o => o.id === id) ?? null

  const offers = offersData

  const activeOffers = computed(() => offersData.filter(o => o.active))

  const recentOffers = computed(() => offersData.filter(o => o.active).slice(0, 3))

  return { offers, activeOffers, recentOffers, getOfferById }
}
