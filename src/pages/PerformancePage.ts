import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/** Performance module. Landing is Manage Reviews, with tracker tabs. */
export class PerformancePage extends BasePage {
  protected readonly path = routes.performance;

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('performance/');
    await expect(this.heading).toHaveText('Performance');
    await expect(this.topNavTabs.filter({ hasText: 'Manage Reviews' })).toBeVisible();
  }

  async openMyTrackers(): Promise<void> {
    await this.clickTopNav('My Trackers');
  }
}
