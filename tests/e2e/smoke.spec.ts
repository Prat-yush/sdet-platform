import { test, expect } from '@playwright/test';

test('home page loads with navigation and product listing', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('/');

  // Title carries a version suffix ("- v5.0") that changes per release, so match the stable part.
  await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/);
  await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  // Products are fetched async; the web-first assertion retries until they render.
  await expect(page.locator('[data-test="product-name"]').first()).toBeVisible();
});
