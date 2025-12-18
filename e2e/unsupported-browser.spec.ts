import { test, expect } from '@playwright/test';

test.describe('Unsupported Browser Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/unsupported-browser');
  });

  test('should display the unsupported browser component', async ({ page }) => {
    await expect(page.locator('q-unsupported-browser')).toBeVisible();
  });

  test('should display browser options', async ({ page }) => {
    const browsers = page.locator('.unsupported-browser__browser');
    await expect(browsers).toHaveCount(4); // Chrome, Firefox, Safari, Edge
  });

  test('should have download links for browsers', async ({ page }) => {
    const downloadLinks = page.locator('.unsupported-browser__browser a');
    await expect(downloadLinks.first()).toBeVisible();
  });

  test('should display warning message', async ({ page }) => {
    const warning = page.locator('.unsupported-browser__warning');
    await expect(warning).toBeVisible();
  });
});
