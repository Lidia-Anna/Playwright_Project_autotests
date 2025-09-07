import { expect } from '@playwright/test';
import { test } from '../fixtures';

test('Verify login with valid credentials with fixture', async ({ loggedInApp: app }) => {

  await expect(app.page).toHaveURL('/account');
  
  await expect(app.accountPage.pageTitle).toContainText('My account');
  await expect(app.accountPage.header.navMenu).toContainText('Jane Doe');
});