import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/**
 * Recruitment module. Landing is the Candidates list, with a Vacancies tab
 * and an Add-Candidate form.
 */
export class RecruitmentPage extends BasePage {
  protected readonly path = routes.recruitment;

  readonly addButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = this.button('Add');
    this.firstName = page.locator('input[name="firstName"]');
    this.lastName = page.locator('input[name="lastName"]');
  }

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('recruitment/viewCandidates');
    await expect(this.heading).toHaveText('Recruitment');
    await expect(this.recordsBanner).toContainText('Records Found');
  }

  async openVacancies(): Promise<void> {
    await this.clickTopNav('Vacancies');
  }

  async openAddCandidateForm(): Promise<void> {
    await this.addButton.click();
    await this.expectToContainURL('recruitment/addCandidate');
    await expect(this.firstName).toBeVisible();
  }

  async saveCandidateForm(): Promise<void> {
    await this.button('Save').click();
  }
}
