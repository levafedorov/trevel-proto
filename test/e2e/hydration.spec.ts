import { expect, test } from '@playwright/test'

/**
 * Deferred hydration is invisible when it works and invisible when it breaks —
 * the markup is prerendered either way, so a component that never hydrates
 * still *looks* right and simply stops responding to clicks.
 *
 * These tests pin the half that matters: the thing still becomes interactive
 * when its trigger fires.
 */

/*
 * There is deliberately no "counts fewer JS requests before scrolling" test.
 * With `rootMargin: 200px` the first section below the fold is already inside
 * the observer's band at load on both viewports, so which chunks arrive when
 * depends on viewport geometry and network timing — it passed and failed on the
 * same code. A flaky test is worse than none; the byte-level effect was
 * measured once by hand instead, and what is pinned below is the behaviour that
 * actually has to keep working.
 */

test.describe('deferred components still work', () => {
  test('footer becomes interactive after scrolling to it', async ({ page }) => {
    await page.goto('/')

    const footerLink = page.locator('footer a[href="/about"]').first()
    await footerLink.scrollIntoViewIfNeeded()
    await expect(footerLink).toBeVisible()

    await footerLink.click()
    await expect(page).toHaveURL(/\/about$/)
  })

  test('recent offers below the fold navigate once hydrated', async ({ page }) => {
    await page.goto('/')

    const card = page.locator('a[href^="/offers/"]').first()
    await card.scrollIntoViewIfNeeded()
    await card.click()

    await expect(page).toHaveURL(/\/offers\//)
  })

  test('booking modal opens even though it hydrates on demand', async ({ page }) => {
    await page.goto('/offers/aegean-pearls')
    // The CTA label comes from i18n, which resolves the locale on the client,
    // so match it only once the page has settled.
    await page.waitForLoadState('networkidle')

    // The departures CTA rather than the sub-nav or the mobile bottom bar: those
    // two swap places at the lg breakpoint and are both pinned, so neither is
    // reliably on screen right after load. This one renders in every layout,
    // scrolls normally, and sits inside a `hydrate-on-visible` section — so
    // reaching it exercises the section's hydration and the modal's together.
    const cta = page
      .locator('#departures')
      .getByRole('button', { name: /Забронировать|Book now/i })
      .first()

    await cta.scrollIntoViewIfNeeded()
    await expect(cta).toBeVisible()
    await cta.click()

    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('itinerary photos open the lightbox after scrolling into view', async ({ page }) => {
    await page.goto('/offers/aegean-pearls')

    // Not the day accordion: that is a native <details>, which opens with no
    // JavaScript at all and would pass whether the section hydrated or not.
    // The per-day photo buttons need a real click handler, so they prove it.
    const section = page.locator('#itinerary')
    const photo = section.locator('.day-body-img button').first()

    await photo.scrollIntoViewIfNeeded()
    await expect(photo).toBeVisible()
    await photo.click()

    await expect(page.getByRole('dialog')).toBeVisible()
  })
})
