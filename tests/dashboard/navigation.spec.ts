import { test, expect } from '../../src/fixtures/test';

/**
 * Smoke-level navigation through the primary left-sidebar modules.
 * Uses the `authenticatedPage` fixture so each test starts logged in.
 */
const modules: Array<{ menu: string; urlFragment: string }> = [
  { menu: 'Admin', urlFragment: 'admin/viewSystemUsers' },
  { menu: 'PIM', urlFragment: 'pim/viewEmployeeList' },
  { menu: 'Leave', urlFragment: 'leave/viewLeaveList' },
  { menu: 'Recruitment', urlFragment: 'recruitment/viewCandidates' },
  { menu: 'My Info', urlFragment: 'pim/viewPersonalDetails' },
];

test.describe('Dashboard › Sidebar navigation', () => {
  for (const { menu, urlFragment } of modules) {
    test(`navigates to the ${menu} module`, async ({ authenticatedPage, page }) => {
      await authenticatedPage.navigateTo(menu);
      await expect(page).toHaveURL(new RegExp(urlFragment));
    });
  }

  test('renders the dashboard header and user dropdown @smoke', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.header).toHaveText('Dashboard');
    await expect(authenticatedPage.userDropdown).toBeVisible();
  });
});
