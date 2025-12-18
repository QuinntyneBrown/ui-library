import { test, expect } from '@playwright/test';

test.describe('Reset Password Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/reset-password');
  });

  test('should display the reset password component', async ({ page }) => {
    await expect(page.locator('q-reset-password')).toBeVisible();
  });

  test('should have password and confirm password fields', async ({ page }) => {
    const passwordInputs = page.locator('input[type="password"]');
    await expect(passwordInputs).toHaveCount(2);
  });

  test('should show error when passwords do not match', async ({ page }) => {
    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.nth(0).fill('Password123!');
    await passwordInputs.nth(1).fill('DifferentPassword123!');
    await passwordInputs.nth(1).blur();
    
    const errorMessage = page.locator('mat-error');
    await expect(errorMessage).toBeVisible();
  });

  test('should enable submit button when passwords match', async ({ page }) => {
    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.nth(0).fill('Password123!');
    await passwordInputs.nth(1).fill('Password123!');
    
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });
});
