import { test } from '../../src/fixtures/test';

test.describe('Maintenance', () => {
  test('gates entry behind an Administrator Access password prompt @smoke', async ({
    authenticatedPage,
    maintenancePage,
  }) => {
    void authenticatedPage;
    await maintenancePage.goto();
    await maintenancePage.expectAccessGate();
  });
});
