import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/**
 * The landing page after a successful login. Also exposes the top bar
 * user dropdown used for logout, and the left sidebar navigation.
 */
export class DashboardPage extends BasePage {
  protected readonly path = routes.dashboard;

  readonly header: Locator;
  readonly userDropdown: Locator;
  readonly sidebarSearch: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.sidebarSearch = page.getByPlaceholder('Search');
  }

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL(routes.dashboard);
    await expect(this.header).toHaveText('Dashboard');
  }

  /** Click a left-sidebar menu item by its visible label (e.g. "PIM"). */
  async navigateTo(menuItem: string): Promise<void> {
    await this.page
      .locator('.oxd-main-menu')
      .getByRole('link', { name: menuItem, exact: true })
      .click();
    await this.waitForSpinnerToClear();
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
  }
}
