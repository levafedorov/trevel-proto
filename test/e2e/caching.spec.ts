import { expect, test } from '@playwright/test'

/**
 * The bucket has no CDN in front of it, so `cache-control` set at upload time is
 * the only caching there is. `test/e2e/static-server.mjs` and
 * `scripts/deploy.mjs` both take these headers from `scripts/asset-headers.mjs`,
 * so what this suite asserts is what Object Storage is handed.
 */

function maxAge(header: string | undefined) {
  const m = /max-age=(\d+)/.exec(header ?? '')
  return m ? Number(m[1]) : null
}

test('generated image variants are cached for a month', async ({ page, request }) => {
  await page.goto('/')

  const src = await page.locator('img[data-nuxt-img]').first().getAttribute('src')
  expect(src).toContain('/_ipx/')

  const response = await request.get(src!)
  expect(response.status()).toBe(200)
  expect(maxAge(response.headers()['cache-control'])).toBe(2592000)
})

test('lightbox originals are cached for a month', async ({ request }) => {
  const response = await request.get('/images/first-tour/efes-1.jpeg')
  expect(response.status()).toBe(200)
  expect(maxAge(response.headers()['cache-control'])).toBe(2592000)
})

test('hashed build assets stay immutable', async ({ page, request }) => {
  await page.goto('/')

  const href = await page.locator('link[rel="stylesheet"]').first().getAttribute('href')
  expect(href).toContain('/_nuxt/')

  const response = await request.get(href!)
  expect(response.headers()['cache-control']).toContain('immutable')
})

test('HTML always revalidates', async ({ request }) => {
  // A cached page would strand visitors on an old build with nothing to purge.
  for (const path of ['/', '/offers/aegean-pearls/']) {
    const response = await request.get(path)
    expect(response.status()).toBe(200)
    expect(maxAge(response.headers()['cache-control']), `${path} must not be cached`).toBe(0)
  }
})
