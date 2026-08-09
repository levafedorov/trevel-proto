import { expect, test } from '@playwright/test'

/**
 * @nuxt/icon defaults to fetching any icon it did not server-render from
 * `/api/_nuxt_icon/*`. There is no server on the bucket, so that request 404s
 * and the icon renders as an empty box — silently, and only in production.
 *
 * It bit the lightbox controls, which live behind `v-if="open"` and therefore
 * never appear in the prerendered HTML. `icon.provider: 'none'` plus
 * `clientBundle.scan` moves every icon into the client build; these tests
 * check the icons actually arrive, not merely that nothing was requested.
 */

async function isRendered(locator: import('@playwright/test').Locator) {
  return locator.evaluate((el) => {
    if (el.querySelector('svg') || el.tagName.toLowerCase() === 'svg') return true
    const style = getComputedStyle(el)
    // Nuxt UI renders Iconify in CSS mode: a mask-image carrying the glyph.
    const paint = [style.backgroundImage, style.maskImage, style.webkitMaskImage]
    return paint.some(v => v && v !== 'none')
  })
}

// Nuxt UI renders an icon as `<span class="iconify i-lucide:name">` — note the
// colon, which is the Iconify collection separator, not a hyphen.
const ICON = 'span.iconify'

test('server-rendered icons paint', async ({ page }) => {
  await page.goto('/')

  expect(await page.locator(ICON).count(), 'the home page should render icons at all').toBeGreaterThan(0)

  // `:visible` because the first icon in DOM order belongs to the desktop nav,
  // which is display:none at the mobile breakpoint.
  const icon = page.locator(`${ICON}:visible`).first()
  await expect(icon).toBeVisible()
  expect(await isRendered(icon), 'navbar icon should carry a glyph').toBe(true)
})

test('client-only lightbox controls paint', async ({ page }) => {
  const failed: string[] = []
  page.on('response', r => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`))

  await page.goto('/offers/aegean-pearls')
  await page.locator('.gallery button').first().click()

  const dialog = page.locator('[role="dialog"]')
  await expect(dialog).toBeVisible()

  // Close, previous and next — none of these exist in the prerendered HTML.
  const controls = dialog.locator(`button ${ICON}`)
  const count = await controls.count()
  expect(count, 'lightbox should render close + prev + next').toBeGreaterThanOrEqual(3)

  for (let i = 0; i < count; i++) {
    expect(await isRendered(controls.nth(i)), `lightbox control ${i} is blank`).toBe(true)
  }

  expect(failed, 'no icon may be fetched at runtime').toEqual([])
})
