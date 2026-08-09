import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineNuxtModule } from 'nuxt/kit'

/**
 * Writes sitemap.xml from the routes Nitro actually prerendered.
 *
 * Deriving it from the prerender result rather than from the offer repository
 * keeps the sitemap correct for free: every tour added to the repository shows
 * up as a crawled route, and nothing that failed to build can leak into the
 * sitemap.
 */
export default defineNuxtModule({
  meta: { name: 'sitemap' },

  setup(_options, nuxt) {
    const siteUrl = String(nuxt.options.runtimeConfig.public.siteUrl).replace(/\/$/, '')
    const routes = new Set<string>()

    nuxt.hook('nitro:init', (nitro) => {
      nitro.hooks.hook('prerender:generate', (route) => {
        // Skip failures, payload sidecars and the SPA/error fallbacks — none of
        // them are addressable pages a crawler should see.
        if (route.error) return
        if (!route.route.startsWith('/')) return

        // Payload sidecars arrive as `/about/_payload.json?<build-id>`, so the
        // query has to go before the extension test can see the `.json`.
        const path = route.route.split('?')[0]!
        if (/\.[a-z0-9]+$/i.test(path)) return

        routes.add(path)
      })

      nitro.hooks.hook('close', async () => {
        if (!routes.size) return

        const urls = [...routes].sort().map(route => (
          `  <url><loc>${siteUrl}${route === '/' ? '/' : route}</loc></url>`
        ))

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          '</urlset>',
          '',
        ].join('\n')

        const dir = nitro.options.output.publicDir
        await writeFile(join(dir, 'sitemap.xml'), xml, 'utf8')
        await writeFile(
          join(dir, 'robots.txt'),
          `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
          'utf8',
        )

        nitro.logger.success(`sitemap.xml — ${routes.size} routes`)
      })
    })
  },
})
