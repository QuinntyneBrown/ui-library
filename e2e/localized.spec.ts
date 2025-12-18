import { test, expect } from '@playwright/test';

test.describe('Localized Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/localized');
  });

  test('should display the localized component', async ({ page }) => {
    await expect(page.locator('q-localized')).toBeVisible();
  });

  test('should have multiple language tabs', async ({ page }) => {
    const tabs = page.locator('mat-tab');
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThan(0);
  });

  test('should be able to switch between tabs', async ({ page }) => {
    const tabs = page.locator('mat-tab');
    const tabCount = await tabs.count();
    
    if (tabCount > 1) {
      await tabs.nth(1).click();
      await expect(tabs.nth(1)).toHaveClass(/mat-mdc-tab-active/);
    }
  });

  test('should show check icon for filled tabs', async ({ page }) => {
    // Fill in first tab content
    const firstInput = page.locator('input, textarea').first();
    await firstInput.fill('Test content');
    
    // Switch to another tab and back
    const tabs = page.locator('mat-tab');
    const tabCount = await tabs.count();
    
    if (tabCount > 1) {
      await tabs.nth(1).click();
      await tabs.nth(0).click();
      
      const checkIcon = page.locator('mat-icon', { hasText: 'check' });
      await expect(checkIcon.first()).toBeVisible();
    }
  });
});
