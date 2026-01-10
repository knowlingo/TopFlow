import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from '@xyflow/react'
import HttpRequestNode, { type HttpRequestNodeData } from '../http-request-node'
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

const createNodeProps = (data: HttpRequestNodeData, selected = false): NodeProps<HttpRequestNodeData> => ({
  id: 'http-request-1',
  data,
  selected,
  type: 'httpRequest',
  xPos: 0,
  yPos: 0,
  zIndex: 0,
  isConnectable: true,
  positionAbsoluteX: 0,
  positionAbsoluteY: 0,
  dragging: false,
})

describe('HttpRequestNode', () => {
  const renderNode = (data: HttpRequestNodeData, selected = false) => {
    return render(
      <ReactFlowProvider>
        <HttpRequestNode {...createNodeProps(data, selected)} />
      </ReactFlowProvider>
    )
  }

  describe('Basic Rendering', () => {
    it('should render with title', () => {
      renderNode({ url: 'https://api.example.com', method: 'GET' })

      expect(screen.getByText('HTTP Request')).toBeInTheDocument()
    })

    it('should render Globe icon', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' })

      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should have both target and source handles', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' })

      const handles = container.querySelectorAll('[data-handleid]')
      expect(handles.length).toBe(2)
    })

    it('should have blue accent color', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' })

      const blueBg = container.querySelector('.bg-blue-500')
      expect(blueBg).toBeInTheDocument()
    })

    it('should have backdrop blur styling', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' })

      const backdropBlur = container.querySelector('.backdrop-blur-sm')
      expect(backdropBlur).toBeInTheDocument()
    })
  })

  describe('HTTP Method Display', () => {
    it('should display GET method', () => {
      renderNode({ url: 'https://api.example.com', method: 'GET' })

      expect(screen.getByText('GET')).toBeInTheDocument()
    })

    it('should display POST method', () => {
      renderNode({ url: 'https://api.example.com', method: 'POST' })

      expect(screen.getByText('POST')).toBeInTheDocument()
    })

    it('should display PUT method', () => {
      renderNode({ url: 'https://api.example.com', method: 'PUT' })

      expect(screen.getByText('PUT')).toBeInTheDocument()
    })

    it('should display DELETE method', () => {
      renderNode({ url: 'https://api.example.com', method: 'DELETE' })

      expect(screen.getByText('DELETE')).toBeInTheDocument()
    })

    it('should display PATCH method', () => {
      renderNode({ url: 'https://api.example.com', method: 'PATCH' })

      expect(screen.getByText('PATCH')).toBeInTheDocument()
    })

    it('should show default GET when method is empty', () => {
      renderNode({ url: 'https://api.example.com', method: '' })

      expect(screen.getByText('GET')).toBeInTheDocument()
    })
  })

  describe('URL Display', () => {
    it('should display full URL', () => {
      renderNode({ url: 'https://api.example.com/users', method: 'GET' })

      expect(screen.getByText('URL:')).toBeInTheDocument()
      expect(screen.getByText('https://api.example.com/users')).toBeInTheDocument()
    })

    it('should show placeholder when no URL', () => {
      renderNode({ url: '', method: 'GET' })

      expect(screen.getByText('https://api.example.com')).toBeInTheDocument()
    })

    it('should display URL in monospace font', () => {
      const { container } = renderNode({ url: 'https://api.example.com', method: 'GET' })

      const urlElement = container.querySelector('.font-mono')
      expect(urlElement).toBeInTheDocument()
      expect(urlElement?.textContent).toContain('api.example.com')
    })

    it('should truncate very long URLs', () => {
      const { container } = renderNode({
        url: 'https://api.example.com/very/long/path/that/should/be/truncated',
        method: 'GET'
      })

      const urlElement = container.querySelector('.truncate')
      expect(urlElement).toBeInTheDocument()
    })

    it('should handle URL with query parameters', () => {
      renderNode({ url: 'https://api.example.com/search?q=test&limit=10', method: 'GET' })

      expect(screen.getByText(/api.example.com\/search/)).toBeInTheDocument()
    })

    it('should handle undefined URL', () => {
      renderNode({ url: undefined as any, method: 'GET' })

      expect(screen.getByText('https://api.example.com')).toBeInTheDocument()
    })
  })

  describe('Status States', () => {
    it('should render in idle state by default', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' })

      expect(container.querySelector('.border-border')).toBeInTheDocument()
      expect(screen.queryByText('Requesting...')).not.toBeInTheDocument()
    })

    it('should show "Requesting..." indicator when status is running', () => {
      renderNode({ url: 'test', method: 'GET', status: 'running' })

      expect(screen.getByText('Requesting...')).toBeInTheDocument()
    })

    it('should show pulsing indicator when running', () => {
      const { container } = renderNode({ url: 'test', method: 'GET', status: 'running' })

      const pulsingDot = container.querySelector('.animate-pulse')
      expect(pulsingDot).toBeInTheDocument()
    })

    it('should apply running status color', () => {
      const { container } = renderNode({ url: 'test', method: 'GET', status: 'running' })

      expect(container.querySelector('.border-yellow-500')).toBeInTheDocument()
    })

    it('should apply completed status color', () => {
      const { container } = renderNode({ url: 'test', method: 'GET', status: 'completed' })

      expect(container.querySelector('.border-green-500')).toBeInTheDocument()
    })

    it('should apply error status color', () => {
      const { container } = renderNode({ url: 'test', method: 'GET', status: 'error' })

      expect(container.querySelector('.border-red-500')).toBeInTheDocument()
    })

    it('should show selected state', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' }, true)

      expect(container.querySelector('.ring-2')).toBeInTheDocument()
    })

    it('should not show "Requesting..." when not running', () => {
      renderNode({ url: 'test', method: 'GET', status: 'completed' })

      expect(screen.queryByText('Requesting...')).not.toBeInTheDocument()
    })
  })

  describe('Response Display', () => {
    it('should not show response section when no output', () => {
      renderNode({ url: 'test', method: 'GET' })

      expect(screen.queryByText('Response:')).not.toBeInTheDocument()
    })

    it('should display string response', () => {
      renderNode({ url: 'test', method: 'GET', output: 'Response text' })

      expect(screen.getByText('Response:')).toBeInTheDocument()
      expect(screen.getByText('Response text')).toBeInTheDocument()
    })

    it('should display JSON object response', () => {
      renderNode({ url: 'test', method: 'GET', output: { status: 200, data: 'success' } })

      expect(screen.getByText('Response:')).toBeInTheDocument()
      expect(screen.getByText(/"status": 200/)).toBeInTheDocument()
      expect(screen.getByText(/"data": "success"/)).toBeInTheDocument()
    })

    it('should format JSON response with indentation', () => {
      const response = { user: { name: 'John', email: 'john@example.com' } }
      renderNode({ url: 'test', method: 'GET', output: response })

      const responseText = screen.getByText(/"user":/)
      expect(responseText.textContent).toContain('\n')
    })

    it('should have scrollable response container', () => {
      const { container } = renderNode({ url: 'test', method: 'GET', output: 'Some response' })

      const scrollable = container.querySelector('.overflow-y-auto')
      expect(scrollable).toBeInTheDocument()
    })

    it('should not show response section for null output', () => {
      renderNode({ url: 'test', method: 'GET', output: null })

      expect(screen.queryByText('Response:')).not.toBeInTheDocument()
    })

    it('should not show response section for empty string output', () => {
      renderNode({ url: 'test', method: 'GET', output: '' })

      expect(screen.queryByText('Response:')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long response data', () => {
      const longResponse = 'A'.repeat(1000)
      renderNode({ url: 'test', method: 'GET', output: longResponse })

      expect(screen.getByText(longResponse)).toBeInTheDocument()
    })

    it('should handle empty response object', () => {
      renderNode({ url: 'test', method: 'GET', output: {} })

      expect(screen.getByText('Response:')).toBeInTheDocument()
      expect(screen.getByText('{}')).toBeInTheDocument()
    })

    it('should handle array response', () => {
      renderNode({ url: 'test', method: 'GET', output: [1, 2, 3] })

      expect(screen.getByText('Response:')).toBeInTheDocument()
      expect(screen.getByText(/\[/)).toBeInTheDocument()
    })

    it('should handle numeric response', () => {
      renderNode({ url: 'test', method: 'GET', output: 404 })

      expect(screen.getByText('Response:')).toBeInTheDocument()
      expect(screen.getByText('404')).toBeInTheDocument()
    })

    it('should handle boolean response', () => {
      renderNode({ url: 'test', method: 'GET', output: true })

      expect(screen.getByText('Response:')).toBeInTheDocument()
      expect(screen.getByText('true')).toBeInTheDocument()
    })

    it('should handle URL with special characters', () => {
      renderNode({ url: 'https://api.example.com/search?q=test&filter=active', method: 'GET' })

      expect(screen.getByText(/api.example.com\/search/)).toBeInTheDocument()
    })

    it('should handle localhost URLs', () => {
      renderNode({ url: 'http://localhost:3000/api/users', method: 'GET' })

      expect(screen.getByText('http://localhost:3000/api/users')).toBeInTheDocument()
    })

    it('should handle relative URLs', () => {
      renderNode({ url: '/api/users', method: 'GET' })

      expect(screen.getByText('/api/users')).toBeInTheDocument()
    })

    it('should handle URL with authentication', () => {
      renderNode({ url: 'https://user:pass@api.example.com', method: 'GET' })

      expect(screen.getByText(/user:pass@api/)).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should render Card component with correct width', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' })

      const card = container.querySelector('.min-w-\\[220px\\]')
      expect(card).toBeInTheDocument()
    })

    it('should have gradient background on header', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' })

      const gradient = container.querySelector('.from-blue-500\\/10')
      expect(gradient).toBeInTheDocument()
    })

    it('should have URL in bordered container', () => {
      const { container } = renderNode({ url: 'test', method: 'GET' })

      const urlBox = container.querySelector('.border-border\\/30')
      expect(urlBox).toBeInTheDocument()
    })
  })
})
