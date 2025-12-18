import { test, expect } from '@playwright/test';

test.describe('Phone Number Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/phone-number');
  });

  test('should display the phone number component', async ({ page }) => {
    await expect(page.locator('q-phone-number')).toBeVisible();
  });

  test('should have country code selector', async ({ page }) => {
    const countrySelect = page.locator('mat-select');
    await expect(countrySelect).toBeVisible();
  });

  test('should have phone number input', async ({ page }) => {
    const phoneInput = page.locator('input[type="tel"]').or(page.locator('input[type="text"]'));
    await expect(phoneInput.first()).toBeVisible();
  });

  test('should allow changing country code', async ({ page }) => {
    const countrySelect = page.locator('mat-select');
    await countrySelect.click();
    
    const option = page.locator('mat-option', { hasText: 'UK' });
    await option.click();
    
    await expect(countrySelect).toContainText('+44');
  });

  test('should accept phone number input', async ({ page }) => {
    const phoneInput = page.locator('input[type="tel"]').or(page.locator('input[type="text"]'));
    await phoneInput.first().fill('5551234567');
    
    await expect(phoneInput.first()).toHaveValue('5551234567');
  });
});
