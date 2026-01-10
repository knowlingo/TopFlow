import { renderHook, act } from '@testing-library/react'
import { useAutoSave } from '../use-auto-save'
import { useWorkflowStore } from '@/lib/workflow-store'

// Mock the workflow store
jest.mock('@/lib/workflow-store', () => ({
  useWorkflowStore: jest.fn(),
}))

const mockUseWorkflowStore = useWorkflowStore as jest.MockedFunction<typeof useWorkflowStore>

describe('useAutoSave', () => {
  let mockSetSaveStatus: jest.Mock
  let mockSetLastSaveTimestamp: jest.Mock

  beforeEach(() => {
    jest.useFakeTimers()
    localStorage.clear()
    jest.clearAllMocks()

    mockSetSaveStatus = jest.fn()
    mockSetLastSaveTimestamp = jest.fn()

    mockUseWorkflowStore.mockReturnValue({
      setSaveStatus: mockSetSaveStatus,
      setLastSaveTimestamp: mockSetLastSaveTimestamp,
    } as any)
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should save workflow to localStorage after debounce delay', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    renderHook(() => useAutoSave(nodes, edges))

    // Fast-forward debounce delay (2 seconds)
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    const saved = localStorage.getItem('ai-agent-builder-workflow')
    expect(saved).toBeDefined()
    expect(JSON.parse(saved!)).toEqual({ nodes, edges })
  })

  it('should create autosave with timestamp', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    const mockNow = 1234567890
    jest.spyOn(Date, 'now').mockReturnValue(mockNow)

    renderHook(() => useAutoSave(nodes, edges))

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    const autoSaveKey = `ai-agent-builder-autosave-${mockNow}`
    const autosaved = localStorage.getItem(autoSaveKey)
    expect(autosaved).toBeDefined()
    expect(JSON.parse(autosaved!)).toEqual({ nodes, edges })
  })

  it('should update save status to "saving" then "saved"', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    renderHook(() => useAutoSave(nodes, edges))

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(mockSetSaveStatus).toHaveBeenCalledWith('saving')
    expect(mockSetSaveStatus).toHaveBeenCalledWith('saved')
  })

  it('should update last save timestamp', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    const mockNow = 1234567890
    jest.spyOn(Date, 'now').mockReturnValue(mockNow)

    renderHook(() => useAutoSave(nodes, edges))

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(mockSetLastSaveTimestamp).toHaveBeenCalledWith(mockNow)
  })

  it('should not save if workflow has not changed', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    renderHook(() => useAutoSave(nodes, edges))

    // First save
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    mockSetSaveStatus.mockClear()

    // Second attempt with same data
    act(() => {
      jest.advanceTimersByTime(30000) // Auto-save interval
    })

    // Should not call setSaveStatus again since data didn't change
    expect(mockSetSaveStatus).not.toHaveBeenCalled()
  })

  it('should save on 30-second auto-save interval', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    renderHook(() => useAutoSave(nodes, edges))

    // Advance to auto-save interval (30 seconds)
    act(() => {
      jest.advanceTimersByTime(30000)
    })

    const saved = localStorage.getItem('ai-agent-builder-workflow')
    expect(saved).toBeDefined()
  })

  it('should reset debounce timer when nodes change', () => {
    const initialNodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    const { rerender } = renderHook(
      ({ nodes }) => useAutoSave(nodes, edges),
      { initialProps: { nodes: initialNodes } }
    )

    // Wait 1.5 seconds (not enough for debounce)
    act(() => {
      jest.advanceTimersByTime(1500)
    })

    // Change nodes (should reset timer)
    const updatedNodes = [
      { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
      { id: '2', type: 'end', position: { x: 100, y: 0 }, data: {} },
    ]
    rerender({ nodes: updatedNodes })

    // Wait another 1.5 seconds (total 3s, but timer was reset)
    act(() => {
      jest.advanceTimersByTime(1500)
    })

    // Should not have saved yet (timer was reset at 1.5s mark)
    const saved = localStorage.getItem('ai-agent-builder-workflow')
    expect(saved).toBeNull()

    // Wait final 500ms to complete debounce
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now should be saved with updated nodes
    const savedAfterDebounce = localStorage.getItem('ai-agent-builder-workflow')
    expect(savedAfterDebounce).toBeDefined()
    expect(JSON.parse(savedAfterDebounce!).nodes).toHaveLength(2)
  })

  it('should cleanup old autosaves and keep last 5', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    // Create 7 old autosaves
    for (let i = 1; i <= 7; i++) {
      const timestamp = 1000000 + i * 1000
      localStorage.setItem(
        `ai-agent-builder-autosave-${timestamp}`,
        JSON.stringify({ nodes: [], edges: [] })
      )
    }

    expect(
      Object.keys(localStorage).filter((k) => k.startsWith('ai-agent-builder-autosave-'))
    ).toHaveLength(7)

    // New save should trigger cleanup
    const mockNow = 9999999999
    jest.spyOn(Date, 'now').mockReturnValue(mockNow)

    renderHook(() => useAutoSave(nodes, edges))

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    // Should have 5 total (cleanup keeps last 5)
    const autosaveKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith('ai-agent-builder-autosave-')
    )
    expect(autosaveKeys).toHaveLength(5)

    // Check that oldest 3 were removed
    expect(localStorage.getItem('ai-agent-builder-autosave-1001000')).toBeNull()
    expect(localStorage.getItem('ai-agent-builder-autosave-1002000')).toBeNull()
    expect(localStorage.getItem('ai-agent-builder-autosave-1003000')).toBeNull()

    // Check that newest 5 are kept
    expect(localStorage.getItem('ai-agent-builder-autosave-1004000')).not.toBeNull()
    expect(localStorage.getItem('ai-agent-builder-autosave-1007000')).not.toBeNull()
    expect(localStorage.getItem(`ai-agent-builder-autosave-${mockNow}`)).not.toBeNull()
  })

  it('should handle localStorage errors gracefully', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    // Mock localStorage.setItem to throw error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage quota exceeded')
    })

    renderHook(() => useAutoSave(nodes, edges))

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(mockSetSaveStatus).toHaveBeenCalledWith('error')
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to save workflow:',
      expect.any(Error)
    )

    consoleErrorSpy.mockRestore()
  })

  it('should return saveWorkflow function', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    const { result } = renderHook(() => useAutoSave(nodes, edges))

    expect(result.current.saveWorkflow).toBeDefined()
    expect(typeof result.current.saveWorkflow).toBe('function')
  })

  it('should allow manual save via returned function', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    const { result } = renderHook(() => useAutoSave(nodes, edges))

    // Manual save (not autosave)
    act(() => {
      result.current.saveWorkflow(false)
    })

    // Should save to main storage
    const saved = localStorage.getItem('ai-agent-builder-workflow')
    expect(saved).toBeDefined()

    // Should NOT create autosave with timestamp
    const autosaveKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith('ai-agent-builder-autosave-')
    )
    expect(autosaveKeys).toHaveLength(0)
  })

  it('should cleanup intervals on unmount', () => {
    const nodes = [{ id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const edges = []

    const { unmount } = renderHook(() => useAutoSave(nodes, edges))

    unmount()

    // Advance time significantly
    act(() => {
      jest.advanceTimersByTime(60000)
    })

    // Should not save after unmount
    expect(mockSetSaveStatus).not.toHaveBeenCalled()
  })
})
