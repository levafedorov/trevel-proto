/**
 * Builds the static site and uploads it to the Yandex Object Storage bucket.
 *
 * Runs on plain Node so the deploy travels with the repository — no system
 * AWS CLI to install on whichever machine happens to be doing the release.
 * Object Storage speaks the S3 API, so this is SigV4-signed REST.
 *
 *   node scripts/deploy.mjs [--skip-build]
 *
 * Credentials come from AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY, read from
 * the environment or from .env (gitignored — keep them there).
 */
import { createReadStream } from 'node:fs'
import { readFile, readdir, stat } from 'node:fs/promises'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { AwsClient } from 'aws4fetch'
import mime from 'mime'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const DIST = join(ROOT, '.output/public')

const BUCKET = process.env.DEPLOY_BUCKET || 'lovenroute.com'
const ENDPOINT = 'https://storage.yandexcloud.net'
const REGION = 'ru-central1'

// Hashed filenames under these prefixes can never change meaning, so they are
// safe to cache forever. Everything else — HTML above all — must revalidate:
// there is no CDN to purge, so a long max-age on a page would strand visitors
// on an old build with no way to push them off it.
const IMMUTABLE_PREFIXES = ['_nuxt/', '_fonts/']
const CACHE_IMMUTABLE = 'public, max-age=31536000, immutable'
const CACHE_REVALIDATE = 'public, max-age=0, must-revalidate'

const UPLOAD_CONCURRENCY = 8

async function loadDotEnv() {
  let raw
  try {
    raw = await readFile(join(ROOT, '.env'), 'utf8')
  } catch {
    return
  }
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (!match) continue
    const [, name, rawValue] = match
    if (process.env[name]) continue
    process.env[name] = rawValue.trim().replace(/^['"]|['"]$/g, '')
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const full = join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  }))
  return files.flat()
}

function build() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [join(ROOT, 'node_modules/nuxt/bin/nuxt.mjs'), 'generate'],
      { cwd: ROOT, stdio: 'inherit' },
    )
    child.on('error', reject)
    child.on('exit', code => code === 0
      ? resolve()
      : reject(new Error(`nuxt generate exited with code ${code}`)))
  })
}

/** Object keys already in the bucket, following continuation tokens. */
async function listRemote(client) {
  const keys = new Set()
  let token

  do {
    const url = new URL(`${ENDPOINT}/${BUCKET}`)
    url.searchParams.set('list-type', '2')
    if (token) url.searchParams.set('continuation-token', token)

    const res = await client.fetch(url, { method: 'GET' })
    if (!res.ok) throw new Error(`List failed: ${res.status} ${await res.text()}`)

    const xml = await res.text()
    for (const m of xml.matchAll(/<Key>([^<]+)<\/Key>/g)) keys.add(decodeXml(m[1]))

    const next = xml.match(/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/)
    token = next ? decodeXml(next[1]) : undefined
  } while (token)

  return keys
}

function decodeXml(value) {
  return value
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}

function cacheControlFor(key) {
  return IMMUTABLE_PREFIXES.some(p => key.startsWith(p))
    ? CACHE_IMMUTABLE
    : CACHE_REVALIDATE
}

async function upload(client, key, file) {
  const { size } = await stat(file)
  const res = await client.fetch(`${ENDPOINT}/${BUCKET}/${encodeURI(key)}`, {
    method: 'PUT',
    body: createReadStream(file),
    duplex: 'half',
    headers: {
      'content-type': mime.getType(file) || 'application/octet-stream',
      'content-length': String(size),
      'cache-control': cacheControlFor(key),
    },
  })
  if (!res.ok) throw new Error(`PUT ${key} -> ${res.status} ${await res.text()}`)
}

async function remove(client, key) {
  const res = await client.fetch(`${ENDPOINT}/${BUCKET}/${encodeURI(key)}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 404) {
    throw new Error(`DELETE ${key} -> ${res.status} ${await res.text()}`)
  }
}

/** Run `task` over `items`, at most `limit` at a time. */
async function pool(items, limit, task) {
  const queue = [...items]
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) await task(queue.shift())
  })
  await Promise.all(workers)
}

async function main() {
  await loadDotEnv()

  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY. Put the service '
      + 'account static key in .env (it is gitignored).',
    )
  }

  if (!process.argv.includes('--skip-build')) await build()

  const files = await walk(DIST).catch(() => {
    throw new Error(`No build output at ${DIST}`)
  })
  const local = new Map(files.map(f => [relative(DIST, f).replace(/\\/g, '/'), f]))

  const client = new AwsClient({
    accessKeyId,
    secretAccessKey,
    service: 's3',
    region: REGION,
  })

  console.log(`\n==> uploading ${local.size} files to ${BUCKET}`)
  let done = 0
  await pool([...local], UPLOAD_CONCURRENCY, async ([key, file]) => {
    await upload(client, key, file)
    done += 1
    if (done % 20 === 0 || done === local.size) console.log(`    ${done}/${local.size}`)
  })

  const remote = await listRemote(client)
  const stale = [...remote].filter(key => !local.has(key))
  if (stale.length) {
    console.log(`==> removing ${stale.length} stale objects`)
    await pool(stale, UPLOAD_CONCURRENCY, key => remove(client, key))
  }

  console.log(`\n==> done: http://${BUCKET}.website.yandexcloud.net\n`)
}

main().catch((error) => {
  console.error(`\nDeploy failed: ${error.message}\n`)
  process.exit(1)
})
