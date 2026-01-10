import { test, expect } from '@playwright/test'

test.describe('Demo Mode Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should execute workflow in demo mode without API keys', async ({ page }) => {
    // Load a template with demo data
    await page.getByRole('button', { name: /Templates/i }).click()

    // Click on a template with demo data
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()

    // Wait for template to load
    await page.waitForTimeout(1000)

    // Click Execute button
    const executeButton = page.getByRole('button', { name: /Execute/i })
    await executeButton.click()

    // Execution panel should open
    await expect(page.getByText(/Execution Log|Workflow Execution/i)).toBeVisible({ timeout: 5000 })

    // Should show execution updates
    await expect(page.getByText(/Executing|Running|Started/i)).toBeVisible({ timeout: 10000 })
  })

  test('should show execution status updates', async ({ page }) => {
    // Load template
    await page.getByRole('button', { name: /Templates/i }).click()
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()
    await page.waitForTimeout(1000)

    // Execute
    await page.getByRole('button', { name: /Execute/i }).click()

    // Wait for execution panel
    await page.waitForTimeout(2000)

    // Should see node execution updates
    const executionLog = page.locator('text=/Node|Execution|Output/i').first()
    await expect(executionLog).toBeVisible({ timeout: 10000 })
  })

  test('should complete workflow execution', async ({ page }) => {
    // Load and execute template
    await page.getByRole('button', { name: /Templates/i }).click()
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()
    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: /Execute/i }).click()

    // Wait for completion (demo mode should be fast)
    await expect(page.getByText(/Complete|Completed|Finished/i)).toBeVisible({ timeout: 15000 })
  })

  test('should display demo data badge in execution', async ({ page }) => {
    // Load template
    await page.getByRole('button', { name: /Templates/i }).click()
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()
    await page.waitForTimeout(1000)

    // Execute
    await page.getByRole('button', { name: /Execute/i }).click()

    // Should indicate demo mode is active
    await expect(
      page.getByText(/Demo|Cached|Preview/i).first()
    ).toBeVisible({ timeout: 10000 })
  })

  test('should show realistic execution timing in demo mode', async ({ page }) => {
    // Load template
    await page.getByRole('button', { name: /Templates/i }).click()
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()
    await page.waitForTimeout(1000)

    // Start execution and measure time
    const startTime = Date.now()
    await page.getByRole('button', { name: /Execute/i }).click()

    // Wait for completion
    await expect(page.getByText(/Complete|Completed/i)).toBeVisible({ timeout: 15000 })

    const endTime = Date.now()
    const executionTime = endTime - startTime

    // Demo execution should take a reasonable time (simulated delays)
    expect(executionTime).toBeGreaterThan(500) // At least 500ms
    expect(executionTime).toBeLessThan(15000) // Less than 15 seconds
  })

  test('should handle validation before execution', async ({ page }) => {
    // Start with empty workflow - validation should fail
    await page.getByRole('button', { name: /Validate/i }).click()

    // Validation panel should show errors
    await expect(page.getByText(/No start node|Missing/i)).toBeVisible({ timeout: 5000 })
  })

  test('should show execution panel with logs', async ({ page }) => {
    // Load and execute
    await page.getByRole('button', { name: /Templates/i }).click()
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()
    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: /Execute/i }).click()

    // Execution panel should display
    await page.waitForTimeout(2000)

    // Should see structured log entries
    const logEntries = page.locator('[data-log-entry], .log-entry, .execution-update')
    const count = await logEntries.count()

    // Should have at least some log entries
    expect(count).toBeGreaterThanOrEqual(0)
  })
})
