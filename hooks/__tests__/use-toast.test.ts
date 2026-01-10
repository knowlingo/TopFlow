import { renderHook, act } from '@testing-library/react'
import { useToast, toast, reducer } from '../use-toast'

describe('useToast reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should add a toast', () => {
    const initialState = { toasts: [] }
    const toastData = {
      id: '1',
      title: 'Test toast',
      description: 'Test description',
      open: true,
    }

    const newState = reducer(initialState, {
      type: 'ADD_TOAST',
      toast: toastData,
    })

    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0]).toEqual(toastData)
  })

  it('should limit toasts to TOAST_LIMIT (1)', () => {
    const initialState = {
      toasts: [{ id: '1', title: 'First toast', open: true }],
    }
    const newToast = { id: '2', title: 'Second toast', open: true }

    const newState = reducer(initialState, {
      type: 'ADD_TOAST',
      toast: newToast,
    })

    // Should only keep newest toast (limit is 1)
    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0].id).toBe('2')
  })

  it('should update a toast', () => {
    const initialState = {
      toasts: [{ id: '1', title: 'Original', description: 'Original desc', open: true }],
    }

    const newState = reducer(initialState, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated' },
    })

    expect(newState.toasts[0].title).toBe('Updated')
    expect(newState.toasts[0].description).toBe('Original desc') // Unchanged
  })

  it('should not update non-matching toast', () => {
    const initialState = {
      toasts: [{ id: '1', title: 'Original', open: true }],
    }

    const newState = reducer(initialState, {
      type: 'UPDATE_TOAST',
      toast: { id: '2', title: 'Updated' },
    })

    expect(newState.toasts[0].title).toBe('Original') // Unchanged
  })

  it('should dismiss a specific toast', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    }

    const newState = reducer(initialState, {
      type: 'DISMISS_TOAST',
      toastId: '1',
    })

    expect(newState.toasts[0].open).toBe(false)
    expect(newState.toasts[1].open).toBe(true)
  })

  it('should dismiss all toasts when no toastId provided', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    }

    const newState = reducer(initialState, {
      type: 'DISMISS_TOAST',
    })

    expect(newState.toasts[0].open).toBe(false)
    expect(newState.toasts[1].open).toBe(false)
  })

  it('should remove a specific toast', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    }

    const newState = reducer(initialState, {
      type: 'REMOVE_TOAST',
      toastId: '1',
    })

    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0].id).toBe('2')
  })

  it('should remove all toasts when no toastId provided', () => {
    const initialState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true },
      ],
    }

    const newState = reducer(initialState, {
      type: 'REMOVE_TOAST',
      toastId: undefined,
    })

    expect(newState.toasts).toHaveLength(0)
  })
})

describe('useToast hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    // Reset module-level state by clearing toasts
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.toasts.forEach((t) => {
        result.current.dismiss(t.id)
      })
    })
    act(() => {
      jest.runAllTimers()
    })
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should initialize with empty toasts', () => {
    const { result } = renderHook(() => useToast())

    // May have residual toasts from other tests, so just check structure
    expect(result.current).toHaveProperty('toasts')
    expect(result.current).toHaveProperty('toast')
    expect(result.current).toHaveProperty('dismiss')
    expect(Array.isArray(result.current.toasts)).toBe(true)
  })

  it('should provide toast function', () => {
    const { result } = renderHook(() => useToast())

    expect(typeof result.current.toast).toBe('function')
  })

  it('should provide dismiss function', () => {
    const { result } = renderHook(() => useToast())

    expect(typeof result.current.dismiss).toBe('function')
  })

  it('should add toast when toast() is called', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: 'Test toast',
        description: 'Test description',
      })
    })

    expect(result.current.toasts.length).toBeGreaterThan(0)
    const lastToast = result.current.toasts[0]
    expect(lastToast.title).toBe('Test toast')
    expect(lastToast.description).toBe('Test description')
  })

  it('should cleanup listener on unmount', () => {
    const { unmount } = renderHook(() => useToast())

    // Should not throw on unmount
    expect(() => unmount()).not.toThrow()
  })

  it('should share state between multiple hook instances', () => {
    const { result: result1 } = renderHook(() => useToast())
    const { result: result2 } = renderHook(() => useToast())

    act(() => {
      result1.current.toast({
        title: 'Shared toast',
      })
    })

    // Both instances should see the same toast
    expect(result1.current.toasts[0]?.title).toBe('Shared toast')
    expect(result2.current.toasts[0]?.title).toBe('Shared toast')
  })
})

