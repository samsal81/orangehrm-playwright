import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/**
 * My Info › Personal Details. The "My Info" menu resolves into the PIM
 * module for the logged-in employee, so the breadcrumb heading reads "PIM".
 */
export class MyInfoPage extends BasePage {
  protected readonly path = routes.myInfo;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly sectionTabs: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('input[name="firstName"]');
    this.lastName = page.locator('input[name="lastName"]');
    this.sectionTabs = page.locator('.orangehrm-tabs-wrapper a, .orangehrm-edit-employee-navigation a');
  }

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('pim/viewPersonalDetails');
    // "Personal Details" appears as both a nav tab and the section header.
    await expect(this.page.getByText('Personal Details', { exact: true }).first()).toBeVisible();
    await expect(this.firstName).toBeVisible();
  }

  /** The employee's first name as currently populated in the form. */
  async firstNameValue(): Promise<string> {
    return this.firstName.inputValue();
  }
}
