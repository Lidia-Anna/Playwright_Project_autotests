import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import json from '../testData/mocking.json';

test('displays 20 product cards with mocked data @regression', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('Mock API response for products', async () => {
    await page.route('**/products*', async (route) => {
      await route.fulfill({
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(json),
      });
    });
  });

  await test.step('Open homepage', async () => {
    await page.goto('/');
  });

  await test.step('Verify that exactly 20 product cards are displayed', async () => {
    await expect(homePage.productsCard).toHaveCount(20);
  });
  });