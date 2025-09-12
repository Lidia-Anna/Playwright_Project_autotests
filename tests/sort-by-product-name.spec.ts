import { test } from '@playwright/test';
import { expectSortedNames } from '../utils/verify-sorting';

const variants = [
  { value: 'name,asc', dir: 'asc' as const, label: 'Name (A - Z)' },
  { value: 'name,desc', dir: 'desc' as const, label: 'Name (Z - A)' },
];

test.describe('Verify user can perform sorting by name (asc & desc) @regression', () => {
  for (const v of variants) {
    test(`should sort products by ${v.label}`, async ({ page }) => {
      await page.goto('/');

      const nameLocator = page.getByTestId('product-name');

      await nameLocator.nth(1).waitFor();

      await page.getByTestId('sort').selectOption(v.value);

      await expectSortedNames(nameLocator, v.dir);
    });
  }
});

