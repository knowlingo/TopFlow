/**
 * Sliding-window rate limiter with a pluggable store.
 *
 * Default store is in-memory (per server instance). For multi-instance
 * durability, implement `RateLimitStore` against Redis / Vercel KV and pass it
 * to the limiter — that adapter is a documented follow-up (it requires a
 * dependency + env config) in docs/development/osv-scanner/01-p0-security-hardening.md.
 *
 * The clock is injectable for deterministic testing.
 */

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  /** Milliseconds until the window frees up for this key. */
  resetMs: number
}

export interface RateLimitStore {
  /**
   * Record a hit at `now` for `key` and return the timestamps (ms) still within
   * the trailing `windowMs` (including the just-recorded hit).
   */
  hit(key: string, now: number, windowMs: number): number[] | Promise<number[]>
}

/** In-memory sliding-window-log store (per process instance). */
export class MemoryRateLimitStore implements RateLimitStore {
  private hits = new Map<string, number[]>()

  hit(key: string, now: number, windowMs: number): number[] {
    const cutoff = now - windowMs
    const recent = (this.hits.get(key) || []).filter((t) => t > cutoff)
    recent.push(now)
    this.hits.set(key, recent)
    return recent
  }

  /** Drop keys with no hits inside the window (call periodically to bound memory). */
  prune(now: number, windowMs: number): void {
    const cutoff = now - windowMs
    for (const [key, arr] of this.hits) {
      const recent = arr.filter((t) => t > cutoff)
      if (recent.length) this.hits.set(key, recent)
      else this.hits.delete(key)
    }
  }
}

export interface RateLimiterOptions {
  limit: number
  windowMs: number
  store?: RateLimitStore
  now?: () => number
}

export class RateLimiter {
  private readonly limit: number
  private readonly windowMs: number
  private readonly store: RateLimitStore
  private readonly now: () => number

  constructor(opts: RateLimiterOptions) {
    this.limit = opts.limit
    this.windowMs = opts.windowMs
    this.store = opts.store || new MemoryRateLimitStore()
    this.now = opts.now || (() => Date.now())
  }

  async check(key: string): Promise<RateLimitResult> {
    const now = this.now()
    const hits = await this.store.hit(key, now, this.windowMs)
    const count = hits.length
    const oldest = hits[0] ?? now
    return {
      allowed: count <= this.limit,
      limit: this.limit,
      remaining: Math.max(0, this.limit - count),
      resetMs: Math.max(0, this.windowMs - (now - oldest)),
    }
  }
}

/** Stable rate-limit key from a client IP and an optional secret/token (hashed, never stored raw). */
export function rateLimitKey(ip: string, token?: string): string {
  return `${ip || "anonymous"}${token ? `:${hash(token)}` : ""}`
}

function hash(s: string): string {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0
  return h.toString(36)
}
