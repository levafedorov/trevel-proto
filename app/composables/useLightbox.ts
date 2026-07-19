/**
 * Local open/index state for a media lightbox. Each consumer owns its own
 * instance and binds it to a `<MediaLightbox>`, so the gallery, the per-day
 * photos and the hero slider all reuse the same viewer without sharing state.
 *
 * Returns a reactive object (not refs) so `lightbox.open` / `lightbox.index`
 * bind straight to `v-model` on the viewer.
 */
export function useLightbox() {
  const lightbox = reactive({
    open: false,
    index: 0,
    show(at = 0) {
      lightbox.index = at
      lightbox.open = true
    },
  })

  return lightbox
}
