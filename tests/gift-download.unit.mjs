import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { test } from 'node:test'
import { createGiftDownloadHandler } from '../src/lib/giftDownload.mjs'

const key = 'test-key-'.padEnd(43, 'a')
const env = {
  ARTHUR_GIFT_KEY_SHA256: createHash('sha256').update(key).digest('hex'),
  ARTHUR_GIFT_BLOB_PATH: 'gifts/arthur/example.zip',
  BLOB_READ_WRITE_TOKEN: 'test-storage-credential',
}
const zip = Buffer.from('PK\u0003\u0004test zip contents')

async function request({
  method = 'GET',
  query = { key },
  config = env,
  failure,
} = {}) {
  const reads = []
  const res = {
    headers: {},
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value
    },
    status(value) {
      this.statusCode = value
      return this
    },
    end(body) {
      this.body = body
      return this
    },
  }
  const handler = createGiftDownloadHandler({
    env: config,
    readBlob: async (...args) => {
      reads.push(args)
      if (failure) throw new Error('Storage unavailable')
      return { statusCode: 200, stream: new Response(zip).body }
    },
  })
  await handler({ method, query }, res)
  return { ...res, reads }
}

test('valid link returns the exact ZIP attachment and prevents caching', async () => {
  const res = await request({ query: { key, path: 'another-file.zip' } })
  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, zip)
  assert.equal(res.headers['content-type'], 'application/zip')
  assert.equal(res.headers['content-length'], zip.length)
  assert.equal(
    res.headers['content-disposition'],
    'attachment; filename="Berkeley-Mono.zip"',
  )
  assert.match(res.headers['cache-control'], /no-store/)
  assert.equal(res.headers['vercel-cdn-cache-control'], 'no-store')
  assert.deepEqual(res.reads, [
    [
      env.ARTHUR_GIFT_BLOB_PATH,
      {
        access: 'private',
        token: env.BLOB_READ_WRITE_TOKEN,
      },
    ],
  ])
})

test('missing, wrong, duplicate, and malformed keys never access storage', async () => {
  for (const query of [
    {},
    { key: 'b'.repeat(43) },
    { key: [key, key] },
    { key: 'short' },
  ]) {
    const res = await request({ query })
    assert.equal(res.statusCode, 404)
    assert.deepEqual(res.reads, [])
    assert.match(res.headers['cache-control'], /no-store/)
  }
})

test('missing server configuration fails closed', async () => {
  for (const field of Object.keys(env)) {
    const res = await request({ config: { ...env, [field]: '' } })
    assert.equal(res.statusCode, 404)
    assert.deepEqual(res.reads, [])
  }
})

test('HEAD exposes attachment headers without sending the file body', async () => {
  const res = await request({ method: 'HEAD' })
  assert.equal(res.statusCode, 200)
  assert.equal(res.headers['content-length'], zip.length)
  assert.equal(res.body, undefined)
})

test('unsupported methods do not access storage', async () => {
  const res = await request({ method: 'POST' })
  assert.equal(res.statusCode, 405)
  assert.equal(res.headers.allow, 'GET, HEAD')
  assert.deepEqual(res.reads, [])
})

test('storage failures return an empty noncacheable error', async () => {
  const res = await request({ failure: true })
  assert.equal(res.statusCode, 503)
  assert.equal(res.body, undefined)
  assert.match(res.headers['cache-control'], /no-store/)
})
