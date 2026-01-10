import { test, expect } from '@playwright/test'

test.describe('API Settings', () => {
  test('should open API settings dialog', async ({ page }) => {
    await page.goto('/')

    // Click API Settings button
    await page.getByRole('button', { name: /API Settings/i }).click()

    // Dialog should open
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByText(/API Keys Configuration/i)).toBeVisible()
  })

  test('should show provider options', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /API Settings/i }).click()

    // Should show different AI providers
    await expect(page.getByText(/OpenAI/i)).toBeVisible()
    await expect(page.getByText(/Anthropic/i)).toBeVisible()
    await expect(page.getByText(/Google/i)).toBeVisible()
    await expect(page.getByText(/Groq/i)).toBeVisible()
  })

  test('should have input fields for API keys', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /API Settings/i }).click()

    // Should have input fields (type="password" for security)
    const inputs = page.locator('input[type="password"], input[type="text"]')
    const count = await inputs.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should explain BYOK model', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /API Settings/i }).click()

    // Should explain that keys are stored locally
    await expect(page.getByText(/stored locally|browser|localStorage/i)).toBeVisible()
  })

  test('should close API settings dialog', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /API Settings/i }).click()

    // Dialog is open
    await expect(page.getByRole('dialog')).toBeVisible()

    // Close with Escape
    await page.keyboard.press('Escape')

    // Dialog should close
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('should show save button for API keys', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /API Settings/i }).click()

    // Should have a save/update button
    await expect(
      page.getByRole('button', { name: /Save|Update|Apply/i })
    ).toBeVisible()
  })

  test('should show security notice about API keys', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /API Settings/i }).click()

    // Should have security-related messaging
    await expect(
      page.getByText(/secure|privacy|never sent|local/i).first()
    ).toBeVisible()
  })

  test('should mask API key inputs', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /API Settings/i }).click()

    // API key inputs should be password type or masked
    const passwordInputs = page.locator('input[type="password"]')
    const count = await passwordInputs.count()
    expect(count).toBeGreaterThan(0)
  })
})
