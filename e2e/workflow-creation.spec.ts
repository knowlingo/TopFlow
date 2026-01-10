import { test, expect } from '@playwright/test'

test.describe('Workflow Creation', () => {
  test('should load the application homepage', async ({ page }) => {
    await page.goto('/')

    // Check for main heading
    await expect(page.getByRole('heading', { name: /AI Agent Builder/i })).toBeVisible()

    // Check for canvas
    await expect(page.locator('.react-flow')).toBeVisible()

    // Check for node palette
    await expect(page.getByText(/Entry & Exit/i)).toBeVisible()
  })

  test('should display node palette with all node types', async ({ page }) => {
    await page.goto('/')

    // Check for node categories
    await expect(page.getByText(/Entry & Exit/i)).toBeVisible()
    await expect(page.getByText(/AI Models/i)).toBeVisible()
    await expect(page.getByText(/Data & Processing/i)).toBeVisible()
    await expect(page.getByText(/Flow Control/i)).toBeVisible()

    // Check for specific node types
    await expect(page.getByText(/Start/i).first()).toBeVisible()
    await expect(page.getByText(/End/i).first()).toBeVisible()
    await expect(page.getByText(/Text Model/i).first()).toBeVisible()
    await expect(page.getByText(/Prompt/i).first()).toBeVisible()
  })

  test('should have empty canvas initially', async ({ page }) => {
    await page.goto('/')

    // Canvas should be present
    const canvas = page.locator('.react-flow__viewport')
    await expect(canvas).toBeVisible()

    // No nodes should be visible initially
    const nodes = page.locator('.react-flow__node')
    await expect(nodes).toHaveCount(0)
  })

  test('should show toolbar with action buttons', async ({ page }) => {
    await page.goto('/')

    // Check for main action buttons
    await expect(page.getByRole('button', { name: /Templates/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Load/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Save/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Validate/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Execute/i })).toBeVisible()
  })

  test('should display undo/redo toolbar', async ({ page }) => {
    await page.goto('/')

    // Check for undo/redo buttons
    await expect(page.getByRole('button', { name: /Undo/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Redo/i })).toBeVisible()

    // Initially both should be disabled
    await expect(page.getByRole('button', { name: /Undo/i })).toBeDisabled()
    await expect(page.getByRole('button', { name: /Redo/i })).toBeDisabled()
  })

  test('should display auto-save indicator', async ({ page }) => {
    await page.goto('/')

    // Auto-save indicator should be visible
    await expect(page.getByText(/Unsaved changes|Saved|Saving/i)).toBeVisible()
  })

  test('should show API settings button', async ({ page }) => {
    await page.goto('/')

    // API Settings button should be visible
    await expect(page.getByRole('button', { name: /API Settings/i })).toBeVisible()
  })

  test('should have responsive layout', async ({ page }) => {
    await page.goto('/')

    // Get viewport size
    const viewportSize = page.viewportSize()
    expect(viewportSize).toBeTruthy()

    // Canvas should adapt to viewport
    const canvas = page.locator('.react-flow')
    const boundingBox = await canvas.boundingBox()
    expect(boundingBox).toBeTruthy()
    expect(boundingBox!.width).toBeGreaterThan(0)
    expect(boundingBox!.height).toBeGreaterThan(0)
  })

  test('should display keyboard shortcuts hints', async ({ page }) => {
    await page.goto('/')

    // Check for keyboard shortcut indicators (⌘Z, ⌘⇧Z)
    const undoButton = page.getByRole('button', { name: /Undo/i })
    await expect(undoButton).toBeVisible()

    // Shortcuts should be visible in the UI
    await expect(page.getByText('⌘Z')).toBeVisible()
  })

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/')

    // Check main landmark regions
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // All interactive elements should be keyboard accessible
    const buttons = page.getByRole('button')
    const buttonCount = await buttons.count()
    expect(buttonCount).toBeGreaterThan(0)
  })
})
