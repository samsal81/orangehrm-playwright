import { test, expect } from '../../src/fixtures/test';

test.describe('My Info › Personal Details', () => {
  test.beforeEach(async ({ authenticatedPage, myInfoPage }) => {
    void authenticatedPage;
    await myInfoPage.goto();
    await myInfoPage.expectLoaded();
  });

  test('loads the logged-in employee personal details with a populated name @smoke', async ({
    myInfoPage,
  }) => {
    // The name fields are hydrated asynchronously after the form renders.
    await expect(myInfoPage.firstName).toHaveValue(/\S/);
  });

  test('exposes the personal-details section heading', async ({ myInfoPage }) => {
    await expect(
      myInfoPage.page.getByText('Personal Details', { exact: true }).first(),
    ).toBeVisible();
  });
});
