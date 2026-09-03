import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/**
 * Maintenance module. Entering it is gated by an "Administrator Access"
 * password re-confirmation screen, which is what we assert here.
 */
export class MaintenancePage extends BasePage {
  protected readonly path = routes.maintenance;

  readonly accessPassword: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accessPassword = page.locator('input[type="password"]');
    this.confirmButton = this.button('Confirm');
  }

  async expectAccessGate(): Promise<void> {
    await expect(this.page.getByText('Administrator Access', { exact: true })).toBeVisible();
    await expect(this.accessPassword).toBeVisible();
  }
}
