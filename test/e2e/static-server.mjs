/**
 * Serves `.output/public` the way Yandex Object Storage does, so the e2e suite
 * exercises the artefact that actually ships:
 *
 * - `/offers/aegean-pearls` resolves to `.../index.html` (no server rewrites)
 * - anything missing returns a real 404, so a test can catch an /_ipx/ variant
 *   that was never generated during prerender
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, normalize } from 'node:path'
import { cacheControlFor, contentTypeFor } from '../../scripts/asset-headers.mjs'

const ROOT = new URL('../../.output/public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const PORT = Number(process.env.PORT || 4173)

async function resolve(pathname) {
  // Strip the query ipx variants carry (`w_320&f_webp&q_72` is part of the path,
  // but Nuxt payload URLs do use a real query string).
  const decoded = decodeURIComponent(pathname.split('?')[0])
  const candidate = join(ROOT, normalize(decoded).replace(/^(\.\.[/\\])+/, ''))

  try {
    const info = await stat(candidate)
    if (info.isDirectory()) return join(candidate, 'index.html')
    return candidate
  }
  catch {
    // Directory-style route without a trailing slash.
    try {
      const withIndex = join(candidate, 'index.html')
      await stat(withIndex)
      return withIndex
    }
    catch {
      return null
    }
  }
}

createServer(async (req, res) => {
  const file = await resolve(req.url || '/')

  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not Found')
    return
  }

  try {
    const body = await readFile(file)
    res.writeHead(200, {
      'content-type': await contentTypeFor(file),
      'cache-control': cacheControlFor(file.slice(ROOT.length).replace(/\\/g, '/')),
      'content-length': body.length,
    })
    res.end(body)
  }
  catch {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not Found')
  }
}).listen(PORT, () => {
  console.log(`static server on http://127.0.0.1:${PORT}`)
})
