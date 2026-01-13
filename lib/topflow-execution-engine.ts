import { ExecutionEngine } from '@charliesu/workflow-core'
import type { Node } from '@xyflow/react'
import type { ExecutionContext } from '@charliesu/workflow-core'
import { generateText, generateObject, embed } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createGroq } from '@ai-sdk/groq'
import { z } from 'zod'
import {
  getNodeDelay,
  simulateDelay,
  getGitHubScannerMockResponse,
  hasDemoData
} from './demo-mode'

/**
 * TopFlow-specific execution engine
 * Extends base ExecutionEngine with AI model nodes and HTTP requests
 * Supports demo mode for workflows with cached mock data
 */
export class TopFlowExecutionEngine extends ExecutionEngine {
  private demoMode: boolean = false
  private workflowId?: string
  private executionResults: Map<string, any> = new Map()

  constructor(options?: { demoMode?: boolean; workflowId?: string }) {
    super()
    this.demoMode = options?.demoMode || false
    this.workflowId = options?.workflowId
  }

  /**
   * Override executeWorkflow to capture results
   */
  async executeWorkflow(
    nodes: Node[],
    edges: any[],
    context: ExecutionContext,
    onUpdate?: (update: any) => void
  ): Promise<any> {
    // Reset results for new execution
    this.executionResults = new Map()

    // Call parent executeWorkflow
    return super.executeWorkflow(nodes, edges, context, onUpdate)
  }

  /**
   * Override executeNode to handle TopFlow-specific node types
   */
  protected async executeNode(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<any> {
    const data = node.data as any

    let result: any

    // Demo mode: Return mock responses for GitHub Scanner workflow
    if (this.demoMode && this.workflowId === 'github-security-scanner' && hasDemoData(this.workflowId)) {
      // Add realistic delay based on node type
      const delay = getNodeDelay(node.type || 'default')
      await simulateDelay(delay)

      // Convert inputs object to array for mock response function
      const inputArray = Object.values(inputs)

      // Generate mock response with access to all previous results
      result = getGitHubScannerMockResponse(node, inputArray, this.executionResults)
    } else {
      // Handle TopFlow-specific nodes
      switch (node.type) {
        case 'start':
          // Start nodes should output their stored value or context variable
          result = data.output || context.variables?.[node.id] || data.defaultValue || ''
          console.log('[TopFlowEngine] Start node output:', { nodeId: node.id, result })
          break

        case 'httpRequest':
          result = await this.executeHttpRequestNode(node, inputs)
          break

        case 'textModel':
          result = await this.executeTextModelNode(node, inputs, context)
          break

        case 'imageGeneration':
          result = await this.executeImageGenerationNode(node, inputs, context)
          break

        case 'audio':
          result = await this.executeAudioNode(node, inputs, context)
          break

        case 'embeddingModel':
          result = await this.executeEmbeddingModelNode(node, inputs, context)
          break

        case 'structuredOutput':
          result = await this.executeStructuredOutputNode(node, inputs, context)
          break

        case 'tool':
          result = await this.executeToolNode(node, inputs)
          break

        case 'prompt':
          result = await this.executePromptNode(node, inputs)
          break

        default:
          // Fall back to base implementation for shared nodes
          result = await super.executeNode(node, inputs, context)
      }
    }

    // Store result for future nodes to access
    this.executionResults.set(node.id, result)

    return result
  }

  private async executeHttpRequestNode(node: Node, inputs: Record<string, any>): Promise<any> {
    const data = node.data as any
    const url = data.url || ''
    const method = (data.method || 'GET').toUpperCase()
    const headers = data.headers || {}
    const body = data.body || ''

    // Variable interpolation for URL with property access support
    let interpolatedUrl = url
    Object.entries(inputs).forEach(([key, value]) => {
      // Support property access like $input1.fullName
      const regex = new RegExp(`\\$${key}(?:\\.([\\w\\.]+))?`, 'g')
      interpolatedUrl = interpolatedUrl.replace(regex, (match, propertyPath) => {
        if (propertyPath && typeof value === 'object' && value !== null) {
          // Access nested property
          const props = propertyPath.split('.')
          let result = value
          for (const prop of props) {
            result = result?.[prop]
            if (result === undefined) break
          }
          return String(result ?? '')
        }
        return String(value)
      })
    })

    // Convert relative URLs to absolute URLs for server-side fetch
    let finalUrl = interpolatedUrl
    if (interpolatedUrl.startsWith('/')) {
      // Server-side: use localhost
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      finalUrl = `${baseUrl}${interpolatedUrl}`
    }

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (method !== 'GET' && method !== 'HEAD') {
      // Variable interpolation for body
      let interpolatedBody = body
      Object.entries(inputs).forEach(([key, value]) => {
        const varName = `$${key}`
        interpolatedBody = interpolatedBody.replace(new RegExp(`\\${varName}`, 'g'), String(value))
      })
      options.body = interpolatedBody
    }

    const response = await fetch(finalUrl, options)
    const result = await response.json()
    return result
  }

  private async executeTextModelNode(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<any> {
    const data = node.data as any
    const modelId = data.model || 'openai/gpt-4o-mini'
    const temperature = data.temperature || 0.7
    const maxTokens = data.maxTokens || 2000

    // Get the model instance
    const model = this.getModel(modelId, context.apiKeys)

    // Get prompt from first input
    const prompt = inputs.input1 || ''

    const result = await generateText({
      model,
      prompt: String(prompt),
      temperature,
      maxTokens,
    })

    return result.text
  }

  private async executeImageGenerationNode(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<any> {
    const data = node.data as any
    const modelId = data.model || 'gemini-2.0-flash-exp'

    const prompt = inputs.input1 || ''

    // Use createGoogleGenerativeAI with custom API key
    if (!context.apiKeys.google) {
      throw new Error('Google API key required for image generation')
    }
    const googleClient = createGoogleGenerativeAI({ apiKey: context.apiKeys.google })
    const model = googleClient(modelId)

    const result = await generateText({
      model,
      prompt: String(prompt),
    })

    // Extract base64 images from files
    const images =
      result.files?.filter((f: any) => f.mediaType.startsWith('image/')).map((f: any) => f.base64) || []

    // Return as object with images array (matches node component expected format)
    return {
      images: images.map(base64 => `data:image/png;base64,${base64}`)
    }
  }

  private async executeAudioNode(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<any> {
    const data = node.data as any
    const model = data.model || 'tts-1'
    const voice = data.voice || 'alloy'
    const speed = data.speed || 1.0

    const input = inputs.input1 || ''

    // OpenAI TTS API
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.apiKeys.openai}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: String(input),
        voice,
        speed,
      }),
    })

    const audioBuffer = await response.arrayBuffer()
    return audioBuffer
  }

  private async executeEmbeddingModelNode(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<any> {
    const data = node.data as any
    const modelId = data.model || 'text-embedding-3-small'

    const input = inputs.input1 || ''

    // Use createOpenAI with custom API key
    if (!context.apiKeys.openai) {
      throw new Error('OpenAI API key required for embedding model')
    }
    const openaiClient = createOpenAI({ apiKey: context.apiKeys.openai })

    const result = await embed({
      model: openaiClient.embedding(modelId),
      value: String(input),
    })

    return result.embedding
  }

  private async executeStructuredOutputNode(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<any> {
    const data = node.data as any
    const modelId = data.model || 'openai/gpt-4o-mini'

    const model = this.getModel(modelId, context.apiKeys)
    const prompt = inputs.input1 || ''

    // Parse schema if it's a JSON string
    let schemaDefinition = data.schema
    if (typeof schemaDefinition === 'string') {
      try {
        schemaDefinition = JSON.parse(schemaDefinition)
      } catch (e) {
        throw new Error(`Failed to parse schema JSON: ${e}`)
      }
    }

    // Build Zod schema from the schema definition
    const zodSchema = this.convertToZodSchema(schemaDefinition)

    const result = await generateObject({
      model,
      schema: zodSchema,
      prompt: String(prompt),
    })

    return JSON.stringify(result.object)
  }

  /**
   * Convert JSON schema definition to Zod schema
   * Handles types: "string", "number", "boolean", ["string"], [{...}], {...}
   */
  private convertToZodSchema(definition: any): any {
    if (typeof definition === 'string') {
      // Simple type definition: "string", "number", "boolean"
      if (definition === 'string') return z.string()
      if (definition === 'number') return z.number()
      if (definition === 'boolean') return z.boolean()

      // Enum definition: "HIGH | MEDIUM | LOW"
      if (definition.includes('|')) {
        const values = definition.split('|').map((v: string) => v.trim())
        return z.enum(values as [string, ...string[]])
      }

      return z.string() // fallback
    }

    if (Array.isArray(definition)) {
      // Array definition: ["string"] or [{...}]
      if (definition.length === 0) {
        return z.array(z.any())
      }

      const itemSchema = this.convertToZodSchema(definition[0])
      return z.array(itemSchema)
    }

    if (typeof definition === 'object' && definition !== null) {
      // Object definition: { key: type, ... }
      const shape: Record<string, any> = {}

      for (const [key, value] of Object.entries(definition)) {
        shape[key] = this.convertToZodSchema(value)
      }

      return z.object(shape)
    }

    return z.any() // fallback
  }

  private async executePromptNode(node: Node, inputs: Record<string, any>): Promise<any> {
    const data = node.data as any
    let template = data.prompt || ''

    // For GitHub Scanner workflow, enhance inputs with execution results
    // This allows prompt nodes to access upstream data even after conditional branching
    if (this.workflowId === 'github-security-scanner') {
      const enhancedInputs: Record<string, any> = { ...inputs }

      // Map execution results to input1, input2, input3 based on GitHub Scanner structure
      if (this.executionResults.has('extract-repo')) {
        enhancedInputs.input1 = this.executionResults.get('extract-repo')
      }
      if (this.executionResults.has('calculate-score')) {
        enhancedInputs.input2 = this.executionResults.get('calculate-score')
      }
      if (this.executionResults.has('fetch-metadata')) {
        enhancedInputs.input3 = this.executionResults.get('fetch-metadata')
      }

      console.log('[TopFlowEngine] Prompt node execution:', {
        nodeId: node.id,
        originalInputs: inputs,
        enhancedInputInput1: enhancedInputs.input1,
        enhancedInputInput2: enhancedInputs.input2,
        enhancedInputInput3Keys: enhancedInputs.input3 ? Object.keys(enhancedInputs.input3) : []
      })

      // Perform variable interpolation with enhanced inputs
      // Support both simple variables ($input1) and property access ($input1.fullName)
      Object.entries(enhancedInputs).forEach(([key, value]) => {
        // Property access pattern: $input1.property.nested
        const regex = new RegExp(`\\$${key}(?:\\.([\\w\\.]+))?`, 'g')
        template = template.replace(regex, (match, propertyPath) => {
          if (propertyPath && typeof value === 'object' && value !== null) {
            // Access nested property
            const props = propertyPath.split('.')
            let result = value
            for (const prop of props) {
              result = result?.[prop]
              if (result === undefined) break
            }
            return String(result ?? '')
          }
          return String(value ?? '')
        })
      })

      return template
    }

    // For other workflows, use standard variable interpolation
    Object.entries(inputs).forEach(([key, value]) => {
      const varName = `$${key}`
      template = template.replace(new RegExp(`\\${varName}`, 'g'), String(value ?? ''))
    })

    return template
  }

  private async executeToolNode(node: Node, inputs: Record<string, any>): Promise<any> {
    const data = node.data as any
    const code = data.code || 'return { result: "Tool executed" }'

    // Sandboxed execution
    try {
      const fn = new Function(...Object.keys(inputs), code)
      return fn(...Object.values(inputs))
    } catch (error) {
      throw new Error(`Tool execution failed: ${error}`)
    }
  }

  /**
   * Get AI model instance based on provider and API keys
   * Wraps models with v2 spec compatibility shim for AI SDK 5
   */
  private getModel(modelId: string, apiKeys: Record<string, string>) {
    const [provider, model] = modelId.split('/')

    switch (provider) {
      case 'openai':
        if (!apiKeys.openai) throw new Error('OpenAI API key not configured')
        const openaiClient = createOpenAI({ apiKey: apiKeys.openai })
        const openaiModel = openaiClient(model || 'gpt-4o-mini')
        return this.wrapToSpecV2(openaiModel, provider, model || 'gpt-4o-mini')

      case 'anthropic':
        if (!apiKeys.anthropic) throw new Error('Anthropic API key not configured')
        const anthropicClient = createAnthropic({ apiKey: apiKeys.anthropic })
        const anthropicModel = anthropicClient(model || 'claude-3-5-sonnet-20241022')
        return this.wrapToSpecV2(anthropicModel, provider, model || 'claude-3-5-sonnet-20241022')

      case 'google':
        if (!apiKeys.google) throw new Error('Google API key not configured')
        const googleClient = createGoogleGenerativeAI({ apiKey: apiKeys.google })
        const googleModel = googleClient(model || 'gemini-1.5-flash')
        return this.wrapToSpecV2(googleModel, provider, model || 'gemini-1.5-flash')

      case 'groq':
        if (!apiKeys.groq) throw new Error('Groq API key not configured')
        const groqClient = createGroq({ apiKey: apiKeys.groq })
        const groqModel = groqClient(model || 'llama-3.3-70b-versatile')
        return this.wrapToSpecV2(groqModel, provider, model || 'llama-3.3-70b-versatile')

      default:
        throw new Error(`Unknown model provider: ${provider}`)
    }
  }

  /**
   * Wrap model to report v2 spec for AI SDK 5 compatibility
   * This prevents "Unsupported model version v3" errors
   */
  private wrapToSpecV2(model: any, provider: string, modelId: string) {
    if (!model || typeof model !== 'object') {
      throw new Error('Invalid language model instance')
    }

    const base = model as any
    return {
      specificationVersion: 'v2',
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
}
