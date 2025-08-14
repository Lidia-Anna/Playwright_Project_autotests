import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetails } from '../pages/productDetails.page';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetails = new ProductDetails(page);
  await page.goto('/');
  await homePage.openProductCard();
  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(productDetails.productName).toContainText('Combination Pliers');
  await expect(productDetails.productPrize).toContainText('14.15');
  await expect(productDetails.addToCartButton).toBeVisible();
  await expect(productDetails.addToFavoritesButton).toBeVisible();
});