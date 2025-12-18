import { test, expect } from '@playwright/test';

test.describe('Image Upload Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/image-upload');
  });

  test('should display the image upload component', async ({ page }) => {
    await expect(page.locator('q-image-upload')).toBeVisible();
  });

  test('should have a drop zone', async ({ page }) => {
    const dropZone = page.locator('.image-upload__drop-zone');
    await expect(dropZone).toBeVisible();
  });

  test('should show drag over state', async ({ page }) => {
    const dropZone = page.locator('.image-upload__drop-zone');
    
    // Simulate drag over
    await dropZone.dispatchEvent('dragover', { bubbles: true });
    
    await expect(dropZone).toHaveClass(/dragging/);
  });

  test('should have file input', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toHaveCount(1);
  });
});
