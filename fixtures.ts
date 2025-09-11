import { test as base, expect} from '@playwright/test';
import { AllPages } from './pages/allPages.page';
import { USER } from './credentials';
import { userLoginResponse } from './typings/user';


const test = base.extend<{app: AllPages}>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
  },

});
const loggedInUser = test.extend<{app: AllPages;}>({
  app: async ({ page, app, request }, use) => {
    const response = await request.post(`https://api.practicesoftwaretesting.com/users/login`, {
    data: {
      email: USER.email,
      password: USER.password,
    }
  });
  expect(response.ok()).toBeTruthy();
  const responsBody = await response.json() as userLoginResponse;

  await page.goto('/', {waitUntil: 'commit'});

  await page.evaluate((token) => {
  return window.localStorage.setItem('auth-token', token);
}, responsBody.access_token);

  await page.goto('/', { waitUntil: 'load' });

  await use(app);
  },
  
});

export {test, expect, loggedInUser};