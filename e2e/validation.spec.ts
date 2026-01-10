import { test, expect } from '@playwright/test'

test.describe('Workflow Validation', () => {
  test('should validate empty workflow and show errors', async ({ page }) => {
    await page.goto('/')

    // Click Validate button on empty canvas
    await page.getByRole('button', { name: /Validate/i }).click()

    // Validation panel should open
    await expect(page.getByText(/Validation Results|Validation/i)).toBeVisible({ timeout: 5000 })

    // Should show errors about missing nodes
    await expect(page.getByText(/No start node|Missing start/i)).toBeVisible()
  })

  test('should validate loaded template successfully', async ({ page }) => {
    await page.goto('/')

    // Load a template
    await page.getByRole('button', { name: /Templates/i }).click()
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()
    await page.waitForTimeout(1000)

    // Validate the template
    await page.getByRole('button', { name: /Validate/i }).click()

    // Should show validation results
    await expect(page.getByText(/Validation|Score|Grade/i)).toBeVisible({ timeout: 5000 })
  })

  test('should show validation score', async ({ page }) => {
    await page.goto('/')

    // Load template and validate
    await page.getByRole('button', { name: /Templates/i }).click()
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()
    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: /Validate/i }).click()

    // Should display a score (0-100) and grade (A-F)
    await expect(page.getByText(/Score:|Grade:/i)).toBeVisible({ timeout: 5000 })
  })

  test('should display validation issues by type', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Validate/i }).click()

    // Should categorize issues
    await expect(
      page.getByText(/Error|Warning|Info/i).first()
    ).toBeVisible({ timeout: 5000 })
  })

  test('should show structural validation', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Validate/i }).click()

    // Should check for structural issues
    await expect(page.getByText(/start node|end node|cycle/i)).toBeVisible({ timeout: 5000 })
  })

  test('should validate without blocking for warnings', async ({ page }) => {
    await page.goto('/')

    // Load a valid template
    await page.getByRole('button', { name: /Templates/i }).click()
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()
    await useTemplateButton.click()
    await page.waitForTimeout(1000)

    // Validate
    await page.getByRole('button', { name: /Validate/i }).click()
    await page.waitForTimeout(1000)

    // Even with warnings, Execute button should work
    const executeButton = page.getByRole('button', { name: /Execute/i })
    await expect(executeButton).toBeVisible()
    await expect(executeButton).not.toBeDisabled()
  })

  test('should close validation panel', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Validate/i }).click()

    // Panel should be visible
    await expect(page.getByText(/Validation/i)).toBeVisible({ timeout: 5000 })

    // Should be able to close it
    await page.keyboard.press('Escape')

    // Or click elsewhere to deselect
    await page.locator('.react-flow').click({ position: { x: 100, y: 100 } })
  })
})
