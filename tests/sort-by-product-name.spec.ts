import { test, expect } from '@playwright/test';

const variants = [
  { value: 'name,asc', dir: 'asc' as const, label: 'Name (A - Z)' },
  { value: 'name,desc', dir: 'desc' as const, label: 'Name (Z - A)' },
];

test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  for (const v of variants) {
    test(`should sort products by ${v.label}`, async ({ page }) => {
      await page.goto('/');

      const nameLocator = page.getByTestId('product-name');

      await nameLocator.nth(1).waitFor();

      await page.getByTestId('sort').selectOption(v.value);

      await expect(async () => {

      const names = (await nameLocator.allTextContents())
        .map(s => s.trim())
        .filter(Boolean);
        
      let expected = [...names].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' })
      );
      if (v.dir === 'desc') expected = expected.reverse();

      expect(names).toEqual(expected);
      }).toPass();
    });
  }
});

