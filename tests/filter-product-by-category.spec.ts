import { test, expect } from '@playwright/test';

enum CategoryItem {
  Sander = 'Sander',
}

test.describe('Verify user can filter products by category @regression', () => {
  test('user can filter by Sander and see only Sander products', async ({ page }) => {

    await test.step('Open homepage', async () => {
      await page.goto('/');
    });

    await test.step('Apply category filter: Sander', async () => {
      const sanderCheckbox = page.getByLabel(CategoryItem.Sander, { exact: true });
      await sanderCheckbox.check();
      await expect(sanderCheckbox).toBeChecked();
    });

    await test.step('Wait for filtered products to be displayed', async () => {
      const nameLocator = page.getByTestId('product-name');
      await expect(nameLocator.first()).toBeVisible({ timeout: 15_000 });
    });

    await test.step('Verify that only Sander products are displayed', async () => {
      const nameLocator = page.getByTestId('product-name');

      await expect(async () => {
        const names = (await nameLocator.allTextContents())
          .map(s => s.trim())
          .filter(Boolean);

        expect(names.length, 'Product list should not be empty').toBeGreaterThan(0);

        for (const n of names) {
          expect(n).toMatch(/sander/i);
        }
      }).toPass();
    });
  });
});