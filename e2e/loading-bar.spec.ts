import { test, expect } from '@playwright/test';

test.describe('Loading Bar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/loading-bar');
  });

  test('should display the loading bar component', async ({ page }) => {
    await expect(page.locator('q-loading-bar')).toBeVisible();
  });

  test('should have control buttons', async ({ page }) => {
    const showButton = page.locator('button', { hasText: 'Show' });
    const hideButton = page.locator('button', { hasText: 'Hide' });
    
    await expect(showButton).toBeVisible();
    await expect(hideButton).toBeVisible();
  });

  test('should show loading bar when show button clicked', async ({ page }) => {
    const showButton = page.locator('button', { hasText: 'Show' });
    await showButton.click();
    
    const progressBar = page.locator('mat-progress-bar');
    await expect(progressBar).toBeVisible();
  });

  test('should hide loading bar when hide button clicked', async ({ page }) => {
    const showButton = page.locator('button', { hasText: 'Show' });
    const hideButton = page.locator('button', { hasText: 'Hide' });
    
    await showButton.click();
    await page.waitForTimeout(100);
    await hideButton.click();
    
    const progressBar = page.locator('mat-progress-bar');
    await expect(progressBar).not.toBeVisible();
  });
});
