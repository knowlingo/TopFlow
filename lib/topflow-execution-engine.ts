import { ExecutionEngine } from '@charliesu/workflow-core'
import type { Node } from '@xyflow/react'
import type { ExecutionContext } from '@charliesu/workflow-core'
import { generateText, generateObject, embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { groq } from '@ai-sdk/groq'
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

  constructor(options?: { demoMode?: boolean; workflowId?: string }) {
    super()
    this.demoMode = options?.demoMode || false
    this.workflowId = options?.workflowId
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

    // Demo mode: Return mock responses for GitHub Scanner workflow
    if (this.demoMode && this.workflowId === 'github-security-scanner' && hasDemoData(this.workflowId)) {
      // Add realistic delay based on node type
      const delay = getNodeDelay(node.type || 'default')
      await simulateDelay(delay)

      // Convert inputs object to array for mock response function
      const inputArray = Object.values(inputs)

      // Generate mock response
      return getGitHubScannerMockResponse(node, inputArray)
    }

    // Handle TopFlow-specific nodes
    switch (node.type) {
      case 'httpRequest':
        return this.executeHttpRequestNode(node, inputs)

      case 'textModel':
        return this.executeTextModelNode(node, inputs, context)

      case 'imageGeneration':
        return this.executeImageGenerationNode(node, inputs, context)

      case 'audio':
        return this.executeAudioNode(node, inputs, context)

      case 'embeddingModel':
        return this.executeEmbeddingModelNode(node, inputs, context)

      case 'structuredOutput':
        return this.executeStructuredOutputNode(node, inputs, context)

      case 'tool':
        return this.executeToolNode(node, inputs)

      default:
        // Fall back to base implementation for shared nodes
        return super.executeNode(node, inputs, context)
    }
  }

  private async executeHttpRequestNode(node: Node, inputs: Record<string, any>): Promise<any> {
    const data = node.data as any
    const url = data.url || ''
    const method = (data.method || 'GET').toUpperCase()
    const headers = data.headers || {}
    const body = data.body || ''

    // Variable interpolation for URL
    let interpolatedUrl = url
    Object.entries(inputs).forEach(([key, value]) => {
      const varName = `$${key}`
      interpolatedUrl = interpolatedUrl.replace(new RegExp(`\\${varName}`, 'g'), String(value))
    })

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

    const response = await fetch(interpolatedUrl, options)
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
    const modelId = data.model || 'gemini-2.5-flash-image'

    // Google Gemini for image generation
    const model = google(modelId)

    const prompt = inputs.input1 || ''

    const result = await generateText({
      model,
      prompt: String(prompt),
    })

    // Extract base64 images from files
    const images =
      result.files?.filter((f: any) => f.mediaType.startsWith('image/')).map((f: any) => f.base64) || []

    return images
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

    const result = await embed({
      model: openai.embedding(modelId),
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
    const schema = data.schema || {}

    const model = this.getModel(modelId, context.apiKeys)
    const prompt = inputs.input1 || ''

    // Build Zod schema from the schema definition
    const zodSchema = z.object(schema)

    const result = await generateObject({
      model,
      schema: zodSchema,
      prompt: String(prompt),
    })

    return JSON.stringify(result.object)
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
   */
  private getModel(modelId: string, apiKeys: Record<string, string>) {
    const [provider, model] = modelId.split('/')

    switch (provider) {
      case 'openai':
        if (!apiKeys.openai) throw new Error('OpenAI API key not configured')
        return openai(model)

      case 'anthropic':
        if (!apiKeys.anthropic) throw new Error('Anthropic API key not configured')
        return anthropic(model)

      case 'google':
        if (!apiKeys.google) throw new Error('Google API key not configured')
        return google(model)

      case 'groq':
        if (!apiKeys.groq) throw new Error('Groq API key not configured')
        return groq(model)

      default:
        throw new Error(`Unknown model provider: ${provider}`)
    }
  }
}
