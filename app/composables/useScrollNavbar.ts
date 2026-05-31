export function useScrollNavbar() {
  const isVisible = ref(true)
  const lastScrollY = ref(0)
  let hideTimer: ReturnType<typeof setTimeout> | null = null

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY.value && currentScrollY > 80) {
      isVisible.value = false
    } else {
      isVisible.value = true
    }

    lastScrollY.value = currentScrollY

    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      isVisible.value = true
    }, 600)
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (hideTimer) clearTimeout(hideTimer)
  })

  return { isVisible }
}
