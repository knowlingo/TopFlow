import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Setup MSW server with default handlers
export const server = setupServer(...handlers)

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())
