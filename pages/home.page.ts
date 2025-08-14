import { Locator, Page } from '@playwright/test';

export class HomePage{
  page: Page;
    productName: Locator;

    constructor(page:Page){
    this.page= page;
    this.productName = this.page.getByTestId('product-01K2MHH0S1CGYNP4S95TKDKDAC');
  }
    async openProductCard(): Promise<void>{
    await this.productName.click();
  }
}