import { POST } from '../route'
import type { Node, Edge } from '@xyflow/react'

// Mock the TopFlowExecutionEngine
jest.mock('@/lib/topflow-execution-engine', () => ({
  TopFlowExecutionEngine: jest.fn().mockImplementation(() => ({
    executeWorkflow: jest.fn().mockResolvedValue({
      success: true,
      outputs: {},
    }),
  })),
}))

// Mock the validation functions
jest.mock('@charliesu/workflow-core', () => ({
  validateWorkflow: jest.fn(() => []),
  validateApiKeys: jest.fn(() => []),
}))

// Mock demo mode utilities
jest.mock('@/lib/demo-mode', () => ({
  shouldUseDemoMode: jest.fn(() => false),
}))

jest.mock('@/lib/demo-data', () => ({
  getDemoWorkflowResult: jest.fn(),
  hasDemoData: jest.fn(),
}))

import { TopFlowExecutionEngine } from '@/lib/topflow-execution-engine'
import { validateWorkflow, validateApiKeys } from '@charliesu/workflow-core'
import { shouldUseDemoMode } from '@/lib/demo-mode'
import { getDemoWorkflowResult } from '@/lib/demo-data'

const mockTopFlowExecutionEngine = TopFlowExecutionEngine as jest.MockedClass<typeof TopFlowExecutionEngine>
const mockValidateWorkflow = validateWorkflow as jest.MockedFunction<typeof validateWorkflow>
const mockValidateApiKeys = validateApiKeys as jest.MockedFunction<typeof validateApiKeys>
const mockShouldUseDemoMode = shouldUseDemoMode as jest.MockedFunction<typeof shouldUseDemoMode>
const mockGetDemoWorkflowResult = getDemoWorkflowResult as jest.MockedFunction<typeof getDemoWorkflowResult>

