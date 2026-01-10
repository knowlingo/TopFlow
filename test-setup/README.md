# Test Setup

This directory contains testing configuration and utilities for TopFlow.

## Contents

### `/mocks`
MSW (Mock Service Worker) configuration for API mocking:
- `handlers.ts` - Request handlers for mocking API endpoints
- `server.ts` - MSW server setup with lifecycle hooks

### `/utils`
Testing utilities:
- `test-utils.tsx` - Custom render function with providers, helper utilities

## Usage

### Import MSW Server in Tests

```typescript
import { server } from 'test-setup/mocks/server'
import { http, HttpResponse } from 'msw'

describe('MyComponent', () => {
  it('should handle API responses', async () => {
    // Override handler for this test
    server.use(
      http.get('/api/data', () => {
        return HttpResponse.json({ data: 'test' })
      })
    )

    // ... test code
  })
})
```

### Use Custom Render Function

```typescript
import { render, screen } from 'test-setup/utils/test-utils'

describe('MyComponent', () => {
  it('should render', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## Adding New Mock Handlers

Edit `mocks/handlers.ts`:

```typescript
export const handlers = [
  http.get('/api/your-endpoint', () => {
    return HttpResponse.json({ /* your data */ })
  }),
  // ... more handlers
]
```

## Configuration

Global test setup is in `/jest.setup.js` at the project root.
Jest configuration is in `/jest.config.js`.

For more details, see [Testing Guide](../docs/development/testing-guide.md).
