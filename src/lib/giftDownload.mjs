import { createHash, timingSafeEqual } from 'node:crypto'

function isAuthorized(key, expectedHash) {
  if (
    typeof key !== 'string' ||
    !/^[A-Za-z0-9_-]{43}$/.test(key) ||
    !/^[a-f0-9]{64}$/.test(expectedHash || '')
  ) {
    return false
  }

  const actualHash = createHash('sha256').update(key).digest()
  return timingSafeEqual(actualHash, Buffer.from(expectedHash, 'hex'))
}

export function createGiftDownloadHandler({ readBlob, env = process.env }) {
  return async function giftDownload(req, res) {
    res.setHeader('Cache-Control', 'private, no-store, max-age=0')
    res.setHeader('CDN-Cache-Control', 'no-store')
    res.setHeader('Vercel-CDN-Cache-Control', 'no-store')
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive')
    res.setHeader('Referrer-Policy', 'no-referrer')
    res.setHeader('X-Content-Type-Options', 'nosniff')

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Allow', 'GET, HEAD')
      return res.status(405).end()
    }

    // Authenticate here, immediately before accessing the private file. The
    // pathname and Blob credential are server settings, never request inputs.
    if (
      !isAuthorized(req.query.key, env.ARTHUR_GIFT_KEY_SHA256) ||
      !env.ARTHUR_GIFT_BLOB_PATH ||
      !env.BLOB_READ_WRITE_TOKEN
    ) {
      return res.status(404).end()
    }

    try {
      const result = await readBlob(env.ARTHUR_GIFT_BLOB_PATH, {
        access: 'private',
        token: env.BLOB_READ_WRITE_TOKEN,
      })

      if (!result || result.statusCode !== 200) {
        return res.status(404).end()
      }

      // The gift is only 143 KB. Buffer before sending so a storage error never
      // leaves the recipient with a partially downloaded ZIP.
      const body = Buffer.from(await new Response(result.stream).arrayBuffer())
      res.setHeader('Content-Type', 'application/zip')
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="Berkeley-Mono.zip"',
      )
      res.setHeader('Content-Length', body.length)
      return res.status(200).end(req.method === 'HEAD' ? undefined : body)
    } catch {
      // Do not log the request URL, key, or storage credentials.
      return res.status(503).end()
    }
  }
}