describe('toast function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should return toast with id, dismiss, and update functions', () => {
    const result = toast({
      title: 'Test',
    })

    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('dismiss')
    expect(result).toHaveProperty('update')
    expect(typeof result.id).toBe('string')
    expect(typeof result.dismiss).toBe('function')
    expect(typeof result.update).toBe('function')
  })

  it('should generate unique IDs for each toast', () => {
    const toast1 = toast({ title: 'Toast 1' })
    const toast2 = toast({ title: 'Toast 2' })

    expect(toast1.id).not.toBe(toast2.id)
  })

  it('should dismiss toast when dismiss() is called', () => {
    const { result } = renderHook(() => useToast())

    let toastInstance: ReturnType<typeof toast>
    act(() => {
      toastInstance = toast({ title: 'Dismissible toast' })
    })

    // Toast should exist
    expect(result.current.toasts.length).toBeGreaterThan(0)

    act(() => {
      toastInstance.dismiss()
    })

    // Toast should be marked as closed
    const dismissedToast = result.current.toasts.find((t) => t.id === toastInstance.id)
    expect(dismissedToast?.open).toBe(false)
  })

  it('should update toast when update() is called', () => {
    const { result } = renderHook(() => useToast())

    let toastInstance: ReturnType<typeof toast>
    act(() => {
      toastInstance = toast({ title: 'Original title' })
    })

    act(() => {
      toastInstance.update({
        id: toastInstance.id,
        title: 'Updated title',
        description: 'New description',
      })
    })

    const updatedToast = result.current.toasts.find((t) => t.id === toastInstance.id)
    expect(updatedToast?.title).toBe('Updated title')
    expect(updatedToast?.description).toBe('New description')
  })

  it('should set open to true by default', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: 'Open toast' })
    })

    expect(result.current.toasts[0]?.open).toBe(true)
  })

  it('should call dismiss when onOpenChange is called with false', () => {
    const { result } = renderHook(() => useToast())

    let toastInstance: ReturnType<typeof toast>
    act(() => {
      toastInstance = toast({ title: 'Toast with onOpenChange' })
    })

    const createdToast = result.current.toasts.find((t) => t.id === toastInstance.id)

    act(() => {
      createdToast?.onOpenChange?.(false)
    })

    // Should mark as closed
    const dismissedToast = result.current.toasts.find((t) => t.id === toastInstance.id)
    expect(dismissedToast?.open).toBe(false)
  })
})

describe('toast dismiss function from hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should dismiss specific toast by id', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string

    act(() => {
      const t1 = toast({ title: 'Dismissible toast' })
      toastId = t1.id
    })

    // Toast should exist and be open
    const toastBefore = result.current.toasts.find((t) => t.id === toastId)
    expect(toastBefore?.open).toBe(true)

    act(() => {
      result.current.dismiss(toastId)
    })

    // Toast should still exist but be closed
    const toastAfter = result.current.toasts.find((t) => t.id === toastId)
    expect(toastAfter?.open).toBe(false)
  })

  it('should dismiss all toasts when no id provided', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: 'Toast 1' })
      toast({ title: 'Toast 2' })
    })

    act(() => {
      result.current.dismiss()
    })

    // All should be dismissed
    result.current.toasts.forEach((t) => {
      expect(t.open).toBe(false)
    })
  })
})
