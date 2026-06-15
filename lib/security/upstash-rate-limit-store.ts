/**
 * lib/security/upstash-rate-limit-store.ts
 *
 * Redis-backed sliding-window store implementing RateLimitStore.
 * Drops in as a replacement for MemoryRateLimitStore — same interface,
 * durable across serverless instances.
 *
 * Algorithm: Redis sorted set keyed by `rl:{key}`.
 *   score  = timestamp (ms)
 *   member = "{timestamp}:{random}"  — unique to allow multiple hits per ms
 *
 * Pipeline per call (atomic enough for a rate limiter; ~1 RTT):
 *   ZADD   — record this hit
 *   ZREMRANGEBYSCORE — evict hits outside the window
 *   ZRANGE — read back surviving members
 *   EXPIRE — auto-TTL so idle keys don't accumulate
 */

import { Redis } from '@upstash/redis'
import type { RateLimitStore } from './rate-limit'

export class UpstashRateLimitStore implements RateLimitStore {
  private redis: Redis

  constructor(redis: Redis) {
    this.redis = redis
  }

  async hit(key: string, now: number, windowMs: number): Promise<number[]> {
    const rkey = `rl:${key}`
    const cutoff = now - windowMs
    const member = `${now}:${Math.random().toString(36).slice(2, 9)}`
    const ttlSeconds = Math.ceil((windowMs + 5_000) / 1_000)

    const pipeline = this.redis.pipeline()
    pipeline.zadd(rkey, { score: now, member })
    pipeline.zremrangebyscore(rkey, 0, cutoff)
    pipeline.zrange(rkey, 0, -1)
    pipeline.expire(rkey, ttlSeconds)

    const results = await pipeline.exec()
    const members = (results[2] as string[] | null) ?? []
    return members
      .map((m) => parseInt(m.split(':')[0], 10))
      .filter((t) => !isNaN(t))
      .sort((a, b) => a - b)
  }
}

/** Create an UpstashRateLimitStore from environment variables. Returns null if env vars are absent. */
export function createUpstashStore(): UpstashRateLimitStore | null {
  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new UpstashRateLimitStore(new Redis({ url, token }))
}
