import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Add any providers your app uses here
// For example: ThemeProvider, QueryClientProvider, etc.
function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// Custom render function that includes providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Custom utilities
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0))

export const createMockWorkflow = () => ({
  nodes: [
    { id: '1', type: 'start', position: { x: 0, y: 0 }, data: {} },
    { id: '2', type: 'end', position: { x: 200, y: 0 }, data: {} },
  ],
  edges: [{ id: 'e1-2', source: '1', target: '2' }],
})
