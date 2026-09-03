import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/** Directory module — a searchable, paginated employee directory. */
export class DirectoryPage extends BasePage {
  protected readonly path = routes.directory;

  readonly searchButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchButton = this.button('Search');
    this.resetButton = this.button('Reset');
  }

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('directory/viewDirectory');
    await expect(this.heading).toHaveText('Directory');
    await expect(this.recordsBanner).toContainText('Records Found');
  }
}
