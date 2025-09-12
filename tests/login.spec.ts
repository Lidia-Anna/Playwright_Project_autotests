import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { USER } from '../credentials';

test('Verify login with valid credentials @smoke', async ({ page }) => {
  await test.step('Open Login page and login as a user', async () => {
    const loginPage = new LoginPage(page);
    await page.goto('/auth/login');
    await loginPage.performLogin(USER.email, USER.password);
    await expect(page).toHaveURL('/account');
    });

  await test.step('Verify that user is logged in', async () => {
    const accountPage = new AccountPage(page);
    await expect(accountPage.pageTitle).toContainText('My account');
    await expect(accountPage.header.navMenu).toContainText(USER.name);
  });
});