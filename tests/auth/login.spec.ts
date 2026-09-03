import { test, expect } from '../../src/fixtures/test';
import { adminUser, invalidLogins } from '../../src/data/users';

test.describe('Authentication › Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectLoaded();
  });

  test('logs in with valid admin credentials @smoke', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(adminUser.username, adminUser.password);
    await dashboardPage.expectLoaded();
  });

  for (const data of invalidLogins) {
    test(`rejects login: ${data.name}`, async ({ loginPage }) => {
      await loginPage.login(data.username, data.password);
      await loginPage.expectInvalidCredentials();
    });
  }

  test('shows required-field validation when submitting empty form', async ({ loginPage }) => {
    await loginPage.submitButton.click();
    await expect(loginPage.fieldError('Username')).toHaveText('Required');
    await expect(loginPage.fieldError('Password')).toHaveText('Required');
  });

  test('exposes a forgot-password link', async ({ loginPage }) => {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });
});