describe('POST /api/execute-workflow', () => {
  let mockNodes: Node[]
  let mockEdges: Edge[]

  // Helper to create a new request
  const createRequest = (body: any, clientId = 'test-client') => {
    return new Request('http://localhost:3000/api/execute-workflow', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-forwarded-for': clientId,
      }),
      body: JSON.stringify(body),
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Create simple test workflow
    mockNodes = [
      {
        id: '1',
        type: 'start',
        position: { x: 0, y: 0 },
        data: {},
      },
      {
        id: '2',
        type: 'end',
        position: { x: 200, y: 0 },
        data: {},
      },
    ]

    mockEdges = [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
      },
    ]

    // Reset mocks to default behavior
    mockValidateWorkflow.mockReturnValue([])
    mockValidateApiKeys.mockReturnValue([])
    mockShouldUseDemoMode.mockReturnValue(false)
  })

  describe('Rate Limiting', () => {
    it('should allow first request', async () => {
      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} }, 'client-first')
      const response = await POST(request)
      expect(response.status).not.toBe(429)
    })

    it('should block requests after rate limit (10 req/min)', async () => {
      const clientId = 'rate-limit-test-client'

      // Make 10 requests (should all succeed)
      for (let i = 0; i < 10; i++) {
        const req = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} }, clientId)
        const response = await POST(req)
        expect(response.status).not.toBe(429)
      }

      // 11th request should be rate limited
      const req = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} }, clientId)
      const response = await POST(req)
      expect(response.status).toBe(429)

      const data = await response.json()
      expect(data.error).toContain('Rate limit exceeded')
    })

    it('should use x-forwarded-for header for client identification', async () => {
      const req1 = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} }, 'client-1')
      const req2 = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} }, 'client-2')

      // Both should succeed (different clients)
      const response1 = await POST(req1)
      const response2 = await POST(req2)

      expect(response1.status).not.toBe(429)
      expect(response2.status).not.toBe(429)
    })

    it('should use "anonymous" when x-forwarded-for is missing', async () => {
      const req = new Request('http://localhost:3000/api/execute-workflow', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ nodes: mockNodes, edges: mockEdges, apiKeys: {} }),
      })

      const response = await POST(req)
      expect(response.status).not.toBe(429)
    })
  })

  describe('Input Sanitization', () => {
    it('should sanitize < and > characters from node data', async () => {
      const nodesWithXSS = [
        {
          id: '1',
          type: 'prompt',
          position: { x: 0, y: 0 },
          data: {
            prompt: '<script>alert("xss")</script>',
          },
        },
      ]

      const req = createRequest({ nodes: nodesWithXSS, edges: [], apiKeys: {} }, 'sanitization-test')

      await POST(req)

      // Check that TopFlowExecutionEngine was called with sanitized nodes
      const executionEngine = mockTopFlowExecutionEngine.mock.results[0].value
      expect(executionEngine.executeWorkflow).toHaveBeenCalled()

      const sanitizedNodes = executionEngine.executeWorkflow.mock.calls[0][0]
      expect(sanitizedNodes[0].data.prompt).toBe('scriptalert("xss")/script')
    })

    it('should preserve code and schema fields during sanitization', async () => {
      const nodesWithCode = [
        {
          id: '1',
          type: 'javascript',
          position: { x: 0, y: 0 },
          data: {
            code: 'return input1.replace(/<script>/g, "")',
            schema: '{ "type": "object" }',
          },
        },
      ]

      const req = createRequest({ nodes: nodesWithCode, edges: [], apiKeys: {} }, 'code-preservation-test')

      await POST(req)

      const executionEngine = mockTopFlowExecutionEngine.mock.results[0].value
      const sanitizedNodes = executionEngine.executeWorkflow.mock.calls[0][0]

      // Code and schema should NOT be sanitized
      expect(sanitizedNodes[0].data.code).toContain('<script>')
      expect(sanitizedNodes[0].data.schema).toBe('{ "type": "object" }')
    })
  })

  describe('Validation', () => {
    it('should return error when workflow validation fails', async () => {
      mockValidateWorkflow.mockReturnValue([
        {
          type: 'error',
          nodeId: '1',
          message: 'Cycle detected - Workflow contains a cycle',
        },
      ])

      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        const { value } = await reader.read()
        const text = decoder.decode(value)
        const update = JSON.parse(text)

        expect(update.type).toBe('error')
        expect(update.error).toContain('Validation failed')
        expect(update.error).toContain('Cycle detected')
      }
    })

    it('should return error when API key validation fails', async () => {
      mockValidateApiKeys.mockReturnValue([
        {
          type: 'error',
          nodeId: '2',
          message: 'Missing API Key - OpenAI API key is required',
        },
      ])

      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        const { value } = await reader.read()
        const text = decoder.decode(value)
        const update = JSON.parse(text)

        expect(update.type).toBe('error')
        expect(update.error).toContain('Missing API Key')
      }
    })

    it('should skip API key validation in demo mode', async () => {
      mockShouldUseDemoMode.mockReturnValue(true)
      mockGetDemoWorkflowResult.mockReturnValue({
        outputs: {},
        nodeResults: {
          '1': {
            nodeId: '1',
            nodeType: 'start',
            output: 'demo output',
            duration: 100,
            status: 'completed',
          },
        },
      })

      mockValidateApiKeys.mockReturnValue([
        {
          type: 'error',
          nodeId: '2',
          message: 'Missing API Key - OpenAI API key is required',
        },
      ])

      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      // Should NOT return API key validation error in demo mode
      if (reader) {
        const { value } = await reader.read()
        const text = decoder.decode(value)
        const update = JSON.parse(text)

        expect(update.type).toBe('node_start')
        expect(mockValidateApiKeys).not.toHaveBeenCalled()
      }
    })
  })

  describe('Demo Mode', () => {
    it('should stream demo results when in demo mode', async () => {
      mockShouldUseDemoMode.mockReturnValue(true)
      mockGetDemoWorkflowResult.mockReturnValue({
        outputs: { final: 'Demo result' },
        nodeResults: {
          '1': {
            nodeId: '1',
            nodeType: 'start',
            output: 'Start node',
            duration: 50,
            status: 'completed',
          },
          '2': {
            nodeId: '2',
            nodeType: 'end',
            output: 'End node',
            duration: 50,
            status: 'completed',
          },
        },
      })

      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      const updates = []
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const text = decoder.decode(value)
          const lines = text.split('\n').filter((line) => line.trim())
          updates.push(...lines.map((line) => JSON.parse(line)))
        }
      }

      // Should have node_start, node_complete for each node, then complete
      expect(updates).toContainEqual(expect.objectContaining({ type: 'node_start', nodeId: '1' }))
      expect(updates).toContainEqual(
        expect.objectContaining({ type: 'node_complete', nodeId: '1', output: 'Start node' })
      )
      expect(updates).toContainEqual(expect.objectContaining({ type: 'node_start', nodeId: '2' }))
      expect(updates).toContainEqual(
        expect.objectContaining({ type: 'node_complete', nodeId: '2', output: 'End node' })
      )
      expect(updates).toContainEqual(expect.objectContaining({ type: 'complete' }))
    })

    it('should return error when demo mode enabled but no demo data', async () => {
      mockShouldUseDemoMode.mockReturnValue(true)
      mockGetDemoWorkflowResult.mockReturnValue(undefined)

      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        const { value } = await reader.read()
        const text = decoder.decode(value)
        const update = JSON.parse(text)

        expect(update.type).toBe('error')
        expect(update.error).toContain('Demo mode is active')
        expect(update.error).toContain('cached demo data')
      }
    })
  })

  describe('Workflow Execution', () => {
    it('should execute workflow successfully and stream updates', async () => {
      const mockExecuteWorkflow = jest.fn((nodes, edges, options, sendUpdate) => {
        sendUpdate({ type: 'node_start', nodeId: '1' })
        sendUpdate({ type: 'node_complete', nodeId: '1', output: 'Started' })
        sendUpdate({ type: 'node_start', nodeId: '2' })
        sendUpdate({ type: 'node_complete', nodeId: '2', output: 'Completed' })
        return Promise.resolve({ success: true, outputs: {} })
      })

      mockTopFlowExecutionEngine.mockImplementation(
        () =>
          ({
            executeWorkflow: mockExecuteWorkflow,
          }) as any
      )

      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)
      expect(response.headers.get('Content-Type')).toBe('text/event-stream')
      expect(response.headers.get('Cache-Control')).toBe('no-cache')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      const updates = []
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const text = decoder.decode(value)
          const lines = text.split('\n').filter((line) => line.trim())
          updates.push(...lines.map((line) => JSON.parse(line)))
        }
      }

      expect(updates.length).toBeGreaterThan(0)
      expect(mockExecuteWorkflow).toHaveBeenCalledWith(
        expect.any(Array),
        mockEdges,
        expect.objectContaining({ apiKeys: {} }),
        expect.any(Function)
      )
    })

    it('should send error update when execution fails', async () => {
      const mockExecuteWorkflow = jest.fn(() =>
        Promise.resolve({
          success: false,
          error: 'Node execution failed',
        })
      )

      mockTopFlowExecutionEngine.mockImplementation(
        () =>
          ({
            executeWorkflow: mockExecuteWorkflow,
          }) as any
      )

      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        const { value } = await reader.read()
        const text = decoder.decode(value)
        const update = JSON.parse(text)

        expect(update.type).toBe('error')
        expect(update.error).toBe('Node execution failed')
      }
    })

    it('should handle exceptions during execution', async () => {
      const mockExecuteWorkflow = jest.fn(() => {
        throw new Error('Unexpected execution error')
      })

      mockTopFlowExecutionEngine.mockImplementation(
        () =>
          ({
            executeWorkflow: mockExecuteWorkflow,
          }) as any
      )

      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        const { value } = await reader.read()
        const text = decoder.decode(value)
        const update = JSON.parse(text)

        expect(update.type).toBe('error')
        expect(update.error).toBe('Unexpected execution error')
      }
    })
  })

  describe('Response Headers', () => {
    it('should return streaming response with correct headers', async () => {
      const request = createRequest({ nodes: mockNodes, edges: mockEdges, apiKeys: {} })
      const response = await POST(request)

      expect(response.headers.get('Content-Type')).toBe('text/event-stream')
      expect(response.headers.get('Cache-Control')).toBe('no-cache')
      expect(response.headers.get('Connection')).toBe('keep-alive')
    })
  })

  describe('Request Parsing', () => {
    it('should parse request body correctly', async () => {
      const apiKeys = { openai: 'sk-test-key' }
      const workflowId = 'test-workflow-123'

      const req = createRequest(
        {
          nodes: mockNodes,
          edges: mockEdges,
          apiKeys,
          workflowId,
        },
        'parsing-test'
      )

      await POST(req)

      expect(mockShouldUseDemoMode).toHaveBeenCalledWith(apiKeys, workflowId)
    })

    it('should use empty object for missing apiKeys', async () => {
      const req = createRequest(
        {
          nodes: mockNodes,
          edges: mockEdges,
        },
        'default-apikeys-test'
      )

      await POST(req)

      expect(mockShouldUseDemoMode).toHaveBeenCalledWith({}, undefined)
    })
  })
})
