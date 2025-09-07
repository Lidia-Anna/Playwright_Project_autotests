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

export const expect = base.expect;