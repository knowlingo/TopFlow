/**
 * TypeScript types for demo data system
 */

export interface DemoResult {
  templateId: string
  workflowName: string
  outputs: Record<string, any>
  nodeResults: Record<string, NodeResult>
  executionTime: number // Total simulated execution time (ms)
  timestamp: string
  metadata?: {
    aiModelsUsed: string[]
    apiCalls: number
    dataSources: string[]
  }
}

export interface NodeResult {
  nodeId: string
  nodeType: string
  output: any // Type depends on node
  duration: number // Simulated duration (ms)
  status: "completed" | "error"
  error?: string
}

export interface BinaryAsset {
  type: "image" | "audio" | "file"
  format: "png" | "jpg" | "mp3" | "pdf"
  url: string // Can be data URL or public path
  size: number // Bytes
  dimensions?: { width: number; height: number }
}

// Node-specific output types
export interface ImageOutput {
  type: "image"
  url: string // data:image/png;base64,... or /demo-assets/...
  format: "png" | "jpg"
  dimensions?: { width: number; height: number }
}

export interface TextOutput {
  type: "text"
  content: string
}

export interface StructuredOutput {
  type: "structured"
  schema: string
  data: Record<string, any>
}

export interface AudioOutput {
  type: "audio"
  url: string // data:audio/mp3;base64,... or /demo-assets/...
  format: "mp3" | "wav"
  duration: number // seconds
}

export interface HttpResponse {
  status: number
  data: any
  headers?: Record<string, string>
}
