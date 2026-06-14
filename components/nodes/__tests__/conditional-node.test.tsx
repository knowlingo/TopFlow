import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import ConditionalNode, { type ConditionalNodeData } from '../conditional-node'
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

const createNodeProps = (data: ConditionalNodeData, selected = false): any => ({
  id: 'conditional-1',
  data,
  selected,
  type: 'conditional',
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  dragging: false,
})

describe('ConditionalNode', () => {
  const renderNode = (data: ConditionalNodeData, selected = false) => {
    return render(
      <ReactFlowProvider>
        <ConditionalNode {...createNodeProps(data, selected)} />
      </ReactFlowProvider>
    )
  }

  describe('Basic Rendering', () => {
    it('should render with title and description', () => {
      renderNode({ condition: 'input1 === "test"' })

      expect(screen.getByText('Conditional')).toBeInTheDocument()
      expect(screen.getByText('Branch based on condition')).toBeInTheDocument()
    })

    it('should render GitBranch icon', () => {
      const { container } = renderNode({ condition: 'test' })

      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should have one target and two source handles', () => {
      const { container } = renderNode({ condition: 'test' })

      const handles = container.querySelectorAll('[data-handleid]')
      expect(handles.length).toBe(3)
    })

    it('should have purple accent color', () => {
      const { container } = renderNode({ condition: 'test' })

      const purpleBg = container.querySelector('.bg-purple-500')
      expect(purpleBg).toBeInTheDocument()
    })

    it('should have backdrop blur styling', () => {
      const { container } = renderNode({ condition: 'test' })

      const backdropBlur = container.querySelector('.backdrop-blur-sm')
      expect(backdropBlur).toBeInTheDocument()
    })
  })

  describe('Condition Display', () => {
    it('should display condition expression', () => {
      renderNode({ condition: 'input1 > 100' })

      expect(screen.getByText('Condition:')).toBeInTheDocument()
      expect(screen.getByText('input1 > 100')).toBeInTheDocument()
    })

    it('should show placeholder when no condition', () => {
      renderNode({ condition: '' })

      expect(screen.getByText("input1 === 'value'")).toBeInTheDocument()
    })

    it('should display condition in monospace font', () => {
      const { container } = renderNode({ condition: 'input1 === true' })

      const conditionElement = container.querySelector('.font-mono')
      expect(conditionElement).toBeInTheDocument()
      expect(conditionElement?.textContent).toBe('input1 === true')
    })

    it('should handle complex boolean expressions', () => {
      renderNode({ condition: 'input1 === "active" && input2 > 50' })

      expect(screen.getByText('input1 === "active" && input2 > 50')).toBeInTheDocument()
    })

    it('should handle undefined condition', () => {
      renderNode({ condition: undefined as any })

      expect(screen.getByText("input1 === 'value'")).toBeInTheDocument()
    })
  })

  describe('Branching Handles', () => {
    it('should have TRUE handle', () => {
      const { container } = renderNode({ condition: 'test' })

      const trueHandle = container.querySelector('[data-handleid="true"]')
      expect(trueHandle).toBeInTheDocument()
      expect(trueHandle).toHaveAttribute('title', 'TRUE path')
    })

    it('should have FALSE handle', () => {
      const { container } = renderNode({ condition: 'test' })

      const falseHandle = container.querySelector('[data-handleid="false"]')
      expect(falseHandle).toBeInTheDocument()
      expect(falseHandle).toHaveAttribute('title', 'FALSE path')
    })

    it('should position TRUE and FALSE handles at different heights', () => {
      const { container } = renderNode({ condition: 'test' })

      const trueHandle = container.querySelector('[data-handleid="true"]')
      const falseHandle = container.querySelector('[data-handleid="false"]')

      expect(trueHandle).toHaveStyle({ top: '40%' })
      expect(falseHandle).toHaveStyle({ top: '60%' })
    })

    it('should style TRUE handle with green color', () => {
      const { container } = renderNode({ condition: 'test' })

      const trueHandle = container.querySelector('[data-handleid="true"]')
      expect(trueHandle?.className).toContain('bg-green-500')
    })

    it('should style FALSE handle with red color', () => {
      const { container } = renderNode({ condition: 'test' })

      const falseHandle = container.querySelector('[data-handleid="false"]')
      expect(falseHandle?.className).toContain('bg-red-500')
    })
  })

  describe('Status States', () => {
    it('should render in idle state by default', () => {
      const { container } = renderNode({ condition: 'test' })

      expect(container.querySelector('.border-border')).toBeInTheDocument()
      expect(screen.queryByText('Evaluating...')).not.toBeInTheDocument()
    })

    it('should show "Evaluating..." indicator when status is running', () => {
      renderNode({ condition: 'test', status: 'running' })

      expect(screen.getByText('Evaluating...')).toBeInTheDocument()
    })

    it('should show pulsing indicator when running', () => {
      const { container } = renderNode({ condition: 'test', status: 'running' })

      const pulsingDot = container.querySelector('.animate-pulse')
      expect(pulsingDot).toBeInTheDocument()
    })

    it('should apply running status color', () => {
      const { container } = renderNode({ condition: 'test', status: 'running' })

      expect(container.querySelector('.border-yellow-500')).toBeInTheDocument()
    })

    it('should apply completed status color', () => {
      const { container } = renderNode({ condition: 'test', status: 'completed' })

      expect(container.querySelector('.border-green-500')).toBeInTheDocument()
    })

    it('should apply error status color', () => {
      const { container } = renderNode({ condition: 'test', status: 'error' })

      expect(container.querySelector('.border-red-500')).toBeInTheDocument()
    })

    it('should show selected state', () => {
      const { container } = renderNode({ condition: 'test' }, true)

      expect(container.querySelector('.ring-2')).toBeInTheDocument()
    })

    it('should not show "Evaluating..." when not running', () => {
      renderNode({ condition: 'test', status: 'completed' })

      expect(screen.queryByText('Evaluating...')).not.toBeInTheDocument()
    })
  })

  describe('Result Display', () => {
    it('should not show result section when output is undefined', () => {
      renderNode({ condition: 'test' })

      expect(screen.queryByText('Result:')).not.toBeInTheDocument()
    })

    it('should display TRUE result when output is true', () => {
      renderNode({ condition: 'test', output: true })

      expect(screen.getByText('Result:')).toBeInTheDocument()
      expect(screen.getByText('✓ TRUE')).toBeInTheDocument()
    })

    it('should display FALSE result when output is false', () => {
      renderNode({ condition: 'test', output: false })

      expect(screen.getByText('Result:')).toBeInTheDocument()
      expect(screen.getByText('✗ FALSE')).toBeInTheDocument()
    })

    it('should style TRUE result with green color', () => {
      renderNode({ condition: 'test', output: true })

      const resultText = screen.getByText('✓ TRUE')
      expect(resultText.className).toMatch(/text-green/)
    })

    it('should style FALSE result with red color', () => {
      renderNode({ condition: 'test', output: false })

      const resultText = screen.getByText('✗ FALSE')
      expect(resultText.className).toMatch(/text-red/)
    })

    it('should treat truthy values as TRUE', () => {
      renderNode({ condition: 'test', output: 1 as any })

      expect(screen.getByText('✓ TRUE')).toBeInTheDocument()
    })

    it('should treat falsy values as FALSE', () => {
      renderNode({ condition: 'test', output: 0 as any })

      expect(screen.getByText('✗ FALSE')).toBeInTheDocument()
    })

    it('should show result for null (falsy)', () => {
      renderNode({ condition: 'test', output: null as any })

      expect(screen.getByText('✗ FALSE')).toBeInTheDocument()
    })

    it('should show result for empty string (falsy)', () => {
      renderNode({ condition: 'test', output: '' as any })

      expect(screen.getByText('✗ FALSE')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long condition expressions', () => {
      const longCondition = 'input1 === "value" && input2 > 100 && input3 === "active" && input4 < 50'
      renderNode({ condition: longCondition })

      expect(screen.getByText(longCondition)).toBeInTheDocument()
    })

    it('should handle conditions with special characters', () => {
      renderNode({ condition: 'input1.includes("test")' })

      expect(screen.getByText('input1.includes("test")')).toBeInTheDocument()
    })

    it('should handle conditions with regex patterns', () => {
      renderNode({ condition: '/^[A-Z]/.test(input1)' })

      expect(screen.getByText('/^[A-Z]/.test(input1)')).toBeInTheDocument()
    })

    it('should handle arrow function conditions', () => {
      renderNode({ condition: 'input1.filter(x => x > 0).length > 0' })

      expect(screen.getByText(/filter.*length > 0/)).toBeInTheDocument()
    })

    it('should display result when output is explicitly false', () => {
      renderNode({ condition: 'test', output: false })

      expect(screen.getByText('Result:')).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should render Card component with correct width', () => {
      const { container } = renderNode({ condition: 'test' })

      const card = container.querySelector('.min-w-\\[220px\\]')
      expect(card).toBeInTheDocument()
    })

    it('should have gradient background on header', () => {
      const { container } = renderNode({ condition: 'test' })

      const gradient = container.querySelector('.from-purple-500\\/10')
      expect(gradient).toBeInTheDocument()
    })

    it('should have condition in bordered container', () => {
      const { container } = renderNode({ condition: 'test' })

      const conditionBox = container.querySelector('.border-border\\/30')
      expect(conditionBox).toBeInTheDocument()
    })
  })
})
