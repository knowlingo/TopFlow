import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import EndNode, { type EndNodeData } from '../end-node'
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

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  }
})

const createNodeProps = (data: EndNodeData, selected = false): NodeProps<EndNodeData> => ({
  id: 'end-1',
  data,
  selected,
  type: 'end',
  xPos: 0,
  yPos: 0,
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  dragging: false,
})

describe('EndNode', () => {
  const renderNode = (data: EndNodeData, selected = false) => {
    return render(
      <ReactFlowProvider>
        <EndNode {...createNodeProps(data, selected)} />
      </ReactFlowProvider>
    )
  }

  describe('Basic Rendering', () => {
    it('should render with title and description', () => {
      renderNode({})

      expect(screen.getByText('End')).toBeInTheDocument()
      expect(screen.getByText('Workflow output')).toBeInTheDocument()
    })

    it('should render Flag icon', () => {
      const { container } = renderNode({})

      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should render in idle state by default', () => {
      const { container } = renderNode({})

      expect(container.querySelector('.border-border')).toBeInTheDocument()
    })

    it('should have target handle for connections', () => {
      const { container } = renderNode({})

      // Handle is rendered as a div with specific data attributes
      const handles = container.querySelectorAll('[data-handlepos="left"]')
      expect(handles.length).toBeGreaterThan(0)
    })

    it('should apply red accent color to icon and handle', () => {
      const { container } = renderNode({})

      // Icon background should be red
      const iconBg = container.querySelector('.bg-red-500')
      expect(iconBg).toBeInTheDocument()
    })

    it('should have backdrop blur styling', () => {
      const { container } = renderNode({})

      const backdropBlur = container.querySelector('.backdrop-blur-sm')
      expect(backdropBlur).toBeInTheDocument()
    })
  })

  describe('Status States', () => {
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
  })

  describe('Text Output Display', () => {
    it('should not show output section when no output', () => {
      renderNode({})

      expect(screen.queryByText('Final Output:')).not.toBeInTheDocument()
    })

    it('should display string output', () => {
      renderNode({ output: 'Workflow completed successfully' })

      expect(screen.getByText('Final Output:')).toBeInTheDocument()
      expect(screen.getByText('Workflow completed successfully')).toBeInTheDocument()
    })

    it('should display JSON object output', () => {
      const output = { result: 'success', count: 42 }
      renderNode({ output })

      expect(screen.getByText('Final Output:')).toBeInTheDocument()
      expect(screen.getByText(/"result": "success"/)).toBeInTheDocument()
      expect(screen.getByText(/"count": 42/)).toBeInTheDocument()
    })

    it('should format JSON output with indentation', () => {
      const output = { nested: { key: 'value' } }
      const { container } = renderNode({ output })

      // Check that the output is formatted (contains newlines)
      const outputText = screen.getByText(/"nested":/)
      expect(outputText.textContent).toContain('\n')
    })
  })

  describe('Image Output Display', () => {
    it('should detect base64 image output', () => {
      const imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      renderNode({ output: imageData })

      expect(screen.getByAltText('Output 1')).toBeInTheDocument()
      expect(screen.getByText('Download Image')).toBeInTheDocument()
    })

    it('should display multiple images from array', () => {
      const images = [
        'data:image/png;base64,ABC',
        'data:image/jpeg;base64,DEF',
      ]
      renderNode({ output: images })

      expect(screen.getByAltText('Output 1')).toBeInTheDocument()
      expect(screen.getByAltText('Output 2')).toBeInTheDocument()
      expect(screen.getAllByText('Download Image')).toHaveLength(2)
    })

    it('should filter out non-image items from array', () => {
      const mixed = [
        'data:image/png;base64,ABC',
        'not an image',
        'data:image/jpeg;base64,DEF',
      ]
      renderNode({ output: mixed })

      expect(screen.getByAltText('Output 1')).toBeInTheDocument()
      expect(screen.getByAltText('Output 2')).toBeInTheDocument()
      expect(screen.getAllByText('Download Image')).toHaveLength(2)
    })
  })

  describe('Threat Intelligence Report', () => {
    it('should detect threat intelligence report output', () => {
      const output = {
        report: 'Threat analysis completed',
        threat_map: '/demo-assets/images/threat-intelligence-map.png',
      }
      renderNode({ output })

      expect(screen.getByAltText('Output 1')).toBeInTheDocument()
      expect(screen.getByText('View Full Report')).toBeInTheDocument()
    })

    it('should show View Full Report button only for threat intel reports', () => {
      const regularImage = 'data:image/png;base64,ABC'
      const { rerender } = renderNode({ output: regularImage })

      expect(screen.queryByText('View Full Report')).not.toBeInTheDocument()

      const threatIntelOutput = {
        report: 'Analysis',
        threat_map: '/demo-assets/images/threat-map.png',
      }
      rerender(
        <ReactFlowProvider>
          <EndNode {...createNodeProps({ output: threatIntelOutput })} />
        </ReactFlowProvider>
      )

      expect(screen.getByText('View Full Report')).toBeInTheDocument()
    })

    it('should link to correct report template', () => {
      const output = {
        report: 'Threat analysis',
        threat_map: '/demo-assets/images/threat-map.png',
      }
      renderNode({ output })

      const link = screen.getByText('View Full Report').closest('a')
      expect(link).toHaveAttribute('href', '/reports/template-ot-critical-infra')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Download Functionality', () => {
    it('should render download button for images', () => {
      const imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      renderNode({ output: imageData })

      const downloadButton = screen.getByText('Download Image')
      expect(downloadButton).toBeInTheDocument()
      expect(downloadButton.tagName).toBe('BUTTON')
    })

    it('should have download button for each image', () => {
      const images = [
        'data:image/png;base64,ABC',
        'data:image/jpeg;base64,DEF',
      ]
      renderNode({ output: images })

      const downloadButtons = screen.getAllByText('Download Image')
      expect(downloadButtons).toHaveLength(2)
    })

    it('should render download button for threat intel report image', () => {
      const output = {
        report: 'Threat analysis',
        threat_map: '/demo-assets/images/threat-map.png',
      }
      renderNode({ output })

      expect(screen.getByText('Download Image')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty output object', () => {
      renderNode({ output: {} })

      expect(screen.getByText('Final Output:')).toBeInTheDocument()
      expect(screen.getByText('{}')).toBeInTheDocument()
    })

    it('should not show output section for null', () => {
      renderNode({ output: null })

      expect(screen.queryByText('Final Output:')).not.toBeInTheDocument()
    })

    it('should not show output section for empty string', () => {
      renderNode({ output: '' })

      expect(screen.queryByText('Final Output:')).not.toBeInTheDocument()
    })

    it('should not show output section for undefined', () => {
      renderNode({ output: undefined })

      expect(screen.queryByText('Final Output:')).not.toBeInTheDocument()
    })

    it('should handle array with no images', () => {
      renderNode({ output: ['text1', 'text2', 'text3'] })

      expect(screen.getByText('Final Output:')).toBeInTheDocument()
      // Should display as JSON, not as images
      expect(screen.queryByText('Download Image')).not.toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should render Card component', () => {
      const { container } = renderNode({})

      const card = container.querySelector('.min-w-\\[170px\\]')
      expect(card).toBeInTheDocument()
    })

    it('should have gradient background on header', () => {
      const { container } = renderNode({})

      const gradient = container.querySelector('.from-red-500\\/10')
      expect(gradient).toBeInTheDocument()
    })

    it('should show output in scrollable container for text', () => {
      const longOutput = 'A'.repeat(1000)
      const { container } = renderNode({ output: longOutput })

      const scrollable = container.querySelector('.overflow-y-auto')
      expect(scrollable).toBeInTheDocument()
    })
  })
})
