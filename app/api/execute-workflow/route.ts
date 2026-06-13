import type { Node, Edge } from "@xyflow/react"
import { TopFlowExecutionEngine } from "@/lib/topflow-execution-engine"
import { validateWorkflow, validateApiKeys } from "@charliesu/workflow-core"
import type { ExecutionUpdate } from "@charliesu/workflow-core"
import { shouldUseDemoMode, hasDemoData as hasNewDemoData } from "@/lib/demo-mode"
import { getDemoWorkflowResult, hasDemoData as hasLegacyDemoData } from "@/lib/demo-data"

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
          userInputs,
          githubToken,
          scanMode,
        }: {
          nodes: Node[]
          edges: Edge[]
          apiKeys?: Record<string, string>
          workflowId?: string
          userInputs?: Record<string, string>
          githubToken?: string
          scanMode?: ScanMode
        } = await req.json()

        console.log('[Execute Workflow] Request received:', {
          workflowId,
          nodeCount: nodes.length,
          edgeCount: edges.length,
          hasApiKeys: Object.keys(apiKeys).length > 0,
          userInputs: userInputs
        })

        // Process start nodes - use userInputs if provided, otherwise use defaultValue
        const processedNodes = nodes.map((node) => {
          if (node.type === "start") {
            // Priority: userInputs > existing output > defaultValue
            const outputValue = (userInputs && userInputs[node.id]) || node.data.output || node.data.defaultValue

            if (outputValue) {
              console.log('[Execute Workflow] Setting start node output:', {
                nodeId: node.id,
                hasUserInput: !!(userInputs && userInputs[node.id]),
                hasExistingOutput: !!node.data.output,
                hasDefaultValue: !!node.data.defaultValue,
                outputValue: outputValue
              })

              return {
                ...node,
                data: {
                  ...node.data,
                  output: outputValue,
                },
              }
            }
          }
          return node
        })

        // ============================================================================
        // Demo Mode Handling
        // ============================================================================

        // Two-axis BYOK resolution for the GitHub Scanner (see lib/demo-mode).
        // GitHub token => real scan DATA; AI key => LLM report NARRATIVE.
        // Real-scan per-axis behavior is strictly opt-in: with no token / no
        // explicit scanMode, this collapses to the prior single-boolean demo gate.
        const isScanner = workflowId === "github-security-scanner"
        const scanAxes = isScanner
          ? resolveScanModes({ apiKeys, githubToken, scanMode })
          : null
        const realScan = Boolean(isScanner && scanAxes && scanAxes.dataMode === "real")
        const demoMode = isScanner ? scanAxes!.demoMode : shouldUseDemoMode(apiKeys, workflowId)

        // Check both legacy and new demo mode systems
        const hasLegacyDemo = hasLegacyDemoData(workflowId)
        const hasNewDemo = hasNewDemoData(workflowId)

        console.log('[Execute Workflow] Demo mode check:', {
          workflowId,
          demoMode,
          hasLegacyDemo,
          hasNewDemo
        })

        // For workflows without demo data, check early and show error
        if (demoMode && !hasLegacyDemo && !hasNewDemo) {
          // Demo mode enabled but no demo data available for this workflow
          sendUpdate({
            type: "error",
            error: `Demo mode is active (no API keys configured), but this workflow does not have cached demo data. Please add API keys in Settings or use a template with demo data available.`,
          })
          controller.close()
          return
        }

        // Use legacy demo system for workflows with pre-generated results
        if (demoMode && hasLegacyDemo) {
          const legacyDemoResult = getDemoWorkflowResult(workflowId)

          if (legacyDemoResult) {
            // Use legacy demo system for non-GitHub-Scanner workflows
            for (const [nodeId, nodeResult] of Object.entries(legacyDemoResult.nodeResults)) {
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

        // If hasNewDemo is true, execution will continue to use TopFlowExecutionEngine with demo mode

        // ============================================================================
        // Input Sanitization
        // ============================================================================

        const sanitizedNodes = processedNodes.map((node) => ({
          ...node,
          data: sanitizeInput(node.data, ["code", "schema", "output"]),
        }))

        // Log sanitized start nodes to debug
        const sanitizedStartNodes = sanitizedNodes.filter(n => n.type === "start")
        if (sanitizedStartNodes.length > 0) {
          console.log('[Execute Workflow] Start nodes after sanitization:',
            sanitizedStartNodes.map(n => ({ id: n.id, output: n.data.output }))
          )
        }

        // ============================================================================
        // Validation (Cycles, SSRF)
        // ============================================================================

        const validationIssues = validateWorkflow(sanitizedNodes, edges)
        const errors = validationIssues.filter((issue) => issue.type === "error")

        if (errors.length > 0) {
          sendUpdate({
            type: "error",
            error: `Validation failed: ${errors[0].message}`,
          })
          controller.close()
          return
        }

        // API key validation - only when an LLM will actually run.
        // (A real scan with a templated, no-LLM report needs no AI key.)
        const needsAiKeyValidation = isScanner
          ? scanAxes!.narrativeMode === "llm"
          : !demoMode
        if (needsAiKeyValidation) {
          const apiKeyIssues = validateApiKeys(apiKeys, sanitizedNodes)
          const apiKeyErrors = apiKeyIssues.filter((issue) => issue.type === "error")

          if (apiKeyErrors.length > 0) {
            sendUpdate({
              type: "error",
              error: apiKeyErrors[0].message,
            })
            controller.close()
            return
          }
        }

        // ============================================================================
        // Execute Workflow using TopFlowExecutionEngine
        // ============================================================================

        // Pass per-axis options only for an opt-in real scan; otherwise keep the
        // exact legacy construction so demo/live behavior is unchanged.
        const engine = new TopFlowExecutionEngine(
          realScan
            ? {
                demoMode,
                workflowId,
                dataMode: scanAxes!.dataMode,
                narrativeMode: scanAxes!.narrativeMode,
                githubToken,
              }
            : { demoMode, workflowId }
        )

        // Extract start node outputs as initial variables
        const initialVariables: Record<string, any> = {}
        sanitizedNodes.forEach((node) => {
          if (node.type === "start" && node.data.output) {
            initialVariables[node.id] = node.data.output
          }
        })

        console.log('[Execute Workflow] Initial variables:', initialVariables)

        const result = await engine.executeWorkflow(
          sanitizedNodes,
          edges,
          {
            apiKeys,
            variables: initialVariables,
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
