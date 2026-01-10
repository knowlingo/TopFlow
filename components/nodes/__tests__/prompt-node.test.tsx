import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import PromptNode, { type PromptNodeData } from '../prompt-node'
import type { NodeProps } from '@xyflow/react'

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

const createNodeProps = (data: PromptNodeData, selected = false): NodeProps<PromptNodeData> => ({
  id: 'prompt-1',
  data,
  selected,
  type: 'prompt',
  xPos: 0,
  yPos: 0,
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  dragging: false,
})

describe('PromptNode', () => {
  const renderNode = (data: PromptNodeData, selected = false) => {
    return render(
      <ReactFlowProvider>
        <PromptNode {...createNodeProps(data, selected)} />
      </ReactFlowProvider>
    )
  }

  describe('Basic Rendering', () => {
    it('should render with title', () => {
      renderNode({ content: 'Hello world' })

      expect(screen.getByText('Prompt')).toBeInTheDocument()
    })

    it('should render FileText icon', () => {
      const { container } = renderNode({ content: 'Test' })

      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should have both target and source handles', () => {
      const { container } = renderNode({ content: 'Test' })

      const handles = container.querySelectorAll('[data-handleid]')
      expect(handles.length).toBe(2)
    })

    it('should have backdrop blur styling', () => {
      const { container } = renderNode({ content: 'Test' })

      const backdropBlur = container.querySelector('.backdrop-blur-sm')
      expect(backdropBlur).toBeInTheDocument()
    })

    it('should have chart-5 accent color', () => {
      const { container } = renderNode({ content: 'Test' })

      const chartBg = container.querySelector('.bg-chart-5')
      expect(chartBg).toBeInTheDocument()
    })
  })

  describe('Content Display', () => {
    it('should display prompt content', () => {
      renderNode({ content: 'Analyze this text for sentiment' })

      expect(screen.getByText('Analyze this text for sentiment')).toBeInTheDocument()
    })

    it('should show placeholder when no content', () => {
      renderNode({ content: '' })

      expect(screen.getByText('Enter your prompt...')).toBeInTheDocument()
    })

    it('should truncate long content with line-clamp', () => {
      const { container } = renderNode({
        content: 'This is a very long prompt that should be truncated with ellipsis after three lines of text to maintain a clean UI appearance'
      })

      const contentElement = container.querySelector('.line-clamp-3')
      expect(contentElement).toBeInTheDocument()
    })
  })

  describe('Variable Detection', () => {
    it('should detect $input variables in content', () => {
      renderNode({ content: 'Analyze $input1 and $input2' })

      expect(screen.getByText('Template with variables')).toBeInTheDocument()
    })

    it('should show "Input text" when no variables', () => {
      renderNode({ content: 'Static prompt without variables' })

      expect(screen.getByText('Input text')).toBeInTheDocument()
    })

    it('should detect single $input variable', () => {
      renderNode({ content: 'Process $input' })

      expect(screen.getByText('Template with variables')).toBeInTheDocument()
    })

    it('should show "Input text" for empty content', () => {
      renderNode({ content: '' })

      expect(screen.getByText('Input text')).toBeInTheDocument()
    })
  })

  describe('Status States', () => {
    it('should render in idle state by default', () => {
      const { container } = renderNode({ content: 'Test' })

      expect(container.querySelector('.border-border')).toBeInTheDocument()
      expect(screen.queryByText('Running...')).not.toBeInTheDocument()
    })

    it('should show "Running..." indicator when status is running', () => {
      renderNode({ content: 'Test', status: 'running' })

      expect(screen.getByText('Running...')).toBeInTheDocument()
    })

    it('should show pulsing indicator when running', () => {
      const { container } = renderNode({ content: 'Test', status: 'running' })

      const pulsingDot = container.querySelector('.animate-pulse')
      expect(pulsingDot).toBeInTheDocument()
    })

    it('should apply running status color', () => {
      const { container } = renderNode({ content: 'Test', status: 'running' })

      expect(container.querySelector('.border-yellow-500')).toBeInTheDocument()
    })

    it('should apply completed status color', () => {
      const { container } = renderNode({ content: 'Test', status: 'completed' })

      expect(container.querySelector('.border-green-500')).toBeInTheDocument()
    })

    it('should apply error status color', () => {
      const { container } = renderNode({ content: 'Test', status: 'error' })

      expect(container.querySelector('.border-red-500')).toBeInTheDocument()
    })

    it('should show selected state', () => {
      const { container } = renderNode({ content: 'Test' }, true)

      expect(container.querySelector('.ring-2')).toBeInTheDocument()
    })

    it('should not show "Running..." when not running', () => {
      renderNode({ content: 'Test', status: 'completed' })

      expect(screen.queryByText('Running...')).not.toBeInTheDocument()
    })
  })

  describe('Output Display', () => {
    it('should not show output section when no output', () => {
      renderNode({ content: 'Test' })

      expect(screen.queryByText('Output:')).not.toBeInTheDocument()
    })

    it('should display string output', () => {
      renderNode({ content: 'Test', output: 'Prompt result here' })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('Prompt result here')).toBeInTheDocument()
    })

    it('should display JSON object output', () => {
      renderNode({ content: 'Test', output: { message: 'success', data: [1, 2, 3] } })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText(/"message": "success"/)).toBeInTheDocument()
      expect(screen.getByText(/"data": \[/)).toBeInTheDocument()
    })

    it('should format JSON output with indentation', () => {
      const output = { nested: { key: 'value' } }
      renderNode({ content: 'Test', output })

      const outputText = screen.getByText(/"nested":/)
      expect(outputText.textContent).toContain('\n')
    })

    it('should have scrollable output container', () => {
      const { container } = renderNode({ content: 'Test', output: 'Some output' })

      const scrollable = container.querySelector('.overflow-y-auto')
      expect(scrollable).toBeInTheDocument()
    })

    it('should not show output section for null output', () => {
      renderNode({ content: 'Test', output: null })

      expect(screen.queryByText('Output:')).not.toBeInTheDocument()
    })

    it('should not show output section for empty string output', () => {
      renderNode({ content: 'Test', output: '' })

      expect(screen.queryByText('Output:')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined content', () => {
      renderNode({ content: undefined as any })

      expect(screen.getByText('Enter your prompt...')).toBeInTheDocument()
    })

    it('should handle very long content', () => {
      const longContent = 'A'.repeat(1000)
      renderNode({ content: longContent })

      expect(screen.getByText(longContent)).toBeInTheDocument()
    })

    it('should handle content with special characters', () => {
      renderNode({ content: 'Test <>&"\'\n\ttab' })

      expect(screen.getByText(/Test/)).toBeInTheDocument()
    })

    it('should handle empty output object', () => {
      renderNode({ content: 'Test', output: {} })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('{}')).toBeInTheDocument()
    })

    it('should preserve whitespace in content', () => {
      const { container } = renderNode({ content: 'Line 1\nLine 2\nLine 3' })

      const contentElement = container.querySelector('.line-clamp-3')
      expect(contentElement?.textContent).toContain('Line 1')
    })
  })

  describe('Component Structure', () => {
    it('should render Card component with correct width', () => {
      const { container } = renderNode({ content: 'Test' })

      const card = container.querySelector('.min-w-\\[220px\\]')
      expect(card).toBeInTheDocument()
    })

    it('should have gradient background on header', () => {
      const { container } = renderNode({ content: 'Test' })

      const gradient = container.querySelector('.from-chart-5\\/10')
      expect(gradient).toBeInTheDocument()
    })
  })
})
