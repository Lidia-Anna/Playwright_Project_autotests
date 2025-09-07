import { Page } from '@playwright/test';
import { AccountPage } from './account.page';
import { LoginPage } from './login.page';
import { HomePage } from './home.page';
import { ProductDetails } from './productDetails.page';
import { Checkout } from './checkout.page';

export class AllPages{
    page: Page;
    loginPage: LoginPage;
    accountPage: AccountPage;
    homePage: HomePage;
    productDetails: ProductDetails;
    checkout: Checkout;

    constructor(page: Page){
      this.page = page;
      this.loginPage = new LoginPage(page);
      this.accountPage = new AccountPage(page);
      this.homePage = new HomePage(page);
      this.productDetails = new ProductDetails(page);
      this.checkout = new Checkout(page);
    }
    parsePrice(text: string): number {
      const cleaned = text.replace(/\s/g, '').replace(/[^\d,.-]/g, '').replace(',', '.');
      const n = Number(cleaned.match(/-?\d+(\.\d+)?/)?.[0] ?? NaN);
      if (Number.isNaN(n)) throw new Error(`Cannot parse price from "${text}"`);
      return n;
    }
}