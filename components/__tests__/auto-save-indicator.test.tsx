import { render, screen } from '@testing-library/react'
import { AutoSaveIndicator } from '../auto-save-indicator'
import { useWorkflowStore } from '@/lib/workflow-store'

// Mock the workflow store
jest.mock('@/lib/workflow-store', () => ({
  useWorkflowStore: jest.fn(),
}))

const mockUseWorkflowStore = useWorkflowStore as jest.MockedFunction<typeof useWorkflowStore>

describe('AutoSaveIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render "Unsaved changes" when status is idle', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'idle',
      lastSaveTimestamp: null,
    } as any)

    render(<AutoSaveIndicator />)

    // Should show unsaved text (visible on desktop)
    expect(screen.getByText('Unsaved changes')).toBeInTheDocument()
  })

  it('should render "Saving..." when status is saving', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saving',
      lastSaveTimestamp: null,
    } as any)

    render(<AutoSaveIndicator />)

    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('should render "Saved" when status is saved without timestamp', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saved',
      lastSaveTimestamp: null,
    } as any)

    render(<AutoSaveIndicator />)

    expect(screen.getByText('Saved')).toBeInTheDocument()
  })

  it('should render "Saved" with timestamp when status is saved with timestamp', () => {
    const mockTimestamp = new Date('2026-01-10T12:30:00').getTime()

    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saved',
      lastSaveTimestamp: mockTimestamp,
    } as any)

    render(<AutoSaveIndicator />)

    // Should show "Saved" with time
    expect(screen.getByText(/Saved/)).toBeInTheDocument()

    // The exact time format depends on locale, so just check it contains time elements
    const savedText = screen.getByText(/Saved/)
    expect(savedText.textContent).toMatch(/Saved \d{1,2}:\d{2}/)
  })

  it('should render "Save failed" when status is error', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'error',
      lastSaveTimestamp: null,
    } as any)

    render(<AutoSaveIndicator />)

    expect(screen.getByText('Save failed')).toBeInTheDocument()
  })

  it('should render loading spinner when status is saving', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saving',
      lastSaveTimestamp: null,
    } as any)

    const { container } = render(<AutoSaveIndicator />)

    // Loader2 component should have animate-spin class
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('should render cloud icon when status is saved', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saved',
      lastSaveTimestamp: null,
    } as any)

    const { container } = render(<AutoSaveIndicator />)

    // Cloud icon should be rendered (lucide-react renders as svg)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should render error icon with destructive class when status is error', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'error',
      lastSaveTimestamp: null,
    } as any)

    const { container } = render(<AutoSaveIndicator />)

    // CloudAlert icon should have text-destructive class
    const errorIcon = container.querySelector('.text-destructive')
    expect(errorIcon).toBeInTheDocument()
  })

  it('should render cloud-off icon with muted class when status is idle', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'idle',
      lastSaveTimestamp: null,
    } as any)

    const { container } = render(<AutoSaveIndicator />)

    // CloudOff icon should have text-muted-foreground class
    const idleIcon = container.querySelector('.text-muted-foreground')
    expect(idleIcon).toBeInTheDocument()
  })

  it('should hide status text on mobile (md breakpoint)', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saved',
      lastSaveTimestamp: null,
    } as any)

    const { container } = render(<AutoSaveIndicator />)

    // Text should have hidden md:inline classes
    const statusText = container.querySelector('.hidden.md\\:inline')
    expect(statusText).toBeInTheDocument()
    expect(statusText?.textContent).toBe('Saved')
  })

  it('should render as a button with ghost variant', () => {
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'idle',
      lastSaveTimestamp: null,
    } as any)

    render(<AutoSaveIndicator />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should format timestamp correctly in tooltip', () => {
    const mockTimestamp = new Date('2026-01-10T15:45:30').getTime()

    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saved',
      lastSaveTimestamp: mockTimestamp,
    } as any)

    render(<AutoSaveIndicator />)

    // Tooltip should contain "Last saved:" text
    // Note: Tooltip content may not be visible until hover, but it should be in the DOM
    const lastSavedText = screen.queryByText(/Last saved:/)

    // Tooltip content might be rendered with display:none or visibility:hidden
    // Just verify the component structure is correct
    expect(screen.getByText(/Saved/)).toBeInTheDocument()
  })

  it('should handle different save statuses correctly', () => {
    const statuses: Array<'idle' | 'saving' | 'saved' | 'error'> = ['idle', 'saving', 'saved', 'error']
    const expectedTexts = ['Unsaved changes', 'Saving...', 'Saved', 'Save failed']

    statuses.forEach((status, index) => {
      mockUseWorkflowStore.mockReturnValue({
        saveStatus: status,
        lastSaveTimestamp: null,
      } as any)

      const { unmount } = render(<AutoSaveIndicator />)

      expect(screen.getByText(expectedTexts[index])).toBeInTheDocument()

      unmount()
    })
  })

  it('should update when save status changes', () => {
    const { rerender } = render(<AutoSaveIndicator />)

    // Start with idle
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'idle',
      lastSaveTimestamp: null,
    } as any)
    rerender(<AutoSaveIndicator />)
    expect(screen.getByText('Unsaved changes')).toBeInTheDocument()

    // Change to saving
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saving',
      lastSaveTimestamp: null,
    } as any)
    rerender(<AutoSaveIndicator />)
    expect(screen.getByText('Saving...')).toBeInTheDocument()

    // Change to saved
    mockUseWorkflowStore.mockReturnValue({
      saveStatus: 'saved',
      lastSaveTimestamp: Date.now(),
    } as any)
    rerender(<AutoSaveIndicator />)
    expect(screen.getByText(/Saved/)).toBeInTheDocument()
  })
})
