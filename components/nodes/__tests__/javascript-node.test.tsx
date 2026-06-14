import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import JavaScriptNode, { type JavaScriptNodeData } from '../javascript-node'
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

const createNodeProps = (data: JavaScriptNodeData, selected = false): any => ({
  id: 'javascript-1',
  data,
  selected,
  type: 'javascript',
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  dragging: false,
})

describe('JavaScriptNode', () => {
  const renderNode = (data: JavaScriptNodeData, selected = false) => {
    return render(
      <ReactFlowProvider>
        <JavaScriptNode {...createNodeProps(data, selected)} />
      </ReactFlowProvider>
    )
  }

  describe('Basic Rendering', () => {
    it('should render with title and description', () => {
      renderNode({ code: 'return 42;' })

      expect(screen.getByText('JavaScript')).toBeInTheDocument()
      expect(screen.getByText('Execute custom code')).toBeInTheDocument()
    })

    it('should render Code and Settings icons', () => {
      const { container } = renderNode({ code: 'test' })

      const icons = container.querySelectorAll('svg')
      expect(icons.length).toBeGreaterThanOrEqual(2)
    })

    it('should have both target and source handles', () => {
      const { container } = renderNode({ code: 'test' })

      const handles = container.querySelectorAll('[data-handleid]')
      expect(handles.length).toBe(2)
    })

    it('should have backdrop blur styling', () => {
      const { container } = renderNode({ code: 'test' })

      const backdropBlur = container.querySelector('.backdrop-blur-sm')
      expect(backdropBlur).toBeInTheDocument()
    })

    it('should have amber accent color', () => {
      const { container } = renderNode({ code: 'test' })

      const amberBg = container.querySelector('.bg-amber-500')
      expect(amberBg).toBeInTheDocument()
    })
  })

  describe('Code Display', () => {
    it('should display JavaScript code', () => {
      renderNode({ code: 'const result = input1 + input2;\nreturn result;' })

      expect(screen.getByText(/const result = input1 \+ input2/)).toBeInTheDocument()
    })

    it('should show placeholder when no code', () => {
      renderNode({ code: '' })

      expect(screen.getByText('// Enter JavaScript code...')).toBeInTheDocument()
    })

    it('should display code in pre element', () => {
      const { container } = renderNode({ code: 'return 42;' })

      const preElement = container.querySelector('pre')
      expect(preElement).toBeInTheDocument()
      expect(preElement?.textContent).toContain('return 42;')
    })

    it('should preserve code formatting', () => {
      const code = 'function test() {\n  return true;\n}'
      const { container } = renderNode({ code })

      const preElement = container.querySelector('pre')
      expect(preElement?.textContent).toBe(code)
    })

    it('should limit code height with max-h-16', () => {
      const { container } = renderNode({ code: 'test' })

      const preElement = container.querySelector('.max-h-16')
      expect(preElement).toBeInTheDocument()
    })

    it('should allow horizontal scrolling for long lines', () => {
      const { container } = renderNode({ code: 'const veryLongVariableName = "A".repeat(1000);' })

      const preElement = container.querySelector('.overflow-x-auto')
      expect(preElement).toBeInTheDocument()
    })
  })

  describe('Status States', () => {
    it('should render in idle state by default', () => {
      const { container } = renderNode({ code: 'test' })

      expect(container.querySelector('.border-border')).toBeInTheDocument()
      expect(screen.queryByText('Running...')).not.toBeInTheDocument()
    })

    it('should show "Running..." indicator when status is running', () => {
      renderNode({ code: 'test', status: 'running' })

      expect(screen.getByText('Running...')).toBeInTheDocument()
    })

    it('should show pulsing indicator when running', () => {
      const { container } = renderNode({ code: 'test', status: 'running' })

      const pulsingDot = container.querySelector('.animate-pulse')
      expect(pulsingDot).toBeInTheDocument()
    })

    it('should apply running status color', () => {
      const { container } = renderNode({ code: 'test', status: 'running' })

      expect(container.querySelector('.border-yellow-500')).toBeInTheDocument()
    })

    it('should apply completed status color', () => {
      const { container } = renderNode({ code: 'test', status: 'completed' })

      expect(container.querySelector('.border-green-500')).toBeInTheDocument()
    })

    it('should apply error status color', () => {
      const { container } = renderNode({ code: 'test', status: 'error' })

      expect(container.querySelector('.border-red-500')).toBeInTheDocument()
    })

    it('should show selected state', () => {
      const { container } = renderNode({ code: 'test' }, true)

      expect(container.querySelector('.ring-2')).toBeInTheDocument()
    })

    it('should not show "Running..." when not running', () => {
      renderNode({ code: 'test', status: 'completed' })

      expect(screen.queryByText('Running...')).not.toBeInTheDocument()
    })
  })

  describe('Output Display', () => {
    it('should not show output section when no output', () => {
      renderNode({ code: 'test' })

      expect(screen.queryByText('Output:')).not.toBeInTheDocument()
    })

    it('should display string output', () => {
      renderNode({ code: 'test', output: 'Execution result: 42' })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('Execution result: 42')).toBeInTheDocument()
    })

    it('should display JSON object output', () => {
      renderNode({ code: 'test', output: { result: 42, status: 'success' } })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText(/"result": 42/)).toBeInTheDocument()
      expect(screen.getByText(/"status": "success"/)).toBeInTheDocument()
    })

    it('should format JSON output with indentation', () => {
      const output = { nested: { data: { value: 123 } } }
      renderNode({ code: 'test', output })

      const outputText = screen.getByText(/"nested":/)
      expect(outputText.textContent).toContain('\n')
    })

    it('should have scrollable output container', () => {
      const { container } = renderNode({ code: 'test', output: 'Some output' })

      const scrollable = container.querySelector('.overflow-y-auto')
      expect(scrollable).toBeInTheDocument()
    })

    it('should not show output section for null output', () => {
      renderNode({ code: 'test', output: null })

      expect(screen.queryByText('Output:')).not.toBeInTheDocument()
    })

    it('should not show output section for empty string output', () => {
      renderNode({ code: 'test', output: '' })

      expect(screen.queryByText('Output:')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined code', () => {
      renderNode({ code: undefined as any })

      expect(screen.getByText('// Enter JavaScript code...')).toBeInTheDocument()
    })

    it('should handle very long code', () => {
      const longCode = 'const x = ' + '1 + '.repeat(100) + '1;'
      renderNode({ code: longCode })

      expect(screen.getByText(/const x =/)).toBeInTheDocument()
    })

    it('should handle code with special characters', () => {
      renderNode({ code: 'const str = "<>&";' })

      expect(screen.getByText(/const str =/)).toBeInTheDocument()
    })

    it('should handle multiline code', () => {
      const code = 'function add(a, b) {\n  return a + b;\n}\nreturn add(input1, input2);'
      renderNode({ code })

      expect(screen.getByText(/function add/)).toBeInTheDocument()
    })

    it('should handle empty output object', () => {
      renderNode({ code: 'test', output: {} })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('{}')).toBeInTheDocument()
    })

    it('should handle code with comments', () => {
      const code = '// This is a comment\nreturn 42; // inline comment'
      renderNode({ code })

      expect(screen.getByText(/This is a comment/)).toBeInTheDocument()
    })

    it('should handle numeric output', () => {
      renderNode({ code: 'test', output: 42 })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('should handle boolean output', () => {
      renderNode({ code: 'test', output: true })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText('true')).toBeInTheDocument()
    })

    it('should handle array output', () => {
      renderNode({ code: 'test', output: [1, 2, 3] })

      expect(screen.getByText('Output:')).toBeInTheDocument()
      expect(screen.getByText(/\[/)).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should render Card component with correct width', () => {
      const { container } = renderNode({ code: 'test' })

      const card = container.querySelector('.min-w-\\[220px\\]')
      expect(card).toBeInTheDocument()
    })

    it('should have gradient background on header', () => {
      const { container } = renderNode({ code: 'test' })

      const gradient = container.querySelector('.from-amber-500\\/10')
      expect(gradient).toBeInTheDocument()
    })

    it('should have code block with background', () => {
      const { container } = renderNode({ code: 'test' })

      const codeBlock = container.querySelector('.bg-background\\/90')
      expect(codeBlock).toBeInTheDocument()
    })
  })
})
