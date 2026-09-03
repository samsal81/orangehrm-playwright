import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/** Time module. Landing is Employee Timesheets, with Attendance/Reports tabs. */
export class TimePage extends BasePage {
  protected readonly path = routes.time;

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('time/');
    await expect(this.heading).toHaveText('Time');
    await expect(this.topNavTabs.filter({ hasText: 'Attendance' })).toBeVisible();
  }
}
