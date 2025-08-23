import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetails } from '../pages/productDetails.page';

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetails = new ProductDetails(page);

  await page.goto('/');
  await homePage.openProductCard();
  await expect(page).toHaveURL(/.*\/product\/.*/);
  await expect(productDetails.productName).toContainText('Slip Joint Pliers');
  await expect(productDetails.productPrize).toContainText('9.17');
  await expect(productDetails.addToCartButton).toBeVisible();

  await productDetails.addToCartButton.click();
  const alertMessage = page.getByRole('alert', { name: 'Product added to shopping' });
  const cartQuantity = page.getByTestId('cart-quantity');
  const cardIcon = page.getByTestId('nav-cart');
  await expect(alertMessage).toBeVisible();
  await expect(alertMessage).toContainText('Product added to shopping cart');
  await expect(alertMessage).toBeHidden({ timeout: 8000 });
  await expect(cartQuantity).toHaveText('1');

  await cardIcon.click();
  const productQuantity = page.getByTestId('product-quantity');
  const productTitle = page.getByTestId('product-title');
  const btnProceed = page.getByTestId('proceed-1');
  await expect(page).toHaveURL('/checkout');
  await expect(productQuantity).toHaveValue('1');
  await expect(productTitle).toContainText('Slip Joint Pliers');
  await expect(btnProceed).toBeVisible();
});