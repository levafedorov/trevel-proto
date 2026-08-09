import { expect, test } from '@playwright/test'

/**
 * Guards the image pipeline the site depends on for its scroll performance.
 *
 * The bug these tests exist for: every photograph used to be a Vite module
 * import, so Nitro emitted a `<link rel="prefetch" as="image">` for all 17 tour
 * photos on every page — 4.3 MB of full-size JPEG downloaded and decoded on the
 * main thread while the visitor was trying to scroll the hero, and competing
 * for bandwidth with the offer page's hero video.
 */

const PAGES = ['/', '/offers/aegean-pearls', '/about', '/contacts', '/dashboard'] as const

test.describe('resource hints', () => {
  for (const path of PAGES) {
    test(`${path} prefetches no images`, async ({ page }) => {
      await page.goto(path)

      const prefetched = await page.locator('link[rel="prefetch"][as="image"]').count()
      expect(prefetched, 'image prefetch hints must stay at zero — see file header').toBe(0)
    })
  }
})

test.describe('served formats', () => {
  test('every rendered <img> is a generated webp variant, not a source file', async ({ page }) => {
    await page.goto('/offers/aegean-pearls')

    // The lightbox <img> is deliberately excluded: it points at the original in
    // `public/` because it never renders during prerender and so has no ipx
    // variant. `[data-nuxt-img]` marks the ones @nuxt/image rendered.
    const sources = await page.locator('img[data-nuxt-img]').evaluateAll(
      els => els.map(el => el.getAttribute('src') ?? ''),
    )

    expect(sources.length).toBeGreaterThan(0)
    for (const src of sources) {
      expect(src, `${src} should be an ipx variant`).toContain('/_ipx/')
      expect(src, `${src} should be webp`).toContain('f_webp')
    }
  })

  test('ipx variants are actually served as webp', async ({ request, page }) => {
    await page.goto('/')

    const src = await page.locator('img[data-nuxt-img]').first().getAttribute('src')
    expect(src).toBeTruthy()

    const response = await request.get(src!)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('image/webp')
  })
})

test.describe('home hero', () => {
  test('is preloaded with a responsive srcset and stays small', async ({ page, request }) => {
    await page.goto('/')

    const preload = page.locator('link[rel="preload"][as="image"]')
    await expect(preload).toHaveCount(1)

    const srcset = await preload.getAttribute('imagesrcset')
    expect(srcset, 'hero must offer more than one width').toContain('320w')
    expect(srcset, 'hero must go up to the source width, or desktop gets a soft image').toContain('1536w')

    // The widest variant is what a desktop actually downloads. Before the
    // migration this was a 100 KB JPEG with no smaller alternative.
    const widest = srcset!.split(',').map(s => s.trim()).find(s => s.endsWith('1536w'))!.split(/\s+/)[0]
    const response = await request.get(widest)
    expect(response.status()).toBe(200)

    const bytes = (await response.body()).length
    expect(bytes, `hero at 1536px is ${Math.round(bytes / 1024)} KB`).toBeLessThan(200 * 1024)
  })

  test('renders and is visible above the fold', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('section img[data-nuxt-img]').first()).toBeVisible()
  })
})

test.describe('lazy loading', () => {
  test('offer page loads no photography eagerly', async ({ page }) => {
    await page.goto('/offers/aegean-pearls')

    const eager = await page.locator('img[data-nuxt-img]:not([loading="lazy"])').count()
    expect(eager, 'the offer hero is a video; every photo below it should be lazy').toBe(0)
  })
})

/**
 * The sharp edge of the ipxStatic provider: it only writes a variant it saw
 * rendered while crawling. The lightbox sits behind `v-if="open"`, so it never
 * renders during prerender — pointing it at an /_ipx/ URL would 404 in
 * production while working perfectly in dev.
 */
test.describe('lightbox', () => {
  test('opens and its full-size image really loads', async ({ page }) => {
    const failed: string[] = []
    page.on('response', (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`)
    })

    await page.goto('/offers/aegean-pearls')

    await page.locator('.gallery button').first().click()

    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()

    const image = dialog.locator('img')
    await expect(image).toBeVisible()

    // `naturalWidth` is 0 for an image the browser failed to decode, which is
    // exactly what a missing ipx variant would produce.
    await expect
      .poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0)

    expect(failed, 'no request may fail while the lightbox opens').toEqual([])
  })
})

test.describe('no broken requests', () => {
  for (const path of PAGES) {
    test(`${path} loads without a failed request`, async ({ page }) => {
      const failed: string[] = []
      page.on('response', (r) => {
        if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`)
      })

      await page.goto(path)
      await page.waitForLoadState('networkidle')

      expect(failed).toEqual([])
    })
  }
})
