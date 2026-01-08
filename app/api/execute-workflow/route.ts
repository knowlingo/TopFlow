import { generateText, generateObject } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createGroq } from "@ai-sdk/groq"
import { z } from "zod"
import type { Node, Edge } from "@xyflow/react"
import { shouldUseDemoMode } from "@/lib/demo-mode"
import {
  getDemoWorkflowResult,
  getDemoNodeResult,
  getSimulatedDuration,
} from "@/lib/demo-data"

export const maxDuration = 30

type ExecutionResult = {
  nodeId: string
  type: string
  output: any
  error?: string
}

type StreamUpdate = {
  type: "node_start" | "node_complete" | "node_error" | "complete" | "error"
  nodeId?: string
  nodeType?: string
  output?: any
  error?: string
  executionLog?: ExecutionResult[]
}

function interpolateVariables(template: string, inputs: any[]): string {
  let result = template
  inputs.forEach((input, index) => {
    const placeholder = `$input${index + 1}`
    const value = typeof input === "string" ? input : JSON.stringify(input)
    result = result.replace(new RegExp(`\\${placeholder}`, "g"), value)
  })
  return result
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(identifier)

  if (!limit || now > limit.resetTime) {
    // Reset: 10 requests per minute
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + 60000, // 1 minute
    })
    return true
  }

  if (limit.count >= 10) {
    return false
  }

  limit.count++
  return true
}

