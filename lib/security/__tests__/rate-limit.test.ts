import { RateLimiter, MemoryRateLimitStore, rateLimitKey } from "../rate-limit"

describe("RateLimiter (sliding window, injected clock)", () => {
  test("allows up to the limit, blocks beyond, then resets after the window", async () => {
    let now = 1000
    const rl = new RateLimiter({ limit: 3, windowMs: 1000, now: () => now })

    expect((await rl.check("k")).allowed).toBe(true) // 1
    expect((await rl.check("k")).allowed).toBe(true) // 2
    const third = await rl.check("k") // 3
    expect(third.allowed).toBe(true)
    expect(third.remaining).toBe(0)
    expect((await rl.check("k")).allowed).toBe(false) // 4 → blocked

    now += 1001 // entire window elapses
    expect((await rl.check("k")).allowed).toBe(true) // allowed again
  })

  test("keys are isolated", async () => {
    const now = 0
    const rl = new RateLimiter({ limit: 1, windowMs: 1000, now: () => now })
    expect((await rl.check("a")).allowed).toBe(true)
    expect((await rl.check("a")).allowed).toBe(false)
    expect((await rl.check("b")).allowed).toBe(true)
  })

  test("reports remaining and resetMs", async () => {
    let now = 5000
    const rl = new RateLimiter({ limit: 2, windowMs: 1000, now: () => now })
    const first = await rl.check("k")
    expect(first.remaining).toBe(1)
    expect(first.limit).toBe(2)
    now += 400
    const second = await rl.check("k")
    expect(second.remaining).toBe(0)
    expect(second.resetMs).toBeLessThanOrEqual(1000)
    expect(second.resetMs).toBeGreaterThan(0)
  })
})

describe("rateLimitKey", () => {
  test("distinguishes ip from ip+token and is stable", () => {
    expect(rateLimitKey("1.2.3.4")).not.toBe(rateLimitKey("1.2.3.4", "tok"))
    expect(rateLimitKey("1.2.3.4", "tok")).toBe(rateLimitKey("1.2.3.4", "tok"))
    expect(rateLimitKey("")).toBe("anonymous")
  })
  test("does not leak the raw token", () => {
    expect(rateLimitKey("1.2.3.4", "super-secret-token")).not.toContain("super-secret-token")
  })
})

describe("MemoryRateLimitStore", () => {
  test("prune removes stale keys", () => {
    const store = new MemoryRateLimitStore()
    store.hit("k", 100, 1000)
    store.prune(2000, 1000) // 100 is older than 2000-1000=1000 → removed
    expect(store.hit("k", 2000, 1000).length).toBe(1) // fresh count after prune
  })
})
