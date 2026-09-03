import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/**
 * PIM › Employee List. Covers the employee search/list and the
 * Add-Employee form entry point (non-destructive: open + validate + cancel).
 */
export class PimPage extends BasePage {
  protected readonly path = routes.pim;

  readonly addButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  // Add-Employee form fields (stable `name` attributes).
  readonly firstName: Locator;
  readonly lastName: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = this.button('Add');
    this.searchButton = this.button('Search');
    this.resetButton = this.button('Reset');
    this.firstName = page.locator('input[name="firstName"]');
    this.lastName = page.locator('input[name="lastName"]');
  }

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('pim/viewEmployeeList');
    await expect(this.heading).toHaveText('PIM');
    // The employee table loads asynchronously — wait for the count banner.
    await expect(this.recordsBanner).toContainText('Records Found');
  }

  async searchByEmployeeId(id: string): Promise<void> {
    await this.inputByLabel('Employee Id').fill(id);
    await this.searchButton.click();
    await this.waitForSpinnerToClear();
  }

  /** Open the Add-Employee form and wait for it to be interactive. */
  async openAddEmployeeForm(): Promise<void> {
    await this.addButton.click();
    await this.expectToContainURL('pim/addEmployee');
    await expect(this.firstName).toBeVisible();
  }

  async saveEmployeeForm(): Promise<void> {
    await this.button('Save').click();
  }

  async cancelEmployeeForm(): Promise<void> {
    await this.button('Cancel').click();
  }
}
