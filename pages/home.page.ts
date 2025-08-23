import { Locator, Page } from '@playwright/test';

export class HomePage{
  page: Page;
    productName: Locator;

    constructor(page:Page){
    this.page= page;
    this.productName = this.page.getByRole('heading', {name:' Slip Joint Pliers '});
  }
    async openProductCard(): Promise<void>{
    await this.productName.click();
  }
}
