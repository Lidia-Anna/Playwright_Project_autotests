import { Locator, Page } from '@playwright/test';
//import { USER } from '../credentials';

export class Checkout{
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    btnProceed: Locator;
    //logInMessage: Locator;
    btnProceed2: Locator;
    inputState: Locator;
    inputPostalCode: Locator;
    btnProceed3: Locator;
    selectCreditCard: Locator;
    inputCreditCardNumber: Locator;
    inputExpData: Locator;
    inputCvv: Locator;
    inputCardName: Locator;
    btnFinish: Locator;
    paymentSuccessMessage: Locator;
    orderConfirmation: Locator;


    constructor(page:Page){
          this.page= page;
          this.productQuantity = this.page.getByTestId('product-quantity');
          this.productTitle = this.page.getByTestId('product-title');
          this.btnProceed = this.page.getByTestId('proceed-1');
          this.btnProceed2 = this.page.getByTestId('proceed-2');
          this.inputState = this.page.getByTestId('state');
          this.inputPostalCode = this.page.getByTestId('postal_code');
          this.btnProceed3 = this.page.getByTestId('proceed-3');
          this.selectCreditCard = this.page.getByTestId('payment-method');
          this.inputCreditCardNumber = this.page.getByTestId('credit_card_number');
          this.inputExpData = this.page.getByTestId('expiration_date');
          this.inputCvv = this.page.getByTestId('cvv');
          this.inputCardName = this.page.getByTestId('card_holder_name');
          this.btnFinish = this.page.getByTestId('finish');
          this.paymentSuccessMessage = this.page.getByTestId('payment-success-message');
          this.orderConfirmation = this.page.locator('#order-confirmation');
        }
}