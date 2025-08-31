import { test, expect } from '@playwright/test';

const variants = [
  { value: 'price,asc', dir: 'asc' as const, label: 'Price (Low - High)' },
  { value: 'price,desc', dir: 'desc' as const, label: 'Price (High - Low)' },
];

test.describe('Verify user can perform sorting by price (asc & desc)', () => {
  for (const v of variants) {
    test(`should sort products by ${v.label}`, async ({ page }) => {

      await page.goto('/');

      await page.getByTestId('sort').selectOption(v.value);

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
  }
});