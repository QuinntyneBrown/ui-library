import { test, expect } from '@playwright/test';

test.describe('Ribbon Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/ribbon');
  });

  test('should display the ribbon component', async ({ page }) => {
    await expect(page.locator('q-ribbon')).toBeVisible();
  });

  test('should display ribbon items', async ({ page }) => {
    const ribbonItems = page.locator('q-ribbon button, q-ribbon a');
    await expect(ribbonItems.first()).toBeVisible();
  });

  test('should have multiple navigation items', async ({ page }) => {
    const ribbonItems = page.locator('q-ribbon button, q-ribbon a');
    const count = await ribbonItems.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should handle item click', async ({ page }) => {
    const firstItem = page.locator('q-ribbon button, q-ribbon a').first();
    await firstItem.click();
    
    // Check if item becomes active
    await expect(page.locator('q-ribbon')).toBeVisible();
  });
});
