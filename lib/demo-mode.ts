/**
 * Demo Mode Detection and Configuration
 *
 * Determines when to use cached demo data vs live API calls
 * Supports automatic detection, manual override, and smart fallbacks
 */

import { type Node } from "@xyflow/react"
import { getRepoAnalysis, type RepoAnalysis } from "@/lib/demo-data/github-repos"

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

// ============================================================================
// GitHub Scanner Demo Mode - Extended Functionality
// ============================================================================

/**
 * Node execution delays for realistic demo experience (milliseconds)
 */
export const DEMO_NODE_DELAYS: Record<string, number> = {
  start: 0,
  javascript: 300,
  httpRequest: 800,
  textModel: 2500,
  imageGeneration: 3000,
  structuredOutput: 1500,
  conditional: 200,
  prompt: 200,
  end: 100,
  embeddingModel: 1500,
  audio: 2000,
  tool: 500
}

/**
 * Check if a workflow has demo data available
 */
export function hasDemoData(workflowId: string | undefined): boolean {
  console.log('[Demo Mode] Checking if workflow has demo data:', { workflowId, hasDemoData: workflowId === "github-security-scanner" })
  if (!workflowId) return false
  return workflowId === "github-security-scanner"
}

/**
 * Get realistic delay for a node type
 */
export function getNodeDelay(nodeType: string): number {
  return DEMO_NODE_DELAYS[nodeType] || 500
}

/**
 * Simulate network delay
 */
export async function simulateDelay(delayMs: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delayMs))
}

/**
 * Generate mock response for GitHub Scanner workflow nodes
 */
export function getGitHubScannerMockResponse(
  node: Node,
  inputs: any[]
): any {
  const nodeType = node.type
  const nodeId = node.id

  switch (nodeId) {
    case "start":
      // Pass through user input
      return inputs[0] || "https://github.com/facebook/react"

    case "extract-repo": {
      // Parse repository from URL
      const url = inputs[0] || "https://github.com/facebook/react"
      const patterns = [
        /github\.com\/([^/]+)\/([^/]+)/,
        /^([^/]+)\/([^/]+)$/
      ]

      for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) {
          const owner = match[1]
          const repo = match[2].replace(/\.git$/, '')
          return {
            owner,
            repo,
            fullName: `${owner}/${repo}`
          }
        }
      }

      // Fallback
      return {
        owner: "facebook",
        repo: "react",
        fullName: "facebook/react"
      }
    }

    case "fetch-metadata": {
      // Mock GitHub API metadata
      const repoData = inputs[0] || { fullName: "facebook/react" }
      return {
        name: repoData.repo || "react",
        owner: { login: repoData.owner || "facebook" },
        stargazers_count: 242192,
        forks_count: 50363,
        open_issues_count: 836,
        updated_at: new Date().toISOString(),
        default_branch: "main",
        language: "JavaScript",
        description: "A declarative, efficient, and flexible JavaScript library for building user interfaces."
      }
    }

    case "fetch-security": {
      // Get mock security analysis
      const repoData = inputs[0] || { fullName: "facebook/react" }
      const analysis: RepoAnalysis = getRepoAnalysis(repoData.fullName)
      return analysis
    }

    case "calculate-score": {
      // Pre-calculated score from security data
      const security = inputs[1] || inputs[0]
      if (security && typeof security === 'object' && 'securityScore' in security) {
        return {
          score: security.securityScore,
          grade: security.grade,
          components: {
            vulnerability: 85,
            dependency: 75,
            practices: 85,
            owasp: 80
          },
          breakdown: security.vulnerabilities
        }
      }

      // Fallback
      return {
        score: 85,
        grade: "B+",
        components: {
          vulnerability: 85,
          dependency: 75,
          practices: 85,
          owasp: 80
        }
      }
    }

    case "grade-check": {
      // Conditional evaluation
      const scoreData = inputs[0]
      const score = scoreData?.score || 85
      return score >= 80
    }

    case "prompt-excellent": {
      const score = inputs[1]?.score || 85
      const repo = inputs[0]?.fullName || "facebook/react"
      return `🎉 SECURITY EXCELLENCE REPORT\n\nRepository: ${repo}\nSecurity Score: ${score}/100\n\nGenerate a congratulatory security analysis...`
    }

    case "prompt-improve": {
      const score = inputs[1]?.score || 85
      const repo = inputs[0]?.fullName || "facebook/react"
      return `📊 SECURITY IMPROVEMENT REPORT\n\nRepository: ${repo}\nSecurity Score: ${score}/100\n\nGenerate a constructive security improvement report...`
    }

    case "ai-analysis": {
      // Mock AI analysis based on score
      const score = inputs[1]?.score || inputs[0]?.score || 85
      const repo = inputs[0]?.fullName || inputs[1]?.fullName || "facebook/react"

      if (score >= 80) {
        return `# Security Excellence Report

**Repository:** ${repo}
**Security Score:** ${score}/100
**Overall Grade:** A-

## Top Security Strengths

1. **Comprehensive Security Policy**: The repository maintains a detailed SECURITY.md file with clear vulnerability disclosure procedures.

2. **Automated Security Scanning**: Dependabot and GitHub Advanced Security are enabled, providing continuous monitoring for vulnerabilities.

3. **Strong Code Review Process**: Branch protection rules enforce code review requirements before merging, reducing the risk of security issues.

## Why This Matters

This repository sets a security standard for the open-source community by:
- Proactively identifying and addressing security issues
- Maintaining transparency in security practices
- Demonstrating commitment to user safety

## Minor Enhancements

1. **Enable Commit Signing** (5 minutes): Require GPG signatures on commits to prevent impersonation
2. **Add SAST to CI/CD** (2 hours): Integrate static analysis tools for automated security testing
3. **Document Security Champions** (30 minutes): Identify and list security point-of-contact in the team

These improvements would elevate the security score to 98/100.`
      } else {
        return `# Security Improvement Report

**Repository:** ${repo}
**Security Score:** ${score}/100
**Overall Grade:** B

## Current Strengths

- Active maintenance with recent commits
- Standard open-source license (MIT)
- Public issue tracker for transparency

## Priority Fixes

### 1. HIGH: Patch Critical Vulnerabilities
**Effort:** 30 minutes
**Impact:** +10 points

Update dependencies with critical security issues.

### 2. HIGH: Enable GitHub Security Features
**Effort:** 15 minutes
**Impact:** +8 points

Enable automated security scanning:
1. Go to Settings > Security & analysis
2. Enable Dependabot alerts
3. Enable Dependabot security updates
4. Enable Code scanning

### 3. MEDIUM: Create SECURITY.md
**Effort:** 1 hour
**Impact:** +5 points

Document your security policy with vulnerability disclosure process.

### 4. MEDIUM: Add Branch Protection
**Effort:** 10 minutes
**Impact:** +4 points

Protect the main branch with required reviews.

### 5. LOW: Enable Secret Scanning
**Effort:** 5 minutes
**Impact:** +2 points

Prevent accidental credential commits.

## Expected Impact

Implementing all 5 recommendations would increase your security score to 94/100 (A rating).`
      }
    }

    case "extract-actions": {
      const score = inputs[1]?.score || inputs[0]?.score || 85
      return {
        summary: "Security analysis complete with actionable recommendations",
        score,
        grade: score >= 90 ? "A" : score >= 80 ? "B+" : "B",
        strengths: [
          "Active security policy documentation",
          "Automated dependency scanning enabled",
          "Strong code review requirements"
        ],
        criticalFindings: score < 70 ? [
          "Critical vulnerabilities in dependencies",
          "Missing security disclosure policy"
        ] : [],
        recommendations: [
          {
            priority: "HIGH",
            action: "Update vulnerable dependencies",
            effort: "30 minutes",
            impact: "+10 security score",
            steps: [
              "Run npm audit",
              "Update packages with critical issues",
              "Test thoroughly",
              "Deploy updates"
            ]
          },
          {
            priority: "MEDIUM",
            action: "Enable GitHub security features",
            effort: "15 minutes",
            impact: "+8 security score",
            steps: [
              "Navigate to repository settings",
              "Enable Dependabot alerts",
              "Enable code scanning"
            ]
          }
        ],
        badges: {
          security: score >= 90 ? "A" : score >= 80 ? "B+" : "B",
          coverage: 85,
          maintained: true
        },
        nextSteps: [
          "Review and implement high-priority recommendations",
          "Set up automated security monitoring",
          "Establish regular security audit schedule"
        ]
      }
    }

    case "generate-visual":
      // Mock image generation
      return {
        url: "/demo-assets/images/github-security-dashboard.webp",
        alt: "Security dashboard visualization",
        width: 1792,
        height: 1024,
        format: "webp"
      }

    case "end":
      // End node collects all outputs
      return {
        completed: true,
        finalOutputs: inputs,
        executionTime: new Date().toISOString()
      }

    default:
      // Default response
      return `Mock output from node ${nodeId}`
  }
}
