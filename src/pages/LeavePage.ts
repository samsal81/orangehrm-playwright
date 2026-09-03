import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/**
 * Leave module. Landing is the "Leave List" with top sub-navigation tabs
 * (Apply, My Leave, Entitlements, Reports, Configure, Leave List, Assign Leave).
 */
export class LeavePage extends BasePage {
  protected readonly path = routes.leave;

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('leave/viewLeaveList');
    await expect(this.heading).toHaveText('Leave');
    await expect(this.topNavTabs.filter({ hasText: 'Leave List' })).toBeVisible();
  }

  async openApply(): Promise<void> {
    await this.clickTopNav('Apply');
  }

  async openAssignLeave(): Promise<void> {
    await this.clickTopNav('Assign Leave');
  }
}
