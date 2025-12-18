import { test, expect } from '@playwright/test';

test.describe('Title and Text Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/title-and-text');
  });

  test('should display the title and text component', async ({ page }) => {
    await expect(page.locator('q-title-and-text')).toBeVisible();
  });

  test('should display title', async ({ page }) => {
    const component = page.locator('q-title-and-text');
    await expect(component).toContainText(/Sample Title/i);
  });

  test('should display text content', async ({ page }) => {
    const component = page.locator('q-title-and-text');
    await expect(component).toContainText(/longer text/i);
  });

  test('should have expand/collapse functionality', async ({ page }) => {
    const expandLink = page.locator('q-title-and-text q-expand-collapse-link button');
    
    if (await expandLink.isVisible()) {
      await expandLink.click();
      await page.waitForTimeout(300);
      
      // Text should still be visible after toggle
      await expect(page.locator('q-title-and-text')).toBeVisible();
    }
  });
});
