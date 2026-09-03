import { test, expect } from '../../src/fixtures/test';

test.describe('Claim', () => {
  test.beforeEach(async ({ authenticatedPage, claimPage }) => {
    void authenticatedPage;
    await claimPage.goto();
    await claimPage.expectLoaded();
  });

  test('loads the Claim module with its sub-navigation @smoke', async ({ claimPage }) => {
    await expect(claimPage.topNavTabs.filter({ hasText: 'Assign Claim' })).toBeVisible();
  });

  test('navigates to Submit Claim', async ({ claimPage, page }) => {
    await claimPage.openSubmitClaim();
    await expect(page).toHaveURL(new RegExp('claim/submitClaim'));
  });
});
