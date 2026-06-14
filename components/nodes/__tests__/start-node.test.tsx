import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import StartNode, { type StartNodeData } from '../start-node'
import type { NodeProps, Node } from '@xyflow/react'

// Mock the status color utility
jest.mock('@charliesu/workflow-core', () => ({
  getStatusColor: jest.fn((status: string, selected: boolean) => {
    const colors = {
      idle: 'border-border',
      running: 'border-yellow-500',
      completed: 'border-green-500',
      error: 'border-red-500',
    }
    const selectedClass = selected ? 'ring-2' : ''
    return `${colors[status as keyof typeof colors] || 'border-border'} ${selectedClass}`
  }),
}))

const createNodeProps = (data: StartNodeData, selected = false): any => ({
  id: 'start-1',
  data,
  selected,
  type: 'start',
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  dragging: false,
})

describe('StartNode', () => {
  const renderNode = (data: StartNodeData, selected = false) => {
    return render(
      <ReactFlowProvider>
        <StartNode {...createNodeProps(data, selected)} />
      </ReactFlowProvider>
    )
  }

  it('should render with title and description', () => {
    renderNode({})

    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('Workflow entry point')).toBeInTheDocument()
  })

  it('should render Play icon', () => {
    const { container } = renderNode({})

    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('should render in idle state by default', () => {
    const { container } = renderNode({})

    expect(container.querySelector('.border-border')).toBeInTheDocument()
    expect(screen.queryByText('Starting...')).not.toBeInTheDocument()
  })

  it('should show "Starting..." when status is running', () => {
    renderNode({ status: 'running' })

    expect(screen.getByText('Starting...')).toBeInTheDocument()
  })

  it('should show pulsing indicator when running', () => {
    const { container } = renderNode({ status: 'running' })

    const pulsingDot = container.querySelector('.animate-pulse')
    expect(pulsingDot).toBeInTheDocument()
  })

  it('should apply running status color', () => {
    const { container } = renderNode({ status: 'running' })

    expect(container.querySelector('.border-yellow-500')).toBeInTheDocument()
  })

  it('should apply completed status color', () => {
    const { container } = renderNode({ status: 'completed' })

    expect(container.querySelector('.border-green-500')).toBeInTheDocument()
  })

  it('should apply error status color', () => {
    const { container } = renderNode({ status: 'error' })

    expect(container.querySelector('.border-red-500')).toBeInTheDocument()
  })

  it('should show selected state', () => {
    const { container } = renderNode({}, true)

    expect(container.querySelector('.ring-2')).toBeInTheDocument()
  })

  it('should not show "Starting..." when not running', () => {
    renderNode({ status: 'idle' })
    expect(screen.queryByText('Starting...')).not.toBeInTheDocument()

    const { rerender } = renderNode({ status: 'completed' })
    expect(screen.queryByText('Starting...')).not.toBeInTheDocument()
  })

  it('should have source handle for connections', () => {
    const { container } = renderNode({})

    // Handle is rendered as a div with specific data attributes
    const handles = container.querySelectorAll('[data-handlepos="right"]')
    expect(handles.length).toBeGreaterThan(0)
  })

  it('should apply green accent color to icon and handle', () => {
    const { container } = renderNode({})

    // Icon background should be green
    const iconBg = container.querySelector('.bg-green-500')
    expect(iconBg).toBeInTheDocument()
  })

  it('should handle output data', () => {
    const outputData = { result: 'workflow started' }
    renderNode({ output: outputData })

    // Output data is stored but not displayed in start node
    expect(screen.getByText('Start')).toBeInTheDocument()
  })

  it('should render Card component', () => {
    const { container } = renderNode({})

    // Card should have min width
    const card = container.querySelector('.min-w-\\[170px\\]')
    expect(card).toBeInTheDocument()
  })

  it('should have backdrop blur styling', () => {
    const { container } = renderNode({})

    const backdropBlur = container.querySelector('.backdrop-blur-sm')
    expect(backdropBlur).toBeInTheDocument()
  })
})
