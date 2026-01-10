# E2E Testing with Playwright

## Overview

TopFlow uses Playwright for end-to-end testing to verify complete user workflows in real browser environments.

## Current Status

**Smoke Tests**: ✅ 5/5 passing
**Detailed Tests**: 📋 44 tests created, need UI selector tuning

## Running E2E Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run only smoke tests
pnpm test:e2e e2e/smoke.spec.ts

# Run with UI mode (interactive)
pnpm test:e2e:ui

# Run in headed mode (see the browser)
pnpm test:e2e:headed

# Run specific browser
pnpm test:e2e:chromium  # Chromium only
```

## Test Suites

### ✅ Smoke Tests (`e2e/smoke.spec.ts`) - 5 tests

Basic sanity checks that verify the application loads and functions:

- Homepage loads successfully
- Main content renders
- No console errors
- No network failures
- Responsive design works

**Status**: All passing

### 📋 Detailed Test Suites (Need UI Tuning)

These tests are fully written but need selectors adjusted to match the actual UI:

1. **workflow-creation.spec.ts** (11 tests)
   - Node palette display
   - Canvas initialization
   - Toolbar buttons
   - Undo/redo functionality
   - Keyboard shortcuts

2. **template-gallery.spec.ts** (10 tests)
   - Template gallery dialog
   - Template cards display
   - Category filtering
   - Template loading
   - Security templates

3. **demo-mode.spec.ts** (8 tests)
   - Demo mode execution
   - Execution status updates
   - Completion handling
   - Timing simulation

4. **api-settings.spec.ts** (8 tests)
   - API settings dialog
   - Provider options
   - API key inputs
   - BYOK model explanation
   - Security notices

5. **validation.spec.ts** (7 tests)
   - Validation errors
   - Validation scoring
   - Issue categorization
   - Panel interactions

## Setup

### Install Playwright

```bash
# Install Playwright
pnpm add -D @playwright/test playwright

# Install browsers
pnpm exec playwright install chromium
pnpm exec playwright install firefox
pnpm exec playwright install webkit
```

### Configuration

Playwright configuration is in `playwright.config.ts`:

- **Test Directory**: `./e2e`
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Auto-start dev server**: Yes
- **Screenshots**: On failure
- **Trace**: On first retry

## Writing E2E Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/')

    // Interact with elements
    await page.getByRole('button', { name: /Click Me/i }).click()

    // Assert expectations
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

### Best Practices

1. **Use semantic selectors**: Prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors
2. **Wait for states**: Use `waitForLoadState('networkidle')` for dynamic content
3. **Set timeouts**: Use `{ timeout: 5000 }` for elements that may take time
4. **Isolate tests**: Each test should be independent
5. **Clean up**: Close dialogs, reset state between tests

### Common Patterns

**Opening a dialog:**
```typescript
await page.getByRole('button', { name: /Templates/i }).click()
await expect(page.getByRole('dialog')).toBeVisible()
```

**Loading a template:**
```typescript
await page.getByRole('button', { name: /Templates/i }).click()
await page.getByRole('button', { name: /Use Template/i }).first().click()
await page.waitForTimeout(1000) // Allow template to load
```

**Executing a workflow:**
```typescript
await page.getByRole('button', { name: /Execute/i }).click()
await expect(page.getByText(/Execution/i)).toBeVisible({ timeout: 5000 })
```

## Debugging Failed Tests

### View screenshots
```bash
# Screenshots are saved to test-results/ folder
ls test-results/
```

### Run with UI mode
```bash
pnpm test:e2e:ui
```

### Run in headed mode
```bash
pnpm test:e2e:headed
```

### Generate HTML report
```bash
pnpm exec playwright show-report
```

## CI/CD Integration

E2E tests run automatically in CI:

```yaml
# .github/workflows/e2e.yml
- name: Install Playwright
  run: pnpm exec playwright install --with-deps chromium

- name: Run E2E tests
  run: pnpm test:e2e
```

## Future Improvements

1. **Complete UI selector tuning** for detailed test suites
2. **Add accessibility tests** using Playwright's accessibility API
3. **Add visual regression tests** using Playwright's screenshot comparison
4. **Add mobile device tests** using device emulation
5. **Add authentication tests** when auth is implemented
6. **Add workflow save/load tests**
7. **Add code export tests**

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
