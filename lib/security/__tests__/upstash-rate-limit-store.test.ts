/**
 * @jest-environment node
 */

/**
 * Tests for UpstashRateLimitStore using a mock Redis client.
 *
 * We don't hit real Upstash in CI — instead we mock the pipeline so the
 * store logic (member format, eviction, sorted output) is exercised in
 * isolation. The real Redis integration is verified manually / in staging.
 */

import { UpstashRateLimitStore } from '../upstash-rate-limit-store'

// ---------------------------------------------------------------------------
// Mock Redis pipeline
// ---------------------------------------------------------------------------

function makeMockRedis(zrangeResult: string[]) {
  const calls: string[] = []

  const pipeline = {
    zadd: (..._: unknown[]) => { calls.push('zadd'); return pipeline },
    zremrangebyscore: (..._: unknown[]) => { calls.push('zremrangebyscore'); return pipeline },
    zrange: (..._: unknown[]) => { calls.push('zrange'); return pipeline },
    expire: (..._: unknown[]) => { calls.push('expire'); return pipeline },
    exec: async () => [1, 0, zrangeResult, 1],
  }

  const redis = { pipeline: () => pipeline } as unknown as import('@upstash/redis').Redis
  return { redis, calls }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('UpstashRateLimitStore', () => {
  it('returns timestamps parsed from member strings', async () => {
    const t1 = 1_000
    const t2 = 2_000
    const { redis } = makeMockRedis([`${t1}:abc`, `${t2}:def`])
    const store = new UpstashRateLimitStore(redis)

    const result = await store.hit('user:1', 3_000, 60_000)

    expect(result).toEqual([t1, t2])
  })

  it('returns results sorted ascending by timestamp', async () => {
    const { redis } = makeMockRedis(['3000:c', '1000:a', '2000:b'])
    const store = new UpstashRateLimitStore(redis)

    const result = await store.hit('user:1', 4_000, 60_000)

    expect(result).toEqual([1000, 2000, 3000])
  })

  it('issues ZADD, ZREMRANGEBYSCORE, ZRANGE, EXPIRE in pipeline', async () => {
    const { redis, calls } = makeMockRedis([])
    const store = new UpstashRateLimitStore(redis)

    await store.hit('user:1', 5_000, 60_000)

    expect(calls).toContain('zadd')
    expect(calls).toContain('zremrangebyscore')
    expect(calls).toContain('zrange')
    expect(calls).toContain('expire')
  })

  it('filters out NaN entries from malformed members', async () => {
    const { redis } = makeMockRedis(['1000:a', 'not-a-number', '2000:b'])
    const store = new UpstashRateLimitStore(redis)

    const result = await store.hit('user:1', 3_000, 60_000)

    expect(result).toEqual([1000, 2000])
  })

  it('returns empty array when pipeline zrange returns null', async () => {
    // Simulate a Redis client that returns null for zrange (empty key)
    const pipeline = {
      zadd: () => pipeline,
      zremrangebyscore: () => pipeline,
      zrange: () => pipeline,
      expire: () => pipeline,
      exec: async () => [1, 0, null, 1],
    }
    const redis = { pipeline: () => pipeline } as unknown as import('@upstash/redis').Redis
    const store = new UpstashRateLimitStore(redis)

    const result = await store.hit('user:1', 1_000, 60_000)

    expect(result).toEqual([])
  })

  it('integrates with RateLimiter: blocks when over limit', async () => {
    const { RateLimiter } = await import('../rate-limit')

    // zrange returns post-zadd state: 11 hits (10 existing + this one) → over limit of 10
    const postZadd = Array.from({ length: 11 }, (_, i) => `${1000 + i * 100}:x`)
    const { redis } = makeMockRedis(postZadd)
    const store = new UpstashRateLimitStore(redis)
    const limiter = new RateLimiter({ limit: 10, windowMs: 60_000, store, now: () => 2000 })

    const result = await limiter.check('test-key')

    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('integrates with RateLimiter: allows when under limit', async () => {
    const { RateLimiter } = await import('../rate-limit')

    // zrange returns post-zadd state: 6 hits (5 existing + this one) → under limit of 10
    const postZadd = Array.from({ length: 6 }, (_, i) => `${1000 + i * 100}:x`)
    const { redis } = makeMockRedis(postZadd)
    const store = new UpstashRateLimitStore(redis)
    const limiter = new RateLimiter({ limit: 10, windowMs: 60_000, store, now: () => 2000 })

    const result = await limiter.check('test-key')

    // 6 hits, limit 10 → remaining = 4
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(4)
  })
})
