import { useEventListener, useIntersectionObserver } from '@vueuse/core'

/**
 * Scroll-spy for the sticky offer sub-nav. Watches each section with an
 * `IntersectionObserver` whose rootMargin defines a thin trigger band near the
 * top of the viewport; the first section in that band becomes active. Also
 * exposes smooth `scrollTo` for tab clicks.
 */
export function useSectionNav(ids: string[]) {
  const activeId = ref(ids[0] ?? '')
  const intersecting = reactive<Record<string, boolean>>({})
  const stops: Array<() => void> = []

  const start = () => {
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const { stop } = useIntersectionObserver(
        el,
        ([entry]) => {
          intersecting[id] = entry?.isIntersecting ?? false
          // Sections can overlap the band while scrolling; the lowest one in the
          // band is the one we've scrolled into, so pick the last intersecting.
          const active = [...ids].reverse().find(x => intersecting[x])
          if (active) activeId.value = active
        },
        // Active band ≈ from 96px below the top down to 65% of the viewport.
        { rootMargin: '-96px 0px -65% 0px', threshold: 0 },
      )
      stops.push(stop)
    })
  }

  onMounted(() => nextTick(start))
  onBeforeUnmount(() => stops.forEach(stop => stop()))

  // A short final section can't scroll its top into the trigger band, so the
  // observer never marks it active. When scrolled to the page bottom, force it.
  useEventListener('scroll', () => {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
    if (atBottom && ids.length) activeId.value = ids[ids.length - 1]!
  }, { passive: true })

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    // `scroll-mt-*` on the section supplies the sticky-nav offset.
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeId.value = id
  }

  return { activeId, scrollTo }
}
