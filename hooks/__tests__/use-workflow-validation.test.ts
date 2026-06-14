import { renderHook } from '@testing-library/react'
import type { Edge } from '@xyflow/react'
import { useWorkflowValidation } from '../use-workflow-validation'
import * as validationEngine from '@/lib/security/validation-engine'

// Mock the validation engine
jest.mock('@/lib/security/validation-engine', () => ({
  validateWorkflow: jest.fn(),
  validateApiKeys: jest.fn(),
}))

describe('useWorkflowValidation', () => {
  const mockValidateWorkflow = validationEngine.validateWorkflow as jest.MockedFunction<
    typeof validationEngine.validateWorkflow
  >
  const mockValidateApiKeys = validationEngine.validateApiKeys as jest.MockedFunction<
    typeof validationEngine.validateApiKeys
  >

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementations
    mockValidateWorkflow.mockReturnValue({
      isValid: true,
      overallScore: 100,
      errors: [],
      warnings: [],
      securityChecks: [],
    })

    mockValidateApiKeys.mockReturnValue([])
  })

  it('should return validation results', () => {
    const nodes = [{ id: '1', type: 'start' }]
    const edges: Edge[] = []
    const apiKeys = {}

    const { result } = renderHook(() =>
      useWorkflowValidation(nodes, edges, apiKeys)
    )

    expect(result.current).toBeDefined()
    expect(result.current.isValid).toBe(true)
    expect(result.current.errors).toEqual([])
    expect(result.current.warnings).toEqual([])
  })

  it('should call validateWorkflow with nodes and edges', () => {
    const nodes = [{ id: '1', type: 'start' }]
    const edges = [{ id: 'e1', source: '1', target: '2' }]
    const apiKeys = {}

    renderHook(() => useWorkflowValidation(nodes, edges, apiKeys))

    expect(mockValidateWorkflow).toHaveBeenCalledWith(nodes, edges)
  })

  it('should call validateApiKeys with apiKeys and nodes', () => {
    const nodes = [{ id: '1', type: 'textModel' }]
    const edges: Edge[] = []
    const apiKeys = { openai: 'sk-test' }

    renderHook(() => useWorkflowValidation(nodes, edges, apiKeys))

    expect(mockValidateApiKeys).toHaveBeenCalledWith(apiKeys, nodes)
  })

  it('should combine workflow errors with API key errors', () => {
    mockValidateWorkflow.mockReturnValue({
      isValid: false,
      overallScore: 50,
      errors: [
        { id: '1', severity: 'error', category: 'validation', title: 'Workflow error', description: 'Error desc', nodeId: 'node-1' },
      ],
      warnings: [],
      securityChecks: [],
    })

    mockValidateApiKeys.mockReturnValue([
      { id: '2', severity: 'error', category: 'api_key', title: 'Missing API key', description: 'Key missing', nodeId: 'node-2' },
    ])

    const { result } = renderHook(() =>
      useWorkflowValidation([{ id: '1' }], [], {})
    )

    expect(result.current.errors).toHaveLength(2)
    expect(result.current.errors[0].title).toBe('Workflow error')
    expect(result.current.errors[1].title).toBe('Missing API key')
  })

  it('should combine workflow warnings with API key warnings', () => {
    mockValidateWorkflow.mockReturnValue({
      isValid: true,
      overallScore: 80,
      errors: [],
      warnings: [
        {
          id: '1',
          severity: 'warning',
          category: 'validation',
          title: 'Workflow warning',
          description: 'Warning desc',
          nodeId: 'node-1',
        },
      ],
      securityChecks: [],
    })

    mockValidateApiKeys.mockReturnValue([
      {
        id: '2',
        severity: 'warning',
        category: 'api_key',
        title: 'API key warning',
        description: 'Key warning',
        nodeId: 'node-2',
      },
    ])

    const { result } = renderHook(() =>
      useWorkflowValidation([{ id: '1' }], [], {})
    )

    expect(result.current.warnings).toHaveLength(2)
    expect(result.current.warnings[0].title).toBe('Workflow warning')
    expect(result.current.warnings[1].title).toBe('API key warning')
  })

  it('should separate API key issues by severity', () => {
    mockValidateWorkflow.mockReturnValue({
      isValid: true,
      overallScore: 100,
      errors: [],
      warnings: [],
      securityChecks: [],
    })

    mockValidateApiKeys.mockReturnValue([
      { id: '1', severity: 'error', category: 'api_key', title: 'Error issue', description: 'Error desc', nodeId: 'node-1' },
      { id: '2', severity: 'warning', category: 'api_key', title: 'Warning issue', description: 'Warning desc', nodeId: 'node-2' },
    ])

    const { result } = renderHook(() =>
      useWorkflowValidation([{ id: '1' }], [], {})
    )

    expect(result.current.errors).toHaveLength(1)
    expect(result.current.errors[0].title).toBe('Error issue')
    expect(result.current.warnings).toHaveLength(1)
    expect(result.current.warnings[0].title).toBe('Warning issue')
  })

  it('should memoize results when inputs do not change', () => {
    const nodes = [{ id: '1', type: 'start' }]
    const edges: Edge[] = []
    const apiKeys = {}

    const { result, rerender } = renderHook(() =>
      useWorkflowValidation(nodes, edges, apiKeys)
    )

    const firstResult = result.current

    // Rerender with same inputs
    rerender()

    // Should return the same object reference (memoized)
    expect(result.current).toBe(firstResult)
    expect(mockValidateWorkflow).toHaveBeenCalledTimes(1)
    expect(mockValidateApiKeys).toHaveBeenCalledTimes(1)
  })

  it('should recompute when nodes change', () => {
    const initialNodes = [{ id: '1', type: 'start' }]
    const edges: Edge[] = []
    const apiKeys = {}

    const { result, rerender } = renderHook(
      ({ nodes }) => useWorkflowValidation(nodes, edges, apiKeys),
      { initialProps: { nodes: initialNodes } }
    )

    const firstResult = result.current

    // Rerender with different nodes
    const newNodes = [{ id: '2', type: 'end' }]
    rerender({ nodes: newNodes })

    // Should return a different object (recomputed)
    expect(result.current).not.toBe(firstResult)
    expect(mockValidateWorkflow).toHaveBeenCalledTimes(2)
  })

  it('should recompute when edges change', () => {
    const nodes = [{ id: '1', type: 'start' }]
    const initialEdges: Edge[] = []
    const apiKeys = {}

    const { result, rerender } = renderHook(
      ({ edges }) => useWorkflowValidation(nodes, edges, apiKeys),
      { initialProps: { edges: initialEdges } }
    )

    const firstResult = result.current

    // Rerender with different edges
    const newEdges = [{ id: 'e1', source: '1', target: '2' }]
    rerender({ edges: newEdges })

    // Should return a different object (recomputed)
    expect(result.current).not.toBe(firstResult)
    expect(mockValidateWorkflow).toHaveBeenCalledTimes(2)
  })

  it('should recompute when apiKeys change', () => {
    const nodes = [{ id: '1', type: 'textModel' }]
    const edges: Edge[] = []
    const initialApiKeys = {}

    const { result, rerender } = renderHook(
      ({ apiKeys }) => useWorkflowValidation(nodes, edges, apiKeys),
      { initialProps: { apiKeys: initialApiKeys } }
    )

    const firstResult = result.current

    // Rerender with different apiKeys
    const newApiKeys = { openai: 'sk-test' }
    rerender({ apiKeys: newApiKeys })

    // Should return a different object (recomputed)
    expect(result.current).not.toBe(firstResult)
    expect(mockValidateApiKeys).toHaveBeenCalledTimes(2)
  })

  it('should preserve workflow validation properties', () => {
    mockValidateWorkflow.mockReturnValue({
      isValid: false,
      overallScore: 60,
      errors: [{ id: '1', severity: 'error', category: 'validation', title: 'Error', description: 'Error desc', nodeId: '1' }],
      warnings: [],
      securityChecks: [{ id: 'check-1', name: 'SSRF Check', passed: true, description: 'No SSRF detected', impact: 'high' }],
    })

    const { result } = renderHook(() =>
      useWorkflowValidation([{ id: '1' }], [], {})
    )

    expect(result.current.isValid).toBe(false)
    expect(result.current.overallScore).toBe(60)
    expect(result.current.securityChecks).toEqual([
      { id: 'check-1', name: 'SSRF Check', passed: true, description: 'No SSRF detected', impact: 'high' },
    ])
  })
})
