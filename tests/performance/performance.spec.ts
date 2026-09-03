import { test, expect } from '../../src/fixtures/test';

test.describe('Performance', () => {
  test.beforeEach(async ({ authenticatedPage, performancePage }) => {
    void authenticatedPage;
    await performancePage.goto();
    await performancePage.expectLoaded();
  });

  test('loads the Performance module with Manage Reviews @smoke', async ({ performancePage }) => {
    await expect(performancePage.topNavTabs.filter({ hasText: 'Manage Reviews' })).toBeVisible();
  });

  test('navigates to My Trackers', async ({ performancePage, page }) => {
    await performancePage.openMyTrackers();
    await expect(page).toHaveURL(new RegExp('performance/viewMyPerformanceTrackerList'));
  });
});