function sanitizeInput(input: any, skipKeys: string[] = []): any {
  if (typeof input === "string") {
    // Remove potentially harmful characters
    return input.replace(/[<>]/g, "")
  }
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeInput(item, skipKeys))
  }
  if (typeof input === "object" && input !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(input)) {
      // Skip sanitization for certain keys (like code in JavaScript nodes)
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

export async function POST(req: Request) {
  const clientId = req.headers.get("x-forwarded-for") || "anonymous"
  if (!checkRateLimit(clientId)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a minute." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = (update: StreamUpdate) => {
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

        // Check if demo mode should be used
        const demoMode = shouldUseDemoMode(apiKeys, workflowId)

        // If demo mode, stream simulated execution
        if (demoMode) {
          const demoResult = getDemoWorkflowResult(workflowId)

          if (demoResult) {
            // Stream demo execution with realistic timing
            for (const [nodeId, nodeResult] of Object.entries(
              demoResult.nodeResults
            )) {
              // Send node start
              sendUpdate({
                type: "node_start",
                nodeId,
                nodeType: nodeResult.nodeType,
              })

              // Simulate execution delay
              await new Promise((resolve) =>
                setTimeout(resolve, nodeResult.duration)
              )

              // Send node completion
              sendUpdate({
                type: "node_complete",
                nodeId,
                nodeType: nodeResult.nodeType,
                output: nodeResult.output,
              })
            }

            // Send final completion
            sendUpdate({
              type: "complete",
            })

            controller.close()
            return
          }
        }

        const sanitizedNodes = nodes.map((node) => ({
          ...node,
          data: sanitizeInput(node.data, ["code", "schema"]), // Skip 'code' and 'schema' fields to preserve JavaScript/Zod syntax
        }))

        const { detectCycles } = await import("@/lib/validation")
        const cycles = detectCycles(sanitizedNodes, edges)
        if (cycles.length > 0) {
          sendUpdate({
            type: "error",
            error: `Cycle detected in workflow. Execution blocked to prevent infinite loops. Affected nodes: ${cycles[0].join(" → ")}`,
          })
          controller.close()
          return
        }

        const { isUrlSafe } = await import("@/lib/validation")
        for (const node of sanitizedNodes) {
          if (node.type === "httpRequest" && node.data.url) {
            if (!isUrlSafe(node.data.url)) {
              sendUpdate({
                type: "error",
                error: `Unsafe URL detected in HTTP Request node. Only public HTTP/HTTPS endpoints are allowed.`,
              })
              controller.close()
              return
            }
          }
        }

        const nodeMap = new Map(sanitizedNodes.map((node) => [node.id, node]))
        const results = new Map<string, any>()
        const executionLog: ExecutionResult[] = []

        const incomingEdges = new Set(edges.map((e) => e.target))
        const entryNodes = sanitizedNodes.filter((node) => !incomingEdges.has(node.id))

        const executeNode = async (nodeId: string): Promise<any> => {
          if (results.has(nodeId)) {
            return results.get(nodeId)
          }

          const node = nodeMap.get(nodeId)
          if (!node) {
            throw new Error(`Node ${nodeId} not found`)
          }

          const inputEdges = edges
            .filter((e) => e.target === nodeId)
            .sort((a, b) => {
              const nodeA = nodeMap.get(a.source)
              const nodeB = nodeMap.get(b.source)
              return (nodeA?.position.x || 0) - (nodeB?.position.x || 0)
            })

          let hasValidInput = inputEdges.length === 0

          for (const edge of inputEdges) {
            const sourceNode = nodeMap.get(edge.source)

            if (sourceNode?.type === "conditional") {
              if (results.has(edge.source)) {
                const conditionResult = results.get(edge.source)
                const expectedHandle = conditionResult ? "true" : "false"

                if (!edge.sourceHandle || edge.sourceHandle === expectedHandle) {
                  hasValidInput = true
                  break
                }
              }
            } else {
              const sourceResult = await executeNode(edge.source)
              if (sourceResult !== null) {
                hasValidInput = true
                break
              }
            }
          }

          if (!hasValidInput) {
            results.set(nodeId, null)
            return null
          }

          sendUpdate({
            type: "node_start",
            nodeId,
            nodeType: node.type,
          })

          const inputs: any[] = []
          for (const edge of inputEdges) {
            const sourceNode = nodeMap.get(edge.source)
            let shouldIncludeInput = true

            if (sourceNode?.type === "conditional" && results.has(edge.source)) {
              const conditionResult = results.get(edge.source)
              const expectedHandle = conditionResult ? "true" : "false"

              if (edge.sourceHandle && edge.sourceHandle !== expectedHandle) {
                shouldIncludeInput = false
              }
            }

            if (shouldIncludeInput) {
              const inputResult = await executeNode(edge.source)
              if (inputResult !== null) {
                inputs.push(inputResult)
              }
            }
          }

          if (inputEdges.length > 0 && inputs.length === 0) {
            results.set(nodeId, null)
            return null
          }

          let output: any

          try {
            switch (node.type) {
              case "start":
                output = "Workflow started"
                executionLog.push({
                  nodeId,
                  type: node.type,
                  output,
                })
                break

              case "end":
                const endInput = inputs.length > 0 ? inputs[0] : null
                output = endInput
                executionLog.push({
                  nodeId,
                  type: node.type,
                  output: {
                    finalOutput: output,
                  },
                })
                break

              case "conditional":
                const conditionCode = node.data.condition || "true"
                const conditionInputs = inputs

                try {
                  const func = new Function(
                    "inputs",
                    `
                    const input1 = inputs[0];
                    const input2 = inputs[1];
                    const input3 = inputs[2];
                    return ${conditionCode};
                  `,
                  )
                  const result = func(conditionInputs)
                  output = Boolean(result)
                } catch (condError: any) {
                  throw new Error(`Conditional evaluation error: ${condError.message}`)
                }

                executionLog.push({
                  nodeId,
                  type: node.type,
                  output: {
                    condition: conditionCode,
                    result: output,
                    inputs: conditionInputs,
                  },
                })
                break

              case "httpRequest":
                let url = node.data.url || ""
                const method = node.data.method || "GET"

                if (inputs.length > 0) {
                  url = interpolateVariables(url, inputs)
                }

                const headers: Record<string, string> = {}
                if (node.data.headers) {
                  try {
                    Object.assign(headers, JSON.parse(node.data.headers))
                  } catch (e) {
                    console.error("Invalid headers JSON")
                  }
                }

                let body = node.data.body || ""
                if (body && inputs.length > 0) {
                  body = interpolateVariables(body, inputs)
                }

                const fetchOptions: RequestInit = {
                  method,
                  headers,
                }

                if (method !== "GET" && method !== "HEAD" && body) {
                  fetchOptions.body = body
                }

                try {
                  const response = await fetch(url, fetchOptions)
                  const data = await response.json()
                  output = data
                } catch (fetchError: any) {
                  throw new Error(`HTTP request failed: ${fetchError.message}`)
                }

                executionLog.push({
                  nodeId,
                  type: node.type,
                  output: {
                    url,
                    method,
                    response: output,
                  },
                })
                break

              case "prompt":
                const content = node.data.content || ""
                output = inputs.length > 0 ? interpolateVariables(content, inputs) : content
                executionLog.push({
                  nodeId,
                  type: node.type,
                  output,
                })
                break

              case "textModel":
                const prompt = inputs.length > 0 ? String(inputs[0]) : node.data.prompt || ""

                const modelConfig = getModelWithApiKey(node.data.model || "openai/gpt-4o-mini", apiKeys)

                console.log(`[TextModel ${nodeId}] structuredOutput:`, node.data.structuredOutput, 'schema:', !!node.data.schema)

                if (node.data.structuredOutput && node.data.schema) {
                  try {
                    console.log(`[TextModel ${nodeId}] Using generateObject with schema:`, node.data.schemaName)
                    // Evaluate the Zod schema string to get actual Zod schema
                    const schemaFunc = new Function('z', `return ${node.data.schema}`)
                    const zodSchema = schemaFunc(z)

                    // Use generateObject for true structured output
                    const objectResult = await generateObject({
                      model: modelConfig,
                      schema: zodSchema,
                      prompt: prompt,
                      temperature: node.data.temperature || 0.7,
                      maxTokens: node.data.maxTokens || 2000,
                    })

                    output = objectResult.object
                    console.log(`[TextModel ${nodeId}] Generated object:`, JSON.stringify(output).substring(0, 100))
                    executionLog.push({
                      nodeId,
                      type: node.type,
                      output: {
                        object: output,
                        structured: true,
                        schemaName: node.data.schemaName,
                        usage: objectResult.usage,
                      },
                    })
                  } catch (schemaError: any) {
                    console.error(`[TextModel ${nodeId}] Structured output error:`, schemaError)
                    throw new Error(`Structured output failed: ${schemaError.message}`)
                  }
                } else {
                  const textResult = await generateText({
                    model: modelConfig,
                    prompt: prompt,
                    temperature: node.data.temperature || 0.7,
                    maxTokens: node.data.maxTokens || 2000,
                  })
                  output = textResult.text
                  executionLog.push({
                    nodeId,
                    type: node.type,
                    output: {
                      text: output,
                      usage: textResult.usage,
                    },
                  })
                }
                break

              case "imageGeneration":
                const imagePrompt = inputs.length > 0 ? String(inputs[0]) : ""

                if (!apiKeys.google) {
                  throw new Error(
                    "Google AI API key required for image generation. Please add your API key in Settings > API Keys.",
                  )
                }

                const imageModel = getModelWithApiKey(node.data.model || "google/gemini-2.0-flash-exp", apiKeys)
                const imageResult = await generateText({
                  model: imageModel,
                  prompt: imagePrompt,
                })

                const images: string[] = []
                if (imageResult.files) {
                  for (const file of imageResult.files) {
                    if (file.mediaType.startsWith("image/")) {
                      const base64Data = file.base64
                      if (base64Data.startsWith("data:")) {
                        images.push(base64Data)
                      } else {
                        images.push(`data:${file.mediaType};base64,${base64Data}`)
                      }
                    }
                  }
                }

                output = images.length > 0 ? images[0] : "No image generated"
                executionLog.push({
                  nodeId,
                  type: node.type,
                  output: {
                    images,
                    prompt: imagePrompt,
                    text: imageResult.text,
                  },
                })
                break

              case "javascript":
                const jsCode = node.data.code || ""
                const jsInputs = inputs

                console.log(`[JavaScript ${nodeId}] Received ${jsInputs.length} inputs:`)
                jsInputs.forEach((inp, idx) => {
                  console.log(`  input${idx + 1} type:`, typeof inp, 'isObject:', typeof inp === 'object')
                })

                try {
                  // Use string concatenation to avoid template literal issues with backticks
                  const funcBody =
                    "const input1 = inputs[0];\n" +
                    "const input2 = inputs[1];\n" +
                    "const input3 = inputs[2];\n" +
                    "const input4 = inputs[3];\n" +
                    "const input5 = inputs[4];\n" +
                    jsCode;

                  // Debug: Show first 500 chars of code being executed
                  console.log(`[JavaScript ${nodeId}] Code preview (500 chars):`, funcBody.substring(0, 500))
                  console.log(`[JavaScript ${nodeId}] Code length:`, funcBody.length)

                  const func = new Function("inputs", funcBody)
                  output = func(jsInputs)
                  console.log(`[JavaScript ${nodeId}] Execution successful, output type:`, typeof output)
                } catch (jsError: any) {
                  console.error(`[JavaScript ${nodeId}] Error:`, jsError.message)
                  console.error(`[JavaScript ${nodeId}] Stack:`, jsError.stack)
                  throw new Error(`JavaScript execution error: ${jsError.message}`)
                }

                executionLog.push({
                  nodeId,
                  type: node.type,
                  output,
                })
                break

              case "audio":
                const audioText = inputs.length > 0 ? String(inputs[0]) : ""
                output = {
                  audioUrl: "Audio generation placeholder",
                  text: audioText,
                  model: node.data.model,
                  voice: node.data.voice,
                }
                executionLog.push({
                  nodeId,
                  type: node.type,
                  output,
                })
                break

              case "embeddingModel":
                const embInput = inputs.length > 0 ? String(inputs[0]) : ""
                output = { embedding: "Embedding generation not implemented in demo" }
                executionLog.push({
                  nodeId,
                  type: node.type,
                  output,
                })
                break

              case "structuredOutput":
                const structInput = inputs.length > 0 ? String(inputs[0]) : ""
                output = { message: "Structured output not implemented in demo" }
                executionLog.push({
                  nodeId,
                  type: node.type,
                  output,
                })
                break

              case "tool":
                if (node.data.code) {
                  try {
                    const toolInputs = inputs
                    const func = new Function(
                      "inputs",
                      "args",
                      `
                      const input1 = inputs[0];
                      const input2 = inputs[1];
                      const input3 = inputs[2];
                      ${node.data.code}
                    `,
                    )
                    output = await func(toolInputs, {})
                  } catch (toolError: any) {
                    throw new Error(`Tool execution error: ${toolError.message}`)
                  }
                } else {
                  output = { message: "Tool has no implementation code" }
                }
                executionLog.push({
                  nodeId,
                  type: node.type,
                  output,
                })
                break

              default:
                output = null
            }

            results.set(nodeId, output)

            sendUpdate({
              type: "node_complete",
              nodeId,
              nodeType: node.type,
              output,
            })

            return output
          } catch (error: any) {
            const errorMessage = error.message || "Unknown error"
            executionLog.push({
              nodeId,
              type: node.type,
              output: null,
              error: errorMessage,
            })

            sendUpdate({
              type: "node_error",
              nodeId,
              nodeType: node.type,
              error: errorMessage,
            })

            throw error
          }
        }

        const finalResults: any[] = []
        for (const entryNode of entryNodes) {
          const result = await executeNode(entryNode.id)
          finalResults.push(result)

          const processDownstream = async (nodeId: string) => {
            const outgoingEdges = edges.filter((e) => e.source === nodeId)

            for (const edge of outgoingEdges) {
              await executeNode(edge.target)
              await processDownstream(edge.target)
            }
          }
          await processDownstream(entryNode.id)
        }

        sendUpdate({
          type: "complete",
          executionLog,
        })

        controller.close()
      } catch (error: any) {
        sendUpdate({
          type: "error",
          error: error.message || "Execution failed",
        })
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  })
}

function normalizeModelString(modelString?: string) {
  const fallback = { provider: "openai", modelName: "gpt-4o-mini" }
  if (!modelString) {
    return fallback
  }

  const legacyOpenAIMap: Record<string, string> = {
    "gpt-4-turbo-preview": "gpt-4o-mini",
    "gpt-4-turbo": "gpt-4o",
    "gpt-4": "gpt-4o",
    "gpt-4.1": "gpt-4o",
    "gpt-4.1-mini": "gpt-4o-mini",
    "gpt-4o-realtime-preview": "gpt-4o-mini",
    "gpt-5": "gpt-4o",
    "gpt-5-mini": "gpt-4o-mini",
  }

  const inferProviderFromPrefix = (model: string) => {
    if (model.startsWith("claude") || model.startsWith("anthropic")) {
      return { provider: "anthropic", modelName: model.replace("anthropic/", "") }
    }
    if (model.startsWith("gemini") || model.startsWith("google")) {
      return { provider: "google", modelName: model.replace("google/", "") }
    }
    if (model.startsWith("llama") || model.startsWith("mixtral") || model.startsWith("groq")) {
      return { provider: "groq", modelName: model.replace("groq/", "") }
    }
    return { provider: "openai", modelName: model }
  }

  if (modelString.includes("/")) {
    const [rawProvider, rawModel] = modelString.split("/")
    const provider = rawProvider || "openai"
    const modelName =
      provider === "openai" && legacyOpenAIMap[rawModel || ""]
        ? legacyOpenAIMap[rawModel || ""]
        : rawModel || fallback.modelName
    return { provider, modelName }
  }

  if (legacyOpenAIMap[modelString]) {
    return { provider: "openai", modelName: legacyOpenAIMap[modelString] }
  }

  return inferProviderFromPrefix(modelString)
}

