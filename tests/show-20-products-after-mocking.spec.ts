import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import json from '../testData/mocking.json';

test('displays 20 product cards with mocked data', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.route('**/products*', async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(json),
    });
  });

  await page.goto('/');

  await expect(homePage.productsCard).toHaveCount(20);
  });