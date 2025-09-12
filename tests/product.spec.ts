import { Checkout } from './../pages/checkout.page';
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetails } from '../pages/productDetails.page';

test('Verify user can add product to cart @smoke', async ({ page }) => {
    const homePage = new HomePage(page);
    await test.step('Open Home page', async () => {
      await page.goto('/');
    });
    await test.step('Open Product details page', async () => {
      await homePage.openProductCard();
    });
    const productDetails = new ProductDetails(page);
    await test.step('Verify Product details page', async () => {
      await expect(page).toHaveURL(/.*\/product\/.*/);
      await expect(productDetails.productName).toContainText('Slip Joint Pliers');
      await expect(productDetails.productPrize).toContainText('9.17');
      await expect(productDetails.addToCartButton).toBeVisible();
      });
    await test.step('Add product to cart', async () => {  
      await productDetails.addToCartButton.click();
    });

    await test.step('Verify product is added to cart', async () => {
      await expect(productDetails.alertMessage).toBeVisible();
      await expect(productDetails.alertMessage).toContainText('Product added to shopping cart');
      await expect(productDetails.alertMessage).toBeHidden({ timeout: 8000 });
      await expect(productDetails.cartQuantity).toHaveText('1');
    });

    const checkout = new Checkout(page);

    await test.step('Open cart', async () => {
      await productDetails.cardIcon.click();
    });

    await test.step('Verify Sign In step on the Checkout page', async () => {
      await expect(page).toHaveURL('/checkout');
    });
    await test.step('Verify product details', async () => {
      await expect(checkout.productQuantity).toHaveValue('1');
      await expect(checkout.productTitle).toHaveText('Slip Joint Pliers');
      await expect(checkout.btnProceed).toBeVisible();
  });

});