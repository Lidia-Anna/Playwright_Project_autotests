import { test, expect } from '@playwright/test';

const variants = [
  { value: 'name,asc', dir: 'asc' as const, label: 'Name (A - Z)' },
  { value: 'name,desc', dir: 'desc' as const, label: 'Name (Z - A)' },
];

test.describe('Verify user can perform sorting by name (asc & desc) @regression', () => {
  for (const v of variants) {
    test(`should sort products by ${v.label}`, async ({ page }) => {

      await test.step('Open homepage', async () => {
        await page.goto('/');
      });

      await test.step('Wait for product names to be visible', async () => {
        const nameLocator = page.getByTestId('product-name');
        await nameLocator.nth(1).waitFor({ timeout: 15_000 });
      });

      await test.step(`Select sorting option: ${v.label}`, async () => {
        await page.getByTestId('sort').selectOption(v.value);
      });

      await test.step(`Verify products are sorted by ${v.label}`, async () => {
        const nameLocator = page.getByTestId('product-name');

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
    });
  }
});

