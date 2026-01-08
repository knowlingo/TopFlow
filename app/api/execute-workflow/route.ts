import type { Node, Edge } from "@xyflow/react"
import { TopFlowExecutionEngine } from "@/lib/topflow-execution-engine"
import { validateWorkflow, validateApiKeys } from "@charliesu/workflow-core"
import type { ExecutionUpdate } from "@charliesu/workflow-core"
import { shouldUseDemoMode } from "@/lib/demo-mode"
import { getDemoResults } from "@/lib/demo-results"

export const maxDuration = 30

// ============================================================================
// Rate Limiting
// ============================================================================

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(identifier)

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + 60000, // 10 requests per minute
    })
    return true
  }

  if (limit.count >= 10) {
    return false
  }

  limit.count++
  return true
}

// ============================================================================
// Input Sanitization
// ============================================================================

function sanitizeInput(input: any, skipKeys: string[] = []): any {
  if (typeof input === "string") {
    return input.replace(/[<>]/g, "")
  }
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeInput(item, skipKeys))
  }
  if (typeof input === "object" && input !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(input)) {
      if (skipKeys.includes(key)) {
        sanitized[key] = value
      } else {
        sanitized[key] = sanitizeInput(value, skipKeys)
      }
    }
    return sanitized
  }
  return input
}

// ============================================================================
// Main Route Handler
// ============================================================================

export async function POST(req: Request) {
  // Rate limiting
  const clientId = req.headers.get("x-forwarded-for") || "anonymous"
  if (!checkRateLimit(clientId)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again in a minute." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = (update: ExecutionUpdate) => {
        controller.enqueue(encoder.encode(JSON.stringify(update) + "\n"))
      }

      try {
        const {
          nodes,
          edges,
          apiKeys = {},
          workflowId,
        }: {
          nodes: Node[]
          edges: Edge[]
          apiKeys?: Record<string, string>
          workflowId?: string
        } = await req.json()

        // ============================================================================
        // Demo Mode Handling
        // ============================================================================

        const demoMode = shouldUseDemoMode(apiKeys, workflowId)

        if (demoMode) {
          const demoResult = getDemoResults(workflowId)

          if (demoResult) {
            // Stream demo execution with realistic timing
            for (const [nodeId, nodeResult] of Object.entries(demoResult.nodeResults)) {
              sendUpdate({
                type: "node_start",
                nodeId,
              })

              // Simulate realistic execution delay (300-800ms per node)
              const duration = 300 + Math.random() * 500
              await new Promise((resolve) => setTimeout(resolve, duration))

              sendUpdate({
                type: "node_complete",
                nodeId,
                output: nodeResult.output,
              })
            }

            sendUpdate({ type: "complete" })
            controller.close()
            return
          }
        }

        // ============================================================================
        // Input Sanitization
        // ============================================================================

        const sanitizedNodes = nodes.map((node) => ({
          ...node,
          data: sanitizeInput(node.data, ["code", "schema"]),
        }))

        // ============================================================================
        // Validation (Cycles, SSRF, API Keys)
        // ============================================================================

        const validationIssues = validateWorkflow(sanitizedNodes, edges)
        const errors = validationIssues.filter((issue) => issue.type === "error")

        if (errors.length > 0) {
          sendUpdate({
            type: "error",
            error: `Validation failed: ${errors[0].title} - ${errors[0].description}`,
          })
          controller.close()
          return
        }

        const apiKeyIssues = validateApiKeys(apiKeys, sanitizedNodes)
        const apiKeyErrors = apiKeyIssues.filter((issue) => issue.type === "error")

        if (apiKeyErrors.length > 0) {
          sendUpdate({
            type: "error",
            error: `${apiKeyErrors[0].title}: ${apiKeyErrors[0].description}`,
          })
          controller.close()
          return
        }

        // ============================================================================
        // Execute Workflow using TopFlowExecutionEngine
        // ============================================================================

        const engine = new TopFlowExecutionEngine()

        const result = await engine.executeWorkflow(
          sanitizedNodes,
          edges,
          {
            apiKeys,
            variables: {},
          },
          sendUpdate
        )

        if (!result.success) {
          sendUpdate({
            type: "error",
            error: result.error || "Workflow execution failed",
          })
        }

        controller.close()
      } catch (error) {
        console.error("Workflow execution error:", error)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"

        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "error",
              error: errorMessage,
            }) + "\n"
          )
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
