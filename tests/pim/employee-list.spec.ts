import { test, expect } from '../../src/fixtures/test';

test.describe('PIM › Employee List', () => {
  test.beforeEach(async ({ authenticatedPage, pimPage }) => {
    void authenticatedPage;
    await pimPage.goto();
    await pimPage.expectLoaded();
  });

  test('lists existing employees @smoke', async ({ pimPage }) => {
    await expect(pimPage.recordsBanner).toContainText('Records Found');
    await expect(pimPage.tableRows.first()).toBeVisible();
  });

  test('returns no rows for a non-existent employee id', async ({ pimPage }) => {
    await pimPage.searchByEmployeeId('99999999');
    await expect(pimPage.tableRows).toHaveCount(0);
  });

  test('opens the Add-Employee form and enforces required name fields', async ({ pimPage }) => {
    await pimPage.openAddEmployeeForm();
    await pimPage.saveEmployeeForm();
    await expect(
      pimPage.page.locator('.oxd-input-field-error-message', { hasText: 'Required' }),
    ).toHaveCount(2);
  });

  test('cancels the Add-Employee form and returns to the list', async ({ pimPage }) => {
    await pimPage.openAddEmployeeForm();
    await pimPage.cancelEmployeeForm();
    await expect(pimPage.page).toHaveURL(new RegExp('pim/viewEmployeeList'));
  });
});
