import { Locator, Page } from '@playwright/test';

export class ProductDetails{
    page: Page;
    productName: Locator;
    productPrize: Locator;
    addToCartButton: Locator;
    alertMessage: Locator;
    cartQuantity: Locator;
    cardIcon: Locator;
    productTitle: Locator;
    productPrizes: Locator;
    productLinePrice: Locator;
    addToCartBtn: Locator;
  
    constructor(page:Page){
      this.page= page;
      this.productName = this.page.getByTestId('product-name');
      this.productPrize = this.page.getByTestId('unit-price');
      this.addToCartButton = this.page.getByTestId('add-to-cart');
      this.alertMessage = this.page.getByRole('alert', { name: 'Product added to shopping' });
      this.cartQuantity = this.page.getByTestId('cart-quantity');
      this.cardIcon = this.page.getByTestId('nav-cart');
      this.productTitle = this.page.getByTestId('product-title');
      this.productPrizes = this.page.getByTestId('product-price');
      this.productLinePrice = this.page.getByTestId('line-price');
      this.addToCartBtn = this.page.getByRole('button', { name: /add to cart/i });
    }
    
}