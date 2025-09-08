import { test as base} from '@playwright/test';
import { AllPages } from './pages/allPages.page';
import { USER } from './credentials';

type MyFixtures = {
  app: AllPages;
  loggedInApp: AllPages;
};
export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
  },

  loggedInApp: async ({ app }, use) => {
    await app.page.goto('/auth/login'); 
    await app.loginPage.performLogin(
      USER.email,
     USER.password
    );
    await use(app);
  },
});
//const loggedInUser = test.extend<{app: AllPages;}>({
  //app: async ({ page, app, request }, use) => {
   // const response = await request.post(`https://api.practicesoftwaretesting.com/users/login`, {
  //  data: {
   //   email: USER.email,
   //   password: USER.password,
   // }
  //});
//  expect(response.ok()).toBeTruthy();
 // await use(app);
//  },
  
//});
export const expect = base.expect;

//export {test, expect, loggedInUser};