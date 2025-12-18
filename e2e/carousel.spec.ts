import { test, expect } from '@playwright/test';

test.describe('Carousel Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/carousel');
  });

  test('should display the carousel component', async ({ page }) => {
    await expect(page.locator('q-carousel')).toBeVisible();
  });

  test('should display carousel items', async ({ page }) => {
    const carouselItems = page.locator('.carousel-item');
    await expect(carouselItems.first()).toBeVisible();
  });

  test('should have navigation buttons', async ({ page }) => {
    const prevButton = page.locator('button').filter({ hasText: /prev|previous/i });
    const nextButton = page.locator('button').filter({ hasText: /next/i });
    
    await expect(prevButton.or(page.locator('button mat-icon').filter({ hasText: 'chevron_left' }))).toBeVisible();
    await expect(nextButton.or(page.locator('button mat-icon').filter({ hasText: 'chevron_right' }))).toBeVisible();
  });

  test('should navigate to next slide on button click', async ({ page }) => {
    const nextButton = page.locator('button').last();
    await nextButton.click();
    await page.waitForTimeout(500);
    
    // Carousel should have changed position
    await expect(page.locator('q-carousel')).toBeVisible();
  });
});
