/**
 * Shared navbar visibility driven by scroll direction: hides on scroll-down,
 * shows on scroll-up (and after a short pause). Module-scoped singleton so every
 * consumer — the navbar itself and the offer sub-nav that docks under it — reads
 * the exact same `isVisible`, staying perfectly in sync.
 */
const isVisible = ref(true)
let lastScrollY = 0
let hideTimer: ReturnType<typeof setTimeout> | null = null
let listeners = 0

function handleScroll() {
  const currentScrollY = window.scrollY

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    isVisible.value = false
  }
  else {
    isVisible.value = true
  }

  lastScrollY = currentScrollY

  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    isVisible.value = true
  }, 600)
}

export function useScrollNavbar() {
  onMounted(() => {
    if (listeners === 0) window.addEventListener('scroll', handleScroll, { passive: true })
    listeners++
  })

  onUnmounted(() => {
    listeners--
    if (listeners === 0) {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimer) clearTimeout(hideTimer)
    }
  })

  return { isVisible }
}
