import { test, expect } from '@playwright/test';

test.describe('Hero Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/hero');
  });

  test('should display the hero component', async ({ page }) => {
    await expect(page.locator('q-hero')).toBeVisible();
  });

  test('should display car image', async ({ page }) => {
    const image = page.locator('q-hero img');
    await expect(image).toBeVisible();
  });

  test('should display make and model information', async ({ page }) => {
    const hero = page.locator('q-hero');
    await expect(hero).toContainText(/Tesla|Model/i);
  });

  test('should display MSRP', async ({ page }) => {
    const hero = page.locator('q-hero');
    await expect(hero).toContainText(/\$/);
  });

  test('should have action buttons', async ({ page }) => {
    const buttons = page.locator('q-hero button');
    await expect(buttons.first()).toBeVisible();
  });
});
