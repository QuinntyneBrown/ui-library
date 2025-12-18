import { test, expect } from '@playwright/test';

test.describe('Section Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/section');
  });

  test('should display the section component', async ({ page }) => {
    await expect(page.locator('q-section')).toBeVisible();
  });

  test('should render content within section', async ({ page }) => {
    const section = page.locator('q-section');
    await expect(section).toContainText(/Section Content/i);
  });

  test('should display heading and paragraph', async ({ page }) => {
    const heading = page.locator('q-section h3');
    const paragraph = page.locator('q-section p');
    
    await expect(heading).toBeVisible();
    await expect(paragraph).toBeVisible();
  });
});
