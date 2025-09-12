import { USER } from '../credentials';
import { expect, loggedInUser, test } from '../fixtures';

loggedInUser('Verify login with valid credentials with API @smoke', async ({ app }) => {
    await test.step('Open Account page', async () => {
        await app.page.goto('/account');
    });

    await test.step('Verify that user is logged in', async () => {
        await expect(app.accountPage.pageTitle).toContainText('My account');
        await expect(app.accountPage.header.navMenu).toContainText(USER.name);
    });
});