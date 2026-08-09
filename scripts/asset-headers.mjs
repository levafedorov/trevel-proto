/**
 * Response headers for the static bundle, shared by the deploy script and by
 * the e2e static server — so the suite asserts against the same rules the
 * bucket is actually given, not an approximation of them.
 */
import { open } from 'node:fs/promises'
import mime from 'mime'

/**
 * Magic-byte signatures, because the filename lies for generated images:
 * @nuxt/image keeps the source extension on every variant it writes, so a WebP
 * produced from `photo.jpeg` lands on disk as `_ipx/w_1024&f_webp/photo.jpeg`.
 * Trusting the extension there would label WebP bytes `image/jpeg`.
 */
function sniff(bytes) {
  if (bytes.length >= 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
    return 'image/webp'
  }
  if (bytes.length >= 12 && bytes.toString('ascii', 4, 12) === 'ftypavif') return 'image/avif'
  if (bytes.length >= 3 && bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) return 'image/jpeg'
  if (bytes.length >= 8 && bytes.toString('hex', 0, 8) === '89504e470d0a1a0a') return 'image/png'
  if (bytes.length >= 6 && bytes.toString('ascii', 0, 6).match(/^GIF8[79]a$/)) return 'image/gif'
  return null
}

export async function contentTypeFor(file) {
  let handle
  try {
    handle = await open(file, 'r')
    const buffer = Buffer.alloc(12)
    const { bytesRead } = await handle.read(buffer, 0, 12, 0)
    const sniffed = sniff(buffer.subarray(0, bytesRead))
    if (sniffed) return sniffed
  }
  catch {
    // Fall through to the extension.
  }
  finally {
    await handle?.close()
  }

  return mime.getType(file) || 'application/octet-stream'
}

// Hashed filenames under these prefixes can never change meaning, so they are
// safe to cache forever. Everything else — HTML above all — must revalidate:
// there is no CDN to purge, so a long max-age on a page would strand visitors
// on an old build with no way to push them off it.
const IMMUTABLE_PREFIXES = ['_nuxt/', '_fonts/']

// Photography: the generated variants under `_ipx/` and the originals under
// `images/` that the lightbox serves. These are NOT immutable — an ipx URL
// encodes the transform (`w_1024&f_webp&q_72`), not the source bytes, so
// replacing a photograph under the same filename reuses the same URL.
//
// A month is the trade: without it every photo costs a conditional request on
// every page view, which on a mobile connection is one round trip per image,
// sixteen of them on the offer page. To push a replaced photo out sooner, give
// the file a new name — that changes the URL and sidesteps the cache entirely.
const PHOTO_PREFIXES = ['_ipx/', 'images/']

const CACHE_IMMUTABLE = 'public, max-age=31536000, immutable'
const CACHE_PHOTO = 'public, max-age=2592000'
const CACHE_REVALIDATE = 'public, max-age=0, must-revalidate'

export function cacheControlFor(key) {
  if (IMMUTABLE_PREFIXES.some(p => key.startsWith(p))) return CACHE_IMMUTABLE
  if (PHOTO_PREFIXES.some(p => key.startsWith(p))) return CACHE_PHOTO
  return CACHE_REVALIDATE
}
