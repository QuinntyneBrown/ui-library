import { test, expect } from '@playwright/test';

test.describe('Expand Collapse Link Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/expand-collapse-link');
  });

  test('should display the expand collapse link component', async ({ page }) => {
    await expect(page.locator('q-expand-collapse-link')).toBeVisible();
  });

  test('should display initial caption', async ({ page }) => {
    const link = page.locator('q-expand-collapse-link button');
    await expect(link).toContainText(/Show More|Read More/i);
  });

  test('should toggle caption on click', async ({ page }) => {
    const link = page.locator('q-expand-collapse-link button');
    const initialText = await link.textContent();
    
    await link.click();
    await page.waitForTimeout(100);
    
    const newText = await link.textContent();
    expect(newText).not.toBe(initialText);
  });

  test('should emit event on click', async ({ page }) => {
    const link = page.locator('q-expand-collapse-link button');
    await link.click();
    
    // Check if content is expanded
    const content = page.locator('.content.expanded');
    await expect(content).toBeVisible();
  });
});
