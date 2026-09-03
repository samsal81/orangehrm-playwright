import { test, expect } from '../../src/fixtures/test';

test.describe('Directory', () => {
  test('lists directory entries @smoke', async ({ authenticatedPage, directoryPage }) => {
    void authenticatedPage;
    await directoryPage.goto();
    await directoryPage.expectLoaded();
    await expect(directoryPage.recordsBanner).toContainText('Records Found');
    await expect(directoryPage.searchButton).toBeVisible();
  });
});
