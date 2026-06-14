import { isBlockedHost, checkOutboundUrl, assertSafeOutboundUrl, SsrfBlockedError } from "../ssrf"

describe("isBlockedHost", () => {
  test.each([
    "localhost",
    "127.0.0.1",
    "127.1.2.3",
    "0.0.0.0",
    "10.0.0.5",
    "192.168.1.10",
    "172.16.0.1",
    "172.31.255.255",
    "169.254.169.254", // cloud metadata
    "100.64.0.1", // CGNAT
    "::1",
    "fe80::1",
    "fd00::1",
    "::ffff:10.0.0.1", // IPv4-mapped private
    "metadata.google.internal",
    "db.internal",
    "service.local",
  ])("blocks %s", (host) => {
    expect(isBlockedHost(host)).toBe(true)
  })

  test.each([
    "api.github.com",
    "api.osv.dev",
    "example.com",
    "8.8.8.8",
    "93.184.216.34",
    "172.32.0.1", // just outside the private /12
    "172.15.0.1",
    "raw.githubusercontent.com",
  ])("allows %s", (host) => {
    expect(isBlockedHost(host)).toBe(false)
  })
})

describe("checkOutboundUrl", () => {
  test("blocks cloud-metadata endpoint", () => {
    expect(checkOutboundUrl("http://169.254.169.254/latest/meta-data/").safe).toBe(false)
  })
  test("blocks loopback with port", () => {
    expect(checkOutboundUrl("http://127.0.0.1:3000/internal").safe).toBe(false)
  })
  test("blocks non-http scheme", () => {
    expect(checkOutboundUrl("file:///etc/passwd").safe).toBe(false)
  })
  test("blocks invalid URL", () => {
    expect(checkOutboundUrl("not a url").safe).toBe(false)
  })
  test("allows public https", () => {
    expect(checkOutboundUrl("https://api.github.com/repos/x/y").safe).toBe(true)
  })
  test("allows public http", () => {
    expect(checkOutboundUrl("http://example.com/").safe).toBe(true)
  })
})

describe("assertSafeOutboundUrl", () => {
  test("throws SsrfBlockedError for private targets", () => {
    expect(() => assertSafeOutboundUrl("http://10.0.0.1/")).toThrow(SsrfBlockedError)
  })
  test("does not throw for public targets", () => {
    expect(() => assertSafeOutboundUrl("https://api.osv.dev/v1/query")).not.toThrow()
  })
})
