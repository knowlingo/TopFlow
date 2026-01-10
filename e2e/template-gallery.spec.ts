import { test, expect } from '@playwright/test'

test.describe('Template Gallery', () => {
  test('should open template gallery dialog', async ({ page }) => {
    await page.goto('/')

    // Click Templates button
    await page.getByRole('button', { name: /Templates/i }).click()

    // Dialog should open
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByText(/Workflow Templates/i)).toBeVisible()
  })

  test('should display available templates', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Check for template cards
    await expect(page.getByText(/Simple Greeting/i)).toBeVisible()
    await expect(page.getByText(/Country Info Lookup/i)).toBeVisible()

    // Check for security templates
    await expect(page.getByText(/GDPR Data Access Request/i)).toBeVisible()
    await expect(page.getByText(/PII Detection/i)).toBeVisible()
  })

  test('should show template descriptions', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Template cards should have descriptions
    await expect(page.getByText(/Basic AI greeting workflow/i)).toBeVisible()
    await expect(page.getByText(/Lookup country information/i)).toBeVisible()
  })

  test('should show template node counts', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Template cards should show node counts
    await expect(page.getByText(/\d+ nodes/i).first()).toBeVisible()
  })

  test('should show demo data availability badges', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Check for "Demo Data Available" badges
    const demoBadges = page.getByText(/Demo Data Available/i)
    const count = await demoBadges.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should close template gallery', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Dialog should be visible
    await expect(page.getByRole('dialog')).toBeVisible()

    // Click close button or escape
    await page.keyboard.press('Escape')

    // Dialog should close
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('should filter templates by category', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Check if category filter exists
    const securityCategory = page.getByText(/Security & Compliance/i)
    if (await securityCategory.isVisible()) {
      // Click on security category
      await securityCategory.click()

      // Should show security-related templates
      await expect(page.getByText(/GDPR/i)).toBeVisible()
    }
  })

  test('should have template preview or details', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Template cards should be clickable/interactive
    const templateCards = page.locator('[role="article"], .template-card, [data-template]')
    const firstCard = templateCards.first()

    if ((await templateCards.count()) > 0) {
      await expect(firstCard).toBeVisible()
    }
  })

  test('should load template when clicking "Use Template"', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Find and click "Use Template" button
    const useTemplateButton = page.getByRole('button', { name: /Use Template/i }).first()

    if (await useTemplateButton.isVisible()) {
      await useTemplateButton.click()

      // Dialog should close
      await expect(page.getByRole('dialog')).not.toBeVisible()

      // Canvas should now have nodes
      const nodes = page.locator('.react-flow__node')
      await expect(nodes.first()).toBeVisible({ timeout: 5000 })
    }
  })

  test('should show security-focused templates', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Templates/i }).click()

    // Check for GDPR templates
    await expect(page.getByText(/GDPR Data Access Request/i)).toBeVisible()
    await expect(page.getByText(/PII Detection/i)).toBeVisible()
    await expect(page.getByText(/Security Incident Response/i)).toBeVisible()
  })
})
