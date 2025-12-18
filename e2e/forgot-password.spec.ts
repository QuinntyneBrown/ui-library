import { test, expect } from '@playwright/test';

test.describe('Forgot Password Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/forgot-password');
  });

  test('should display the forgot password component', async ({ page }) => {
    await expect(page.locator('q-forgot-password')).toBeVisible();
  });

  test('should have email input field', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('invalid-email');
    await emailInput.blur();
    
    const errorMessage = page.locator('mat-error');
    await expect(errorMessage).toBeVisible();
  });

  test('should enable submit button with valid email', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('test@example.com');
    
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });
});
