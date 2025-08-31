import { Locator, Page } from '@playwright/test';

export class Checkout{
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    btnProceed: Locator;

    constructor(page:Page){
          this.page= page;
          this.productQuantity = this.page.getByTestId('product-quantity');
          this.productTitle = this.page.getByTestId('product-title');
          this.btnProceed = this.page.getByTestId('proceed-1');

        }
}