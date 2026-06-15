/**
 * @jest-environment node
 */
import { webcrypto } from "node:crypto"
// Ensure the Web Crypto global exists in the Node test env (Node 18 doesn't expose it by default).
if (!(globalThis as any).crypto) (globalThis as any).crypto = webcrypto

import { encryptValue, decryptValue, encryptApiKeys, decryptApiKeys, isEncrypted } from "../encryption"

describe("encryption (AES-GCM round-trip)", () => {
  test("encryptValue → decryptValue returns the original (this is the bug the fix closes)", async () => {
    const secret = "ghp_abc123_DEF-456"
    const enc = await encryptValue(secret)
    expect(enc).not.toBe(secret)
    expect(enc.startsWith("encrypted:")).toBe(true)
    expect(await decryptValue(enc)).toBe(secret)
  })

  test("isEncrypted reflects the prefix", async () => {
    expect(isEncrypted("plain-value")).toBe(false)
    expect(isEncrypted(await encryptValue("x"))).toBe(true)
  })

  test("decryptValue passes legacy plaintext through unchanged (backward compatible)", async () => {
    expect(await decryptValue("sk-legacy-plaintext")).toBe("sk-legacy-plaintext")
  })

  test("random IV: two ciphertexts differ but both decrypt", async () => {
    const a = await encryptValue("same")
    const b = await encryptValue("same")
    expect(a).not.toBe(b)
    expect(await decryptValue(a)).toBe("same")
    expect(await decryptValue(b)).toBe("same")
  })

  test("encryptApiKeys / decryptApiKeys round-trip; empty values are skipped", async () => {
    const enc = await encryptApiKeys({ openai: "sk-o", anthropic: "sk-ant", google: "" })
    expect(enc.openai.startsWith("encrypted:")).toBe(true)
    expect(enc.google).toBeUndefined()
    const dec = await decryptApiKeys(enc)
    expect(dec.openai).toBe("sk-o")
    expect(dec.anthropic).toBe("sk-ant")
  })
})