function wrapToSpecV2(model: any, provider: string, modelId: string) {
  if (!model || typeof model !== "object") {
    throw new Error("Invalid language model instance")
  }

  const base = model as any
  return {
    specificationVersion: "v2",
    provider,
    modelId,
    supportedUrls: base.supportedUrls,
    async doGenerate(options: any) {
      return base.doGenerate(options)
    },
    async doStream(options: any) {
      return base.doStream(options)
    },
  }
}

function getModelWithApiKey(modelString: string, apiKeys: Record<string, string> = {}) {
  const { provider, modelName } = normalizeModelString(modelString)
  console.log("[v0] getModelWithApiKey called with:", modelString, "normalized:", `${provider}/${modelName}`)

  switch (provider) {
    case "openai":
      if (!apiKeys.openai) {
        throw new Error("OpenAI API key required. Please add your API key in Settings > API Keys.")
      }
      const openaiClient = createOpenAI({
        apiKey: apiKeys.openai,
      })
      let openaiModel = openaiClient(modelName || "gpt-4o-mini")
      console.log("[v0] OpenAI model spec:", openaiModel.specificationVersion)
      openaiModel = wrapToSpecV2(openaiModel, "openai", modelName || "gpt-4o-mini")
      console.log("[v0] Wrapped OpenAI model spec:", openaiModel.specificationVersion)
      return openaiModel

    case "anthropic":
      if (!apiKeys.anthropic) {
        throw new Error("Anthropic API key required. Please add your API key in Settings > API Keys.")
      }
      const anthropicClient = createAnthropic({
        apiKey: apiKeys.anthropic,
      })
      return wrapToSpecV2(anthropicClient(modelName || "claude-3-5-sonnet-20241022"), "anthropic", modelName || "claude-3-5-sonnet-20241022")

    case "google":
      if (!apiKeys.google) {
        throw new Error("Google API key required. Please add your API key in Settings > API Keys.")
      }
      const googleClient = createGoogleGenerativeAI({
        apiKey: apiKeys.google,
      })
      return wrapToSpecV2(googleClient(modelName || "gemini-1.5-flash"), "google", modelName || "gemini-1.5-flash")

    case "groq":
      if (!apiKeys.groq) {
        throw new Error("Groq API key required. Please add your API key in Settings > API Keys.")
      }
      const groqClient = createGroq({
        apiKey: apiKeys.groq,
      })
      return wrapToSpecV2(groqClient(modelName || "llama-3.3-70b-versatile"), "groq", modelName || "llama-3.3-70b-versatile")

    default:
      throw new Error(`Unsupported model provider: ${provider}`)
  }
}
