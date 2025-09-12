import { test, expect } from '@playwright/test';

const variants = [
  { value: 'price,asc', dir: 'asc' as const, label: 'Price (Low - High)' },
  { value: 'price,desc', dir: 'desc' as const, label: 'Price (High - Low)' },
];

test.describe('Verify user can perform sorting by price (asc & desc) @regression', () => {
  for (const v of variants) {
    test(`should sort products by ${v.label}`, async ({ page }) => {

      await test.step('Open homepage', async () => {
        await page.goto('/');
      });

      await test.step(`Select sorting option: ${v.label}`, async () => {
        await page.getByTestId('sort').selectOption(v.value);
      });

      await test.step('Wait for product prices to be visible', async () => {
        const priceLocator = page.getByTestId('product-price');
        await expect(priceLocator.first()).toBeVisible({ timeout: 15_000 });
      });

      await test.step(`Verify products are sorted by ${v.label}`, async () => {
        const priceLocator = page.getByTestId('product-price');

        await expect(async () => {
          const priceTexts = (await priceLocator.allTextContents()).map(s => s.trim());

          const prices = priceTexts.map(t => {
            const normalized = t.replace(/[^\d.,-]/g, '').replace(',', '.');
            return parseFloat(normalized);
          });

          expect(prices.length).toBeGreaterThan(1);

          let expected = [...prices].sort((a, b) => a - b);
          if (v.dir === 'desc') expected = expected.reverse();

          expect(prices).toEqual(expected);
        }).toPass();
      });
    });
  }
});