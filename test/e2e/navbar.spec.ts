import { expect, test } from '@playwright/test'

/**
 * The header does not move. It used to hide on scroll-down and return on
 * scroll-up and on a 600ms timer, which meant a full-width blurred strip
 * sliding across the hero throughout normal reading — a flick sent it away, the
 * pause to read brought it back, eight movements over four flicks. Thresholds
 * did not fix it because the movement itself was the problem.
 *
 * What is left: it is always there, and its background turns solid once the
 * page has scrolled. These tests pin "never moves", which is the whole point.
 */

const HEADER = 'header'

async function top(page: import('@playwright/test').Page) {
  return page.locator(HEADER).evaluate(el => Math.round(el.getBoundingClientRect().top))
}

async function scrollTo(page: import('@playwright/test').Page, y: number) {
  await page.evaluate(v => window.scrollTo(0, v), y)
  await page.waitForTimeout(250)
}

test('stays pinned to the top through any scrolling', async ({ page }) => {
  await page.goto('/')
  expect(await top(page)).toBe(0)

  // Down, further down, back up, and a twitch — the header must not budge.
  for (const y of [0, 60, 400, 1200, 600, 597, 1400, 0]) {
    await scrollTo(page, y)
    expect(await top(page), `header moved at scrollY=${y}`).toBe(0)
  }
})

test('never animates its own position', async ({ page }) => {
  await page.goto('/')

  const transition = await page.locator(HEADER).evaluate(
    el => getComputedStyle(el).transitionProperty,
  )

  // `transform` would mean it slides; `all` would drag `backdrop-filter` into
  // the transition and animate the blur radius.
  expect(transition).not.toContain('transform')
  expect(transition).not.toBe('all')
})

test('turns solid once scrolled, and back at the top', async ({ page }) => {
  await page.goto('/')

  const isSolid = () => page.locator(HEADER).evaluate(el => el.className.includes('shadow-sm'))

  expect(await isSolid(), 'transparent over the hero').toBe(false)

  await scrollTo(page, 200)
  expect(await isSolid(), 'solid once scrolled').toBe(true)

  await scrollTo(page, 0)
  expect(await isSolid(), 'transparent again at the top').toBe(false)
})

test('does not flicker while sitting on the threshold', async ({ page }) => {
  await page.goto('/')
  await scrollTo(page, 200)

  // Between the two thresholds (16 and 48) the state must hold, whichever side
  // it was approached from — a single threshold would toggle here.
  for (const y of [40, 30, 20, 30, 40]) {
    await scrollTo(page, y)
    expect(
      await page.locator(HEADER).evaluate(el => el.className.includes('shadow-sm')),
      `flipped at scrollY=${y}`,
    ).toBe(true)
  }
})
