import { http, HttpResponse } from 'msw'

// Define mock API handlers
export const handlers = [
  // Mock workflow execution endpoint
  http.post('/api/execute-workflow', async () => {
    return HttpResponse.json({
      success: true,
      message: 'Workflow executed successfully',
    })
  }),

  // Mock demo endpoints
  http.get('/api/demo-country', () => {
    return HttpResponse.json({
      country: 'United States',
      capital: 'Washington, D.C.',
    })
  }),

  // Add more handlers as needed for your API routes
]
