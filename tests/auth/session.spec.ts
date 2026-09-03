import { test, expect } from '../../src/fixtures/test';
import { routes } from '../../src/config/env';

test.describe('Authentication › Session', () => {
  test('logs out and returns to the login screen @smoke', async ({ authenticatedPage, page }) => {
    await authenticatedPage.logout();
    await expect(page).toHaveURL(new RegExp('auth/login'));
  });

  test('redirects unauthenticated users away from a protected page', async ({ page }) => {
    await page.goto(routes.pim, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(new RegExp('auth/login'));
  });
});
