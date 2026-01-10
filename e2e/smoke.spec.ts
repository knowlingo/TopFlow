import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Page should load
    await expect(page).toHaveTitle(/TopFlow|AI/i)

    // Wait for page to be ready
    await page.waitForLoadState('networkidle')

    // Page should have loaded successfully
    expect(page.url()).toContain('localhost:3000')
  })

  test('should render main content', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check if page has rendered content
    const body = await page.locator('body').textContent()
    expect(body).toBeTruthy()
    expect(body!.length).toBeGreaterThan(0)
  })

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = []

    page.on('pageerror', (error) => {
      errors.push(error.message)
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for critical console errors
    const criticalErrors = errors.filter(
      (err) => !err.includes('Warning') && !err.includes('Download')
    )

    expect(criticalErrors.length).toBe(0)
  })

  test('should load without network errors', async ({ page }) => {
    const failedRequests: string[] = []

    page.on('requestfailed', (request) => {
      failedRequests.push(request.url())
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should have no failed requests
    expect(failedRequests.length).toBe(0)
  })

  test('should have responsive design', async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    let body = await page.locator('body').boundingBox()
    expect(body).toBeTruthy()

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    await page.waitForLoadState('networkidle')

    body = await page.locator('body').boundingBox()
    expect(body).toBeTruthy()
  })
})
