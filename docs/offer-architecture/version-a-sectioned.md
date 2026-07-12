# Версия A — Секционная страница тура

> Простая, линейная, самый быстрый путь в продакшн.
> Домен-модель и обработка ошибок — см. [README](./README.md).

## Идея

Детальная страница тура — это **фиксированная последовательность секций** в заранее
заданном порядке. Каждая секция — отдельный самодостаточный компонент, который получает
свой срез данных и умеет скрываться, если данных нет. Порядок секций задан в коде.

Это ровно та модель, что уже есть в `app/pages/offers/[id].vue`, но разбитая на
переиспользуемые секции и посаженная на новую доменную модель.

## Архитектура компонентов

```mermaid
flowchart TD
    Page["offers/[id].vue<br/>(orchestrator)"] --> Fetch["useOfferDetail(slug)<br/>data · pending · error · retry"]

    Page --> Guard{"состояние?"}
    Guard -->|pending| Skel["OfferSkeleton"]
    Guard -->|error 404| NF["OfferNotFound"]
    Guard -->|error fetch| Err["OfferError + retry"]
    Guard -->|success| Layout["OfferLayout"]

    Layout --> S1["OfferHero<br/>фото · заголовок · цена от"]
    Layout --> S2["OfferOverview<br/>описание · регион · длительность"]
    Layout --> S3["OfferItinerary<br/>программа по дням"]
    Layout --> S4["OfferInclusions<br/>что входит / не входит"]
    Layout --> S5["OfferPractical<br/>заметки · что взять"]
    Layout --> S6["OfferDepartures<br/>даты заездов · места"]
    Layout --> Aside["BookingSidebar<br/>(sticky) цена · CTA"]

    S3 --> Day["ItineraryDayCard × N"]
    Day --> TL["DayTimeline"]
    Day --> POI["PoiList"]
    Aside --> Modal["BookingModal<br/>(существующий)"]

    classDef state fill:#fde68a,stroke:#d97706,color:#000
    classDef section fill:#e7e5e4,stroke:#78716c,color:#000
    class Skel,NF,Err state
    class S1,S2,S3,S4,S5,S6,Aside section
```

**Структура файлов**

```
app/
  pages/offers/[id].vue          # оркестратор: fetch + выбор состояния
  components/offer/
    OfferLayout.vue              # раскладка секций (порядок задан здесь)
    OfferHero.vue
    OfferOverview.vue
    OfferItinerary.vue
    ItineraryDayCard.vue
    DayTimeline.vue
    PoiList.vue
    OfferInclusions.vue
    OfferPractical.vue
    OfferDepartures.vue
    BookingSidebar.vue
    states/ OfferSkeleton.vue · OfferNotFound.vue · OfferError.vue
  composables/useOfferDetail.ts  # загрузка полной модели тура
```

## Состояния и edge-кейсы

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Ready: 200 OK
    Loading --> NotFound: 404
    Loading --> Error: 5xx / timeout
    Error --> Loading: retry()
    NotFound --> [*]: → каталог

    state Ready {
        [*] --> Renders
        Renders --> SectionShown: есть данные секции
        Renders --> SectionHidden: нет данных секции
        --
        [*] --> Bookable
        Bookable --> Disabled: availability = COMING_SOON
        Bookable --> Waitlist: availability = SOLD_OUT
    }
```

Каждая секция реализует правило «нет данных → не рендерюсь» (`v-if="hasData"`),
поэтому частично заполненный тур выглядит цельно.

## Плюсы и минусы

**Плюсы**
- Самая быстрая реализация — почти готова, нужно разбить текущую страницу на секции.
- Предсказуемый, «дизайнерски вылизанный» макет: порядок и вид секций под контролем.
- Минимум рисков «пустоты»: секции сами прячутся.

**Минусы**
- Порядок и набор секций меняет только разработчик (не контент-менеджер).
- Для нестандартного тура (например, без дней, но с большой галереей) нужен код.

## Готовность к CMS

CMS отдаёт **плоскую полную модель** `Offer`, страница сама раскладывает поля по
фиксированным секциям. CMS-редактор заполняет поля, но **не управляет версткой**.
Секционные компоненты далее переиспользуются в Версии B (как блоки) и C (как панели) —
поэтому A является безопасным первым шагом.
