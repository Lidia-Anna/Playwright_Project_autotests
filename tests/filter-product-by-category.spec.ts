import { test, expect } from '@playwright/test';

enum CategoryGroup {
  HandTools = 'Hand Tools',
  PowerTools = 'Power Tools',
  Other = 'Other',
}

enum CategoryItem {
  Sander = 'Sander',
}

test.describe('Verify user can filter products by category', () => {
  test('user can filter by Sander and see only Sander products', async ({ page }) => {

    await page.goto('/');

    const sanderCheckbox = page.getByLabel(CategoryItem.Sander, { exact: true });
    await sanderCheckbox.check();

    const nameLocator = page.getByTestId('product-name');

    await expect(async () => {
      const names = (await nameLocator.allTextContents())
        .map(s => s.trim())
        .filter(Boolean);

      expect(names.length).toBeGreaterThan(0);

      for (const n of names) {
        expect(n).toMatch(/sander/i);
      }
    }).toPass();
  });
});