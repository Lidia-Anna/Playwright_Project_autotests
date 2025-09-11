import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { USER } from '../credentials';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/auth/login');
  await loginPage.performLogin(USER.email, USER.password);
  await expect(page).toHaveURL('/account');
  const accountPage = new AccountPage(page);
  await expect(accountPage.pageTitle).toContainText('My account');
  await expect(accountPage.header.navMenu).toContainText(USER.name);
});