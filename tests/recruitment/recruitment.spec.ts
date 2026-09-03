import { test, expect } from '../../src/fixtures/test';

test.describe('Recruitment', () => {
  test.beforeEach(async ({ authenticatedPage, recruitmentPage }) => {
    void authenticatedPage;
    await recruitmentPage.goto();
    await recruitmentPage.expectLoaded();
  });

  test('lists candidates @smoke', async ({ recruitmentPage }) => {
    await expect(recruitmentPage.recordsBanner).toContainText('Records Found');
    await expect(recruitmentPage.tableRows.first()).toBeVisible();
  });

  test('navigates to the Vacancies tab', async ({ recruitmentPage, page }) => {
    await recruitmentPage.openVacancies();
    await expect(page).toHaveURL(new RegExp('recruitment/viewJobVacancy'));
  });

  test('opens the Add-Candidate form and enforces required name fields', async ({
    recruitmentPage,
  }) => {
    await recruitmentPage.openAddCandidateForm();
    await recruitmentPage.saveCandidateForm();
    const errors = recruitmentPage.page.locator('.oxd-input-field-error-message', {
      hasText: 'Required',
    });
    await expect(errors.first()).toBeVisible();
    expect(await errors.count()).toBeGreaterThanOrEqual(2);
    await expect(recruitmentPage.page).toHaveURL(new RegExp('recruitment/addCandidate'));
  });
});
