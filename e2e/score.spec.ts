import { test, expect } from '@playwright/test';

test.describe('Score Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/score');
  });

  test('should display the score component', async ({ page }) => {
    await expect(page.locator('q-score')).toBeVisible();
  });

  test('should be rendered in the DOM', async ({ page }) => {
    const scoreComponent = page.locator('q-score');
    const isAttached = await scoreComponent.count();
    
    expect(isAttached).toBeGreaterThan(0);
  });
});
