import { defineConfig, devices } from '@playwright/test'

/**
 * The suite runs against the prerendered bundle in `.output/public`, not the dev
 * server. Everything it guards — which image variants exist, which resource
 * hints are emitted, whether an /_ipx/ URL was generated during prerender —
 * only has meaning in the built artefact.
 *
 * Run `nuxt build` before `playwright test`.
 */
const PORT = 4173

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'line' : [['list']],

  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],

  webServer: {
    command: `node test/e2e/static-server.mjs`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
