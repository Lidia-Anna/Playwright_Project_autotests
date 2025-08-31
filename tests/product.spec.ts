import { Checkout } from './../pages/checkout.page';
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetails } from '../pages/productDetails.page';

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetails = new ProductDetails(page);
  const checkout = new Checkout(page);

  await page.goto('/');
  await homePage.openProductCard();
  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(productDetails.productName).toContainText('Slip Joint Pliers');
  await expect(productDetails.productPrize).toContainText('9.17');
  await expect(productDetails.addToCartButton).toBeVisible();

  await productDetails.addToCartButton.click();
  await expect(productDetails.alertMessage).toBeVisible();
  await expect(productDetails.alertMessage).toContainText('Product added to shopping cart');
  await expect(productDetails.alertMessage).toBeHidden({ timeout: 8000 });
  await expect(productDetails.cartQuantity).toHaveText('1');

  await productDetails.cardIcon.click();
  await expect(page).toHaveURL('/checkout');
  await expect(checkout.productQuantity).toHaveValue('1');
  await expect(checkout.productTitle).toContainText('Slip Joint Pliers');
  await expect(checkout.btnProceed).toBeVisible();
});