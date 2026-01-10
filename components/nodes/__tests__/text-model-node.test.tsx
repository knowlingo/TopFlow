import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import TextModelNode, { type TextModelNodeData } from '../text-model-node'
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

const createNodeProps = (
  data: TextModelNodeData,
  selected = false
): NodeProps<TextModelNodeData> => ({
  id: 'text-model-1',
  data,
  selected,
  type: 'textModel',
  xPos: 0,
  yPos: 0,
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  dragging: false,
})

describe('TextModelNode', () => {
  const renderNode = (data: TextModelNodeData, selected = false) => {
    return render(
      <ReactFlowProvider>
        <TextModelNode {...createNodeProps(data, selected)} />
      </ReactFlowProvider>
    )
  }

  describe('Basic Rendering', () => {
    it('should render with title', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      expect(screen.getByText('Text Model')).toBeInTheDocument()
    })

    it('should display model name', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      expect(screen.getByText('openai/gpt-4o-mini')).toBeInTheDocument()
    })

    it('should display default model when not specified', () => {
      renderNode({ model: '', temperature: 0.7, maxTokens: 2000 })

      expect(screen.getByText('openai/gpt-4o-mini')).toBeInTheDocument()
    })

    it('should render MessageSquare and Settings icons', () => {
      const { container } = renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      const icons = container.querySelectorAll('svg')
      expect(icons.length).toBeGreaterThanOrEqual(2)
    })

    it('should have both target and source handles', () => {
      const { container } = renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      const handles = container.querySelectorAll('[data-handleid]')
      expect(handles.length).toBe(2)
    })

    it('should have backdrop blur styling', () => {
      const { container } = renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      const backdropBlur = container.querySelector('.backdrop-blur-sm')
      expect(backdropBlur).toBeInTheDocument()
    })
  })

  describe('Configuration Display', () => {
    it('should display temperature value', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.8, maxTokens: 2000 })

      expect(screen.getByText('Temp:')).toBeInTheDocument()
      expect(screen.getByText('0.8')).toBeInTheDocument()
    })

    it('should display default temperature when not specified', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0, maxTokens: 2000 })

      expect(screen.getByText('0.7')).toBeInTheDocument()
    })

    it('should display max tokens value under 1000', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 500 })

      expect(screen.getByText('Tokens:')).toBeInTheDocument()
      expect(screen.getByText('500')).toBeInTheDocument()
    })

    it('should format tokens in thousands (k) for values >= 1000', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      expect(screen.getByText('2k')).toBeInTheDocument()
    })

    it('should format tokens with decimal for non-round thousands', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2500 })

      expect(screen.getByText('2.5k')).toBeInTheDocument()
    })

    it('should display default max tokens when not specified', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 0 })

      expect(screen.getByText('2k')).toBeInTheDocument()
    })

    it('should show structured output indicator when enabled', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        structuredOutput: true,
      })

      expect(screen.getByText('Structured:')).toBeInTheDocument()
      expect(screen.getByText('Yes')).toBeInTheDocument()
    })

    it('should display schema name when provided', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        structuredOutput: true,
        schemaName: 'UserSchema',
      })

      expect(screen.getByText('Structured:')).toBeInTheDocument()
      expect(screen.getByText('UserSchema')).toBeInTheDocument()
    })

    it('should not show structured output when disabled', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        structuredOutput: false,
      })

      expect(screen.queryByText('Structured:')).not.toBeInTheDocument()
    })
  })

  describe('Status States', () => {
    it('should render in idle state by default', () => {
      const { container } = renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      expect(container.querySelector('.border-border')).toBeInTheDocument()
      expect(screen.queryByText('Running...')).not.toBeInTheDocument()
    })

    it('should show "Running..." indicator when status is running', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        status: 'running',
      })

      expect(screen.getByText('Running...')).toBeInTheDocument()
    })

    it('should show pulsing indicator when running', () => {
      const { container } = renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        status: 'running',
      })

      const pulsingDot = container.querySelector('.animate-pulse')
      expect(pulsingDot).toBeInTheDocument()
    })

    it('should apply running status color', () => {
      const { container } = renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        status: 'running',
      })

      expect(container.querySelector('.border-yellow-500')).toBeInTheDocument()
    })

    it('should apply completed status color', () => {
      const { container } = renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        status: 'completed',
      })

      expect(container.querySelector('.border-green-500')).toBeInTheDocument()
    })

    it('should apply error status color', () => {
      const { container } = renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        status: 'error',
      })

      expect(container.querySelector('.border-red-500')).toBeInTheDocument()
    })

    it('should show selected state', () => {
      const { container } = renderNode(
        { model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 },
        true
      )

      expect(container.querySelector('.ring-2')).toBeInTheDocument()
    })

    it('should not show "Running..." when not running', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        status: 'completed',
      })

      expect(screen.queryByText('Running...')).not.toBeInTheDocument()
    })
  })

  describe('Output Display', () => {
    it('should not show output section when no output', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      expect(screen.queryByText('Output:')).not.toBeInTheDocument()
    })

    it('should display string output', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        output: 'This is the AI response',
      })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('This is the AI response')).toBeInTheDocument()
    })

    it('should display text property from object output', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        output: { text: 'AI generated text', metadata: 'extra' },
      })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('AI generated text')).toBeInTheDocument()
    })

    it('should display JSON for object without text property', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        output: { result: 'success', count: 42 },
      })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText(/"result": "success"/)).toBeInTheDocument()
      expect(screen.getByText(/"count": 42/)).toBeInTheDocument()
    })

    it('should format JSON output with indentation', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        output: { nested: { key: 'value' } },
      })

      const outputText = screen.getByText(/"nested":/)
      expect(outputText.textContent).toContain('\n')
    })

    it('should have scrollable output container', () => {
      const { container } = renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        output: 'Some output',
      })

      const scrollable = container.querySelector('.overflow-y-auto')
      expect(scrollable).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string model', () => {
      renderNode({ model: '', temperature: 0.7, maxTokens: 2000 })

      expect(screen.getByText('openai/gpt-4o-mini')).toBeInTheDocument()
    })

    it('should handle zero temperature', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0, maxTokens: 2000 })

      expect(screen.getByText('0.7')).toBeInTheDocument()
    })

    it('should handle zero max tokens', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 0 })

      expect(screen.getByText('2k')).toBeInTheDocument()
    })

    it('should handle very large token values', () => {
      renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 128000 })

      expect(screen.getByText('128k')).toBeInTheDocument()
    })

    it('should handle empty output object', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        output: {},
      })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('{}')).toBeInTheDocument()
    })

    it('should not show output section for null', () => {
      renderNode({
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        output: null,
      })

      expect(screen.queryByText('Output:')).not.toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should render Card component with correct width', () => {
      const { container } = renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      const card = container.querySelector('.min-w-\\[260px\\]')
      expect(card).toBeInTheDocument()
    })

    it('should have gradient background on header', () => {
      const { container } = renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      const gradient = container.querySelector('.from-primary\\/5')
      expect(gradient).toBeInTheDocument()
    })

    it('should have primary color accent', () => {
      const { container } = renderNode({ model: 'openai/gpt-4o-mini', temperature: 0.7, maxTokens: 2000 })

      const primaryBg = container.querySelector('.bg-primary')
      expect(primaryBg).toBeInTheDocument()
    })
  })

  describe('Different Model Providers', () => {
    it('should display Anthropic model', () => {
      renderNode({ model: 'anthropic/claude-3-5-sonnet-20241022', temperature: 0.7, maxTokens: 4000 })

      expect(screen.getByText('anthropic/claude-3-5-sonnet-20241022')).toBeInTheDocument()
    })

    it('should display Google model', () => {
      renderNode({ model: 'google/gemini-2.0-flash-exp', temperature: 0.7, maxTokens: 8000 })

      expect(screen.getByText('google/gemini-2.0-flash-exp')).toBeInTheDocument()
    })

    it('should display Groq model', () => {
      renderNode({ model: 'groq/llama-3.3-70b-versatile', temperature: 0.7, maxTokens: 8000 })

      expect(screen.getByText('groq/llama-3.3-70b-versatile')).toBeInTheDocument()
    })
  })
})
