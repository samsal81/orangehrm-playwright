import { test } from '../../src/fixtures/test';

test.describe('Buzz', () => {
  test('loads the Buzz feed with a post composer @smoke', async ({
    authenticatedPage,
    buzzPage,
  }) => {
    void authenticatedPage;
    await buzzPage.goto();
    await buzzPage.expectLoaded();
  });
});
