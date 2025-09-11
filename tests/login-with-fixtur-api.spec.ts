import { USER } from '../credentials';
import { expect, loggedInUser } from '../fixtures';

loggedInUser('Verify login with valid credentials with API @smoke', async ({ app }) => {
    await app.page.goto('/account');
    await expect(app.accountPage.pageTitle).toContainText('My account');
    await expect(app.accountPage.header.navMenu).toContainText(USER.name);
});