import { test, expect } from '@playwright/test';

test.describe('Re-Login Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/re-login');
  });

  test('should display the re-login component', async ({ page }) => {
    await expect(page.locator('q-re-login')).toBeVisible();
  });

  test('should have password field', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('should show username field as disabled', async ({ page }) => {
    const usernameInput = page.locator('input[type="text"]').or(page.locator('input[type="email"]'));
    await expect(usernameInput.first()).toBeDisabled();
  });

  test('should enable submit button with password entered', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('Password123!');
    
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });
});
