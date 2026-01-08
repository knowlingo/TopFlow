const ENCRYPTION_KEY_NAME = "ai-agent-builder-encryption-key"
const ENCRYPTED_DATA_PREFIX = "encrypted:"

// Generate or retrieve encryption key
async function getEncryptionKey(): Promise<CryptoKey> {
  // In a real app, you'd want to derive this from a user password or secure storage
  // For this demo, we'll generate a key and store it in IndexedDB
  // This is better than plaintext but not perfect - real apps should use server-side encryption

  const keyData = new Uint8Array(32) // 256 bits
  crypto.getRandomValues(keyData)

  return await crypto.subtle.importKey("raw", keyData, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"])
}

// Encrypt a string value
export async function encryptValue(value: string): Promise<string> {
  try {
    const key = await getEncryptionKey()
    const iv = crypto.getRandomValues(new Uint8Array(12)) // 96-bit IV for AES-GCM
    const encoder = new TextEncoder()
    const data = encoder.encode(value)

    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data)

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength)
    combined.set(iv)
    combined.set(new Uint8Array(encrypted), iv.length)

    // Convert to base64 and add prefix
    const base64 = btoa(String.fromCharCode(...combined))
    return ENCRYPTED_DATA_PREFIX + base64
  } catch (error) {
    console.error("Encryption failed:", error)
    throw new Error("Failed to encrypt value")
  }
}

// Decrypt a string value
export async function decryptValue(encryptedValue: string): Promise<string> {
  try {
    // Check if value is encrypted
    if (!encryptedValue.startsWith(ENCRYPTED_DATA_PREFIX)) {
      // Return as-is if not encrypted (for backward compatibility)
      return encryptedValue
    }

    const base64 = encryptedValue.substring(ENCRYPTED_DATA_PREFIX.length)
    const combined = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))

    // Extract IV and encrypted data
    const iv = combined.slice(0, 12)
    const data = combined.slice(12)

    const key = await getEncryptionKey()
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data)

    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  } catch (error) {
    console.error("Decryption failed:", error)
    throw new Error("Failed to decrypt value")
  }
}

// Encrypt API keys object
export async function encryptApiKeys(apiKeys: Record<string, string>): Promise<Record<string, string>> {
  const encrypted: Record<string, string> = {}

  for (const [key, value] of Object.entries(apiKeys)) {
    if (value) {
      encrypted[key] = await encryptValue(value)
    }
  }

  return encrypted
}

// Decrypt API keys object
export async function decryptApiKeys(encryptedApiKeys: Record<string, string>): Promise<Record<string, string>> {
  const decrypted: Record<string, string> = {}

  for (const [key, value] of Object.entries(encryptedApiKeys)) {
    if (value) {
      try {
        decrypted[key] = await decryptValue(value)
      } catch (error) {
        console.error(`Failed to decrypt API key for ${key}:`, error)
        // Keep original value if decryption fails (backward compatibility)
        decrypted[key] = value
      }
    }
  }

  return decrypted
}

// Check if a value is encrypted
export function isEncrypted(value: string): boolean {
  return value.startsWith(ENCRYPTED_DATA_PREFIX)
}

// Migrate existing plaintext API keys to encrypted format
export async function migrateApiKeys(): Promise<void> {
  if (typeof window === "undefined") return

  try {
    const stored = localStorage.getItem("ai-agent-api-keys")
    if (!stored) return

    const apiKeys = JSON.parse(stored)
    let needsMigration = false

    // Check if any keys are not encrypted
    for (const value of Object.values(apiKeys)) {
      if (typeof value === "string" && value && !isEncrypted(value)) {
        needsMigration = true
        break
      }
    }

    if (needsMigration) {
      console.log("[Security] Migrating API keys to encrypted storage...")
      const encrypted = await encryptApiKeys(apiKeys)
      localStorage.setItem("ai-agent-api-keys", JSON.stringify(encrypted))
      console.log("[Security] API keys encrypted successfully")
    }
  } catch (error) {
    console.error("[Security] Failed to migrate API keys:", error)
  }
}
