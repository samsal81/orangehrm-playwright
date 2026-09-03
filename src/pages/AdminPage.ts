import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/**
 * Admin › User Management › System Users.
 * Covers the search filter, results table, and the Add-user form entry point.
 */
export class AdminPage extends BasePage {
  protected readonly path = routes.admin;

  readonly addButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = this.button('Add');
    this.searchButton = this.button('Search');
    this.resetButton = this.button('Reset');
  }

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('admin/viewSystemUsers');
    await expect(this.heading).toHaveText('Admin');
    await expect(this.searchButton).toBeVisible();
  }

  /** Search the system-user list by exact username. */
  async searchByUsername(username: string): Promise<void> {
    await this.inputByLabel('Username').fill(username);
    await this.searchButton.click();
    await this.waitForSpinnerToClear();
  }

  /** Filter the system-user list by status ("Enabled" / "Disabled"). */
  async filterByStatus(status: 'Enabled' | 'Disabled'): Promise<void> {
    await this.selectByLabel('Status', status);
    await this.searchButton.click();
    await this.waitForSpinnerToClear();
  }

  async resetSearch(): Promise<void> {
    await this.resetButton.click();
    await this.waitForSpinnerToClear();
  }

  /** Open the Add-user form. */
  async openAddUserForm(): Promise<void> {
    await this.addButton.click();
    await this.waitForSpinnerToClear();
  }
}
