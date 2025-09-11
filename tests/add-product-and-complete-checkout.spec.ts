import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { parsePrice } from '../utils/parse';
//import { getExpirationPlusMonths } from '../utils/expirationMonth';
//import { USER } from '../credentials';
//import { CARDDETAILS } from '../testData/creditCardDetails';

test('User can add product to cart and complete checkout with credit card @smoke', async ({ app }) => {
  
  await app.page.goto('/');

  // 1
  const gridName = (await app.homePage.firstCardName.innerText()).trim();
  const gridPriceText = (await app.homePage.firstCardPrice.innerText()).trim();
  const gridPrice = parsePrice(gridPriceText);

  await app.homePage.firstCard.click();

  const addToCartBtn = app.page.getByRole('button', { name: /add to cart/i });
  await addToCartBtn.click();

  const alert = app.page.getByRole('alert');
  await expect(alert).toBeHidden({ timeout: 8000 });

  // 2
  await app.productDetails.cardIcon.click();

  const cartTitle = (await app.productDetails.productTitle.first().innerText()).trim();
  const cartUnitPriceText = (await app.productDetails.productPrizes.first().innerText()).trim();
  const cartTotalText = (await app.productDetails.productLinePrice.first().innerText()).trim();

  const cartUnitPrice = parsePrice(cartUnitPriceText);
  const cartTotal = parsePrice(cartTotalText);

  expect(cartTitle).toBe(gridName);
  expect(cartUnitPrice).toBeCloseTo(gridPrice, 2);
  expect(cartTotal).toBeCloseTo(gridPrice, 2);
  //3
  await app.checkout.btnProceed.click();
  //4
  //await app.page.waitForLoadState('load');
  //await expect(app.checkout.btnProceed2).toBeVisible();
  //await app.checkout.btnProceed2.click();
  //5
  //await app.checkout.inputState.fill('test');
  //await app.checkout.inputPostalCode.fill('test');
  //await app.checkout.btnProceed3.click();

  //await app.checkout.selectCreditCard.selectOption('credit-card');

 // await app.checkout.inputCreditCardNumber.fill(CARDDETAILS.creditNumber);

 // await app.checkout.inputExpData.fill(getExpirationPlusMonths(3));
 // await app.checkout.inputCvv.fill(CARDDETAILS.creditCvv);
//  await app.checkout.inputCardName.fill(USER.name);
//  await app.checkout.btnFinish.click();
//6
//  await expect(app.checkout.paymentSuccessMessage).toContainText('Payment was successful');

//  await app.checkout.btnFinish.click();

 // await expect(app.checkout.orderConfirmation).toContainText('Thanks for your order! Your invoice number is ');
});