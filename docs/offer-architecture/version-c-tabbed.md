# Версия C — Вкладки / прогрессивное раскрытие

> Лучший UX для длинного контента. Навигация по разделам + постоянная панель брони.
> 📐 Редактируемый исходник: **`version-c-tabbed.drawio`** (страницы «Компоненты», «Модель навигации», «Состояния»).
> Домен-модель и обработка ошибок — см. [README](./README.md) / `domain-model.drawio`.

## Идея

Реальный тур — это **много контента** (7 дней программы, локации, что входит, даты, цена).
Один длинный скролл утомляет и прячет кнопку брони. Версия C разбивает контент на
именованные разделы с **навигацией** (табы или sticky scroll-spy меню):

`Обзор · Программа по дням · Что входит · Даты и цена · Отзывы`

Пользователь прыгает к нужному разделу, ссылка на раздел работает (`/offers/x#itinerary`),
а **панель брони закреплена** и видна всегда. Контент секций — те же компоненты, что в A;
добавляется слой **оркестрации навигации**.

## Архитектура компонентов

```mermaid
flowchart TD
    Page["offers/[id].vue"] --> Fetch["useOfferDetail(slug)"]
    Page --> Guard{"состояние?"}
    Guard -->|pending| Skel["OfferSkeleton"]
    Guard -->|error| ErrStates["NotFound / Error + retry"]
    Guard -->|success| Shell["OfferShell"]

    Shell --> Hero["OfferHero (общий, над навигацией)"]
    Shell --> Nav["SectionNav<br/>(sticky · scroll-spy · deep-link)"]
    Shell --> Panels["SectionOutlet<br/>(активный раздел)"]
    Shell --> Aside["BookingSidebar<br/>(sticky · всегда виден)"]

    Nav <-->|активный якорь| Panels
    Panels --> P1["OverviewPanel"]
    Panels --> P2["ItineraryPanel"]
    Panels --> P3["InclusionsPanel"]
    Panels --> P4["DeparturesPanel<br/>даты · места · цена"]
    Panels --> P5["ReviewsPanel"]

    P2 --> Day["ItineraryDayCard × N"]
    Aside --> Modal["BookingModal (существующий)"]

    classDef nav fill:#bbf7d0,stroke:#16a34a,color:#000
    classDef state fill:#fde68a,stroke:#d97706,color:#000
    class Nav,Panels nav
    class Skel,ErrStates state
```

**Модель навигации** — секции строятся динамически: в меню попадают только те разделы,
для которых есть данные (нет программы → нет вкладки «Программа»).

```mermaid
classDiagram
    class SectionDescriptor {
      +string key
      +string anchor
      +LocalizedText label
      +Component panel
      +bool hasData
    }
    class SectionNav {
      +SectionDescriptor[] visibleSections
      +string activeKey
      +scrollTo(anchor)
    }
    SectionNav "1" o-- "1..*" SectionDescriptor : показывает только hasData
```

**Структура файлов**

```
app/
  pages/offers/[id].vue
  components/offer/
    OfferShell.vue               # hero + nav + outlet + sidebar
    SectionNav.vue               # sticky навигация + scroll-spy
    panels/
      OverviewPanel.vue · ItineraryPanel.vue · InclusionsPanel.vue
      DeparturesPanel.vue · ReviewsPanel.vue
    ItineraryDayCard.vue
    BookingSidebar.vue
  composables/
    useOfferDetail.ts
    useSectionNav.ts             # активный раздел, scroll-spy, синхрон с URL-хэшем
```

## Состояния и edge-кейсы

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Ready: 200 OK
    Loading --> NotFound: 404
    Loading --> Error: 5xx / timeout
    Error --> Loading: retry()

    state Ready {
        [*] --> BuildNav
        BuildNav --> ShowSection: раздел hasData → в меню
        BuildNav --> HideSection: нет данных → скрыть вкладку
        ShowSection --> DeepLinked: URL с #anchor → открыть нужный раздел
        ShowSection --> Default: без хэша → первый раздел
        --
        [*] --> Booking
        Booking --> Disabled: COMING_SOON
        Booking --> Waitlist: SOLD_OUT
    }
```

**Особые случаи навигации:** если раздела нет — вкладка не показывается; если в URL
хэш на скрытый/несуществующий раздел — мягкий fallback на первый доступный.

## Плюсы и минусы

**Плюсы**
- Лучший UX для объёмного тура: контент не пугает длиной, бронь всегда под рукой.
- Deep-link на раздел (`#itinerary`) — удобно делиться и вести рекламу на конкретный блок.
- Меню само подстраивается под наполнение тура.

**Минусы**
- Сложнее A: scroll-spy, синхронизация с URL, состояние активной вкладки.
- На мобильном навигацию надо продумать (горизонтальный скролл табов / аккордеон).
- Табы могут «прятать» контент, снижая мотивацию читать всё (спорно для продаж).

## Готовность к CMS

CMS отдаёт ту же полную модель `Offer`; слой навигации строит разделы из наличия данных.
Панели — это секции из Версии A с добавленным якорем. Можно объединить с Версией B:
блоки группируются в разделы-вкладки. Хорошо работает, когда туры длинные и однотипные
по структуре, а приоритет — **usability и конверсия**.
