import { test, expect } from '@playwright/test';

test.describe('Login Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/login');
  });

  test('should display the login component', async ({ page }) => {
    await expect(page.locator('q-login')).toBeVisible();
  });

  test('should have username and password fields', async ({ page }) => {
    const usernameInput = page.locator('input[type="text"]').or(page.locator('input[type="email"]'));
    const passwordInput = page.locator('input[type="password"]');
    
    await expect(usernameInput.first()).toBeVisible();
    await expect(passwordInput.first()).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    const errorMessages = page.locator('mat-error');
    await expect(errorMessages.first()).toBeVisible();
  });

  test('should enable submit button with valid credentials', async ({ page }) => {
    const usernameInput = page.locator('input[type="text"]').or(page.locator('input[type="email"]'));
    const passwordInput = page.locator('input[type="password"]');
    
    await usernameInput.first().fill('testuser@example.com');
    await passwordInput.first().fill('Password123!');
    
    const submitButton = page.locator('button[type="submit"]').first();
    await expect(submitButton).toBeEnabled();
  });
});
