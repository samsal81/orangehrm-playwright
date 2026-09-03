import { test, expect } from '../../src/fixtures/test';

test.describe('Time', () => {
  test('loads the Time module with Timesheets and Attendance tabs @smoke', async ({
    authenticatedPage,
    timePage,
  }) => {
    void authenticatedPage;
    await timePage.goto();
    await timePage.expectLoaded();
    await expect(timePage.topNavTabs.filter({ hasText: 'Timesheets' })).toBeVisible();
  });
});
