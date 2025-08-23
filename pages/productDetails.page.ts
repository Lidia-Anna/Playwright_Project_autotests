import { Locator, Page } from '@playwright/test';

export class ProductDetails{
    page: Page;
    productName: Locator;
    productPrize: Locator;
    addToCartButton: Locator;
    //addToFavoritesButton: Locator;

  
    constructor(page:Page){
      this.page= page;
      this.productName = this.page.getByTestId('product-name');
      this.productPrize = this.page.getByTestId('unit-price');
      this.addToCartButton = this.page.getByTestId('add-to-cart');
      //this.addToFavoritesButton = this.page.getByTestId('add-to-favorites');
    }

}