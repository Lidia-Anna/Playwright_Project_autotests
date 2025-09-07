//import { test, expect } from '@playwright/test';
import { expect } from '@playwright/test';
import { test } from '../fixtures';

test('User can add product to cart and complete checkout with credit card', async ({loggedInApp: app }) => {
  
  await app.page.goto('/');
  // 1
  const gridName = (await app.homePage.firstCard.getByTestId('product-name').innerText()).trim();
  const gridPriceText = (await app.homePage.firstCard.getByTestId('product-price').innerText()).trim();
  const gridPrice = app.parsePrice(gridPriceText);

  await app.homePage.firstCard.click();

  const addToCartBtn = app.page.getByRole('button', { name: /add to cart/i });
  await addToCartBtn.click();

  const alert = app.page.getByRole('alert');
  await expect(alert).toBeHidden({ timeout: 8000 });

  // 2
  await app.productDetails.cardIcon.click();

  const cartTitle = (await app.page.getByTestId('product-title').first().innerText()).trim();
  const cartUnitPriceText = (await app.page.getByTestId('product-price').first().innerText()).trim();
  const cartTotalText = (await app.page.getByTestId('line-price').first().innerText()).trim();

  const cartUnitPrice = app.parsePrice(cartUnitPriceText);
  const cartTotal = app.parsePrice(cartTotalText);

  expect(cartTitle).toBe(gridName);
  expect(cartUnitPrice).toBeCloseTo(gridPrice, 2);
  expect(cartTotal).toBeCloseTo(gridPrice, 2);
  //3
  await app.checkout.btnProceed.click();
  //4
  await expect(app.checkout.logInMessage).toBeVisible();
  await app.checkout.btnProceed2.click();
  //5
  await app.checkout.inputState.fill('test');
  await app.checkout.inputPostalCode.fill('test');
  await app.checkout.btnProceed3.click();

  await app.checkout.selectCreditCard.selectOption('credit-card');

  await app.checkout.inputCreditCardNumber.fill('1111-1111-1111-1111');

  await app.checkout.inputExpData.fill(app.checkout.getExpirationPlusMonths(3));
  await app.checkout.inputCvv.fill('111');
  await app.checkout.inputCardName.fill('Jane Doe');
  await app.checkout.btnFinish.click();
//6
  await expect(app.checkout.paymentSuccessMessage).toContainText('Payment was successful');

  await app.checkout.btnFinish.click();

  await expect(app.checkout.orderConfirmation).toContainText('Thanks for your order! Your invoice number is ');
});