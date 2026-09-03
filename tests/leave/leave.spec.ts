import { test, expect } from '../../src/fixtures/test';

test.describe('Leave', () => {
  test.beforeEach(async ({ authenticatedPage, leavePage }) => {
    void authenticatedPage;
    await leavePage.goto();
    await leavePage.expectLoaded();
  });

  test('renders the Leave module with its sub-navigation @smoke', async ({ leavePage }) => {
    await expect(leavePage.topNavTabs.filter({ hasText: 'Apply' })).toBeVisible();
    await expect(leavePage.topNavTabs.filter({ hasText: 'Assign Leave' })).toBeVisible();
  });

  test('navigates to the Apply Leave page', async ({ leavePage, page }) => {
    await leavePage.openApply();
    await expect(page).toHaveURL(new RegExp('leave/applyLeave'));
  });

  test('navigates to the Assign Leave page', async ({ leavePage, page }) => {
    await leavePage.openAssignLeave();
    await expect(page).toHaveURL(new RegExp('leave/assignLeave'));
  });
});
