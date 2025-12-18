import { test, expect } from '@playwright/test';

test.describe('Header Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/header');
  });

  test('should display the header component', async ({ page }) => {
    await expect(page.locator('q-header')).toBeVisible();
  });

  test('should be visible at the top of the page', async ({ page }) => {
    const header = page.locator('q-header');
    const boundingBox = await header.boundingBox();
    
    expect(boundingBox).not.toBeNull();
    if (boundingBox) {
      expect(boundingBox.y).toBeLessThan(200); // Should be near the top
    }
  });
});
