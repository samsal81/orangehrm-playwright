import { test, expect } from '../../src/fixtures/test';

test.describe('Admin › System Users', () => {
  // `authenticatedPage` establishes the admin session; then open the module.
  test.beforeEach(async ({ authenticatedPage, adminPage }) => {
    void authenticatedPage;
    await adminPage.goto();
    await adminPage.expectLoaded();
  });

  test('lists existing system users @smoke', async ({ adminPage }) => {
    await expect(adminPage.recordsBanner).toContainText('Records Found');
    await expect(adminPage.tableRows.first()).toBeVisible();
  });

  test('finds the seeded Admin account by username', async ({ adminPage }) => {
    await adminPage.searchByUsername('Admin');
    await expect(adminPage.recordsBanner).toHaveText(/\(1\) Record Found/);
    await expect(adminPage.tableRows.first()).toContainText('Admin');
  });

  test('returns no rows for an unknown username', async ({ adminPage }) => {
    await adminPage.searchByUsername('definitely-not-a-real-user');
    await expect(adminPage.tableRows).toHaveCount(0);
  });

  test('filters users by Enabled status', async ({ adminPage }) => {
    await adminPage.filterByStatus('Enabled');
    await expect(adminPage.recordsBanner).toContainText(/Record/);
  });

  test('opens the Add-user form and enforces required fields', async ({ adminPage }) => {
    await adminPage.openAddUserForm();
    await expect(adminPage.page).toHaveURL(new RegExp('admin/saveSystemUser'));
    await adminPage.page.getByRole('button', { name: 'Save' }).click();
    await expect(
      adminPage.page.locator('.oxd-input-field-error-message').first(),
    ).toBeVisible();
  });
});
