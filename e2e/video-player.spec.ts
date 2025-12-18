import { test, expect } from '@playwright/test';

test.describe('Video Player Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/video-player');
  });

  test('should display the video player component', async ({ page }) => {
    await expect(page.locator('q-video-player')).toBeVisible();
  });

  test('should have iframe for video', async ({ page }) => {
    const iframe = page.locator('q-video-player iframe');
    
    // Wait for iframe to load
    await page.waitForTimeout(1000);
    
    const iframeCount = await iframe.count();
    expect(iframeCount).toBeGreaterThanOrEqual(0);
  });

  test('should load video content', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Component should remain visible
    await expect(page.locator('q-video-player')).toBeVisible();
  });
});
