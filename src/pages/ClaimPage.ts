import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/** Claim module. Landing is Assign Claim, with Submit/My/Employee Claims tabs. */
export class ClaimPage extends BasePage {
  protected readonly path = routes.claim;

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('claim/');
    await expect(this.heading).toHaveText('Claim');
    await expect(this.topNavTabs.filter({ hasText: 'Submit Claim' })).toBeVisible();
  }

  async openSubmitClaim(): Promise<void> {
    await this.clickTopNav('Submit Claim');
  }
}
