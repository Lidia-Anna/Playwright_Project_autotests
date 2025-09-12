import { Locator, Page } from '@playwright/test';

export class HomePage{
  page: Page;
    productName: Locator;
    firstCardName: Locator;
    productsCard: Locator;
    firstCardPrice: Locator;
    firstCard: Locator;

    constructor(page:Page){
      this.page= page;
      this.firstCard = this.page.locator('a.card').first();
      this.firstCardName = this.page.locator('a.card').first().getByTestId('product-name');
      this.firstCardPrice = this.page.locator('a.card').first().getByTestId('product-price');
      this.productName = this.page.getByRole('heading', {name:' Slip Joint Pliers '});
      this.productsCard = this.page.getByTestId(/^product-[A-Za-z0-9-]+$/).and(this.page.locator('a.card'));
      //this.productCardName = this.page.getByTestId('product-name');
  }
    async openProductCard(): Promise<void>{
    await this.productName.click();
  }
}
