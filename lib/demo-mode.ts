/**
 * Demo Mode Detection and Configuration
 *
 * Determines when to use cached demo data vs live API calls
 * Supports automatic detection, manual override, and smart fallbacks
 */

export type DemoModePreference = "auto" | "live" | "demo"

export interface ApiKeys {
  openai?: string
  anthropic?: string
  google?: string
  groq?: string
}

export interface DemoModeConfig {
  enabled: boolean
  reason:
    | "no-api-keys"
    | "user-preference"
    | "demo-available"
    | "forced-live"
    | "auto-disabled"
  workflowHasDemoData: boolean
}

/**
 * Determine if demo mode should be used
 *
 * Decision logic:
 * 1. If user explicitly chose "demo" → always use demo
 * 2. If user explicitly chose "live" → never use demo (even without keys, will error)
 * 3. If "auto" (default):
 *    - No API keys + demo data available → use demo
 *    - No API keys + no demo data → error (can't execute)
 *    - Has API keys → use live
 */
export function shouldUseDemoMode(
  apiKeys: ApiKeys,
  workflowId?: string,
  userPreference: DemoModePreference = "auto"
): boolean {
  // Explicit user override
  if (userPreference === "demo") return true
  if (userPreference === "live") return false

  // Auto mode: check if any API keys are configured
  const hasAnyKey = Boolean(
    apiKeys.openai || apiKeys.anthropic || apiKeys.google || apiKeys.groq
  )

  // If no keys, we MUST use demo mode (if available)
  if (!hasAnyKey) {
    return true
  }

  // If user has keys, prefer live execution
  return false
}

/**
 * Get detailed demo mode configuration with reasoning
 */
export function getDemoModeConfig(
  apiKeys: ApiKeys,
  workflowId?: string,
  userPreference: DemoModePreference = "auto",
  demoDataAvailable: boolean = false
): DemoModeConfig {
  const hasAnyKey = Boolean(
    apiKeys.openai || apiKeys.anthropic || apiKeys.google || apiKeys.groq
  )

  // User forced demo mode
  if (userPreference === "demo") {
    return {
      enabled: true,
      reason: "user-preference",
      workflowHasDemoData: demoDataAvailable,
    }
  }

  // User forced live mode
  if (userPreference === "live") {
    return {
      enabled: false,
      reason: "forced-live",
      workflowHasDemoData: demoDataAvailable,
    }
  }

  // Auto mode logic
  if (!hasAnyKey) {
    if (demoDataAvailable) {
      return {
        enabled: true,
        reason: "no-api-keys",
        workflowHasDemoData: true,
      }
    }
    // No keys and no demo data - will error on execution
    return {
      enabled: false,
      reason: "auto-disabled",
      workflowHasDemoData: false,
    }
  }

  // Has API keys - use live mode
  return {
    enabled: false,
    reason: "forced-live",
    workflowHasDemoData: demoDataAvailable,
  }
}

/**
 * Get required API keys for a workflow based on node configurations
 */
export function getRequiredApiKeys(
  nodes: any[]
): (keyof ApiKeys)[] {
  const required = new Set<keyof ApiKeys>()

  for (const node of nodes) {
    const { type, data } = node

    // Text model nodes
    if (type === "textModel") {
      const model = data.model || ""
      if (model.includes("gpt") || model.includes("openai")) {
        required.add("openai")
      } else if (model.includes("claude")) {
        required.add("anthropic")
      } else if (model.includes("gemini") || model.includes("palm")) {
        required.add("google")
      } else if (model.includes("groq")) {
        required.add("groq")
      }
    }

    // Image generation nodes
    if (type === "imageGeneration") {
      const model = data.model || ""
      if (model.includes("dall-e")) {
        required.add("openai")
      } else if (model.includes("gemini") || model.includes("imagen")) {
        required.add("google")
      }
    }

    // Embedding nodes
    if (type === "embeddingModel") {
      const model = data.model || ""
      if (model.includes("openai") || model.includes("ada")) {
        required.add("openai")
      } else if (model.includes("voyage")) {
        required.add("openai") // Assuming Voyage uses OpenAI SDK
      }
    }

    // Audio nodes
    if (type === "audio") {
      required.add("openai") // TTS typically uses OpenAI
    }
  }

  return Array.from(required)
}

/**
 * Check if user has all required API keys for a workflow
 */
export function hasRequiredApiKeys(
  apiKeys: ApiKeys,
  nodes: any[]
): { hasAll: boolean; missing: string[] } {
  const required = getRequiredApiKeys(nodes)
  const missing = required.filter((key) => !apiKeys[key])

  return {
    hasAll: missing.length === 0,
    missing,
  }
}

/**
 * Get user-friendly message about demo mode status
 */
export function getDemoModeMessage(config: DemoModeConfig): string {
  if (config.enabled) {
    switch (config.reason) {
      case "no-api-keys":
        return "Running in Demo Mode - Add API keys in Settings to use live AI models"
      case "user-preference":
        return "Running in Demo Mode - Using cached demo data"
      case "demo-available":
        return "Demo Mode Available - Click 'Run Demo' to test without API keys"
      default:
        return "Running in Demo Mode"
    }
  } else {
    switch (config.reason) {
      case "forced-live":
        return "Running with Live AI Models"
      case "auto-disabled":
        return "No API keys configured and no demo data available"
      default:
        return "Live Mode"
    }
  }
}

/**
 * Get call-to-action for demo mode banner
 */
export function getDemoModeCTA(config: DemoModeConfig): {
  text: string
  action: "add-keys" | "try-demo" | "none"
} {
  if (config.enabled && config.reason === "no-api-keys") {
    return {
      text: "Add API Keys",
      action: "add-keys",
    }
  }

  if (!config.enabled && config.workflowHasDemoData) {
    return {
      text: "Try Demo Instead",
      action: "try-demo",
    }
  }

  return {
    text: "",
    action: "none",
  }
}
