import { renderHook } from '@testing-library/react'
import { useKeyboardShortcuts } from '../use-keyboard-shortcuts'
import { useHotkeys } from 'react-hotkeys-hook'

// Mock react-hotkeys-hook
jest.mock('react-hotkeys-hook', () => ({
  useHotkeys: jest.fn(),
}))

const mockUseHotkeys = useHotkeys as jest.MockedFunction<typeof useHotkeys>

describe('useKeyboardShortcuts', () => {
  let mockCallbacks: any
  let mockReactFlowInstance: any

  beforeEach(() => {
    jest.clearAllMocks()

    mockCallbacks = {
      onDelete: jest.fn(),
      onDuplicate: jest.fn(),
      onSelectAll: jest.fn(),
      onSave: jest.fn(),
      onRun: jest.fn(),
      onExport: jest.fn(),
      onUndo: jest.fn(),
      onRedo: jest.fn(),
      onFitView: jest.fn(),
    }

    mockReactFlowInstance = {
      zoomIn: jest.fn(),
      zoomOut: jest.fn(),
    }
  })

  it('should register all keyboard shortcuts', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    // Should call useHotkeys 11 times (one for each shortcut)
    expect(mockUseHotkeys).toHaveBeenCalledTimes(11)
  })

  it('should register delete and backspace shortcuts', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      ['delete', 'backspace'],
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        enableOnContentEditable: false,
        preventDefault: true,
      }),
      [mockCallbacks.onDelete]
    )
  })

  it('should call onDelete when delete shortcut handler is triggered', () => {
    let deleteHandler: Function | null = null

    mockUseHotkeys.mockImplementation((keys, handler) => {
      if (Array.isArray(keys) && keys.includes('delete')) {
        deleteHandler = handler as Function
      }
    })

    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    const mockEvent = { preventDefault: jest.fn() }
    deleteHandler?.(mockEvent as any, {} as any)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockCallbacks.onDelete).toHaveBeenCalled()
  })

  it('should register mod+d for duplicate', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+d',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockCallbacks.onDuplicate]
    )
  })

  it('should register mod+a for select all', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+a',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockCallbacks.onSelectAll]
    )
  })

  it('should register mod+s for save', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+s',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockCallbacks.onSave]
    )
  })

  it('should register mod+enter for run', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+enter',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockCallbacks.onRun]
    )
  })

  it('should register mod+e for export', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+e',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockCallbacks.onExport]
    )
  })

  it('should register mod+z for undo', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+z',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockCallbacks.onUndo]
    )
  })

  it('should register mod+shift+z for redo', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+shift+z',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockCallbacks.onRedo]
    )
  })

  it('should register mod+0 for fit view', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+0',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockCallbacks.onFitView]
    )
  })

  it('should register mod+plus for zoom in', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+plus',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockReactFlowInstance]
    )
  })

  it('should register mod+minus for zoom out', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    expect(mockUseHotkeys).toHaveBeenCalledWith(
      'mod+minus',
      expect.any(Function),
      expect.objectContaining({
        enableOnFormTags: false,
        preventDefault: true,
      }),
      [mockReactFlowInstance]
    )
  })

  it('should call reactFlowInstance.zoomIn when zoom in handler is triggered', () => {
    let zoomInHandler: Function | null = null

    mockUseHotkeys.mockImplementation((keys, handler) => {
      if (keys === 'mod+plus') {
        zoomInHandler = handler as Function
      }
    })

    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    const mockEvent = { preventDefault: jest.fn() }
    zoomInHandler?.(mockEvent as any, {} as any)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockReactFlowInstance.zoomIn).toHaveBeenCalled()
  })

  it('should call reactFlowInstance.zoomOut when zoom out handler is triggered', () => {
    let zoomOutHandler: Function | null = null

    mockUseHotkeys.mockImplementation((keys, handler) => {
      if (keys === 'mod+minus') {
        zoomOutHandler = handler as Function
      }
    })

    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    const mockEvent = { preventDefault: jest.fn() }
    zoomOutHandler?.(mockEvent as any, {} as any)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockReactFlowInstance.zoomOut).toHaveBeenCalled()
  })

  it('should handle optional callbacks gracefully', () => {
    // Render without callbacks
    const { result } = renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
      })
    )

    // Should not throw
    expect(result.current).toBeUndefined()
  })

  it('should update dependencies when callbacks change', () => {
    const initialCallbacks = { ...mockCallbacks }

    const { rerender } = renderHook(
      ({ callbacks }) =>
        useKeyboardShortcuts({
          nodes: [],
          edges: [],
          reactFlowInstance: mockReactFlowInstance,
          ...callbacks,
        }),
      { initialProps: { callbacks: initialCallbacks } }
    )

    const initialCallCount = mockUseHotkeys.mock.calls.length

    // Update callbacks
    const updatedCallbacks = {
      ...mockCallbacks,
      onSave: jest.fn(),
    }

    rerender({ callbacks: updatedCallbacks })

    // Should re-register with new callbacks
    expect(mockUseHotkeys.mock.calls.length).toBeGreaterThan(initialCallCount)
  })

  it('should handle null reactFlowInstance gracefully', () => {
    let zoomInHandler: Function | null = null

    mockUseHotkeys.mockImplementation((keys, handler) => {
      if (keys === 'mod+plus') {
        zoomInHandler = handler as Function
      }
    })

    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: null,
        ...mockCallbacks,
      })
    )

    const mockEvent = { preventDefault: jest.fn() }

    // Should not throw even with null instance
    expect(() => {
      zoomInHandler?.(mockEvent as any, {} as any)
    }).not.toThrow()

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it('should disable shortcuts on form tags', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    // Check that most shortcuts disable on form tags
    const saveCall = mockUseHotkeys.mock.calls.find((call) => call[0] === 'mod+s')
    expect(saveCall?.[2]).toHaveProperty('enableOnFormTags', false)
  })

  it('should disable shortcuts on contentEditable elements', () => {
    renderHook(() =>
      useKeyboardShortcuts({
        nodes: [],
        edges: [],
        reactFlowInstance: mockReactFlowInstance,
        ...mockCallbacks,
      })
    )

    // Check delete shortcut (which has enableOnContentEditable)
    const deleteCall = mockUseHotkeys.mock.calls.find((call) =>
      Array.isArray(call[0]) && call[0].includes('delete')
    )
    expect(deleteCall?.[2]).toHaveProperty('enableOnContentEditable', false)
  })
})
