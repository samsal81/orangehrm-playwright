import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Shared behavior for all page objects. Concrete pages declare a `path`
 * (relative to baseURL) and reuse the common navigation/wait helpers.
 */
export abstract class BasePage {
  protected abstract readonly path: string;

  constructor(public readonly page: Page) {}

  /** Navigate to this page's path (resolved against config baseURL). */
  async goto(): Promise<void> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
  }

  /** The OrangeHRM global toast/alert message, when one is shown. */
  get toast(): Locator {
    return this.page.locator('.oxd-toast');
  }

  async expectToContainURL(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(escapeRegExp(fragment)));
  }

  async waitForSpinnerToClear(): Promise<void> {
    const spinner = this.page.locator('.oxd-loading-spinner');
    await spinner.waitFor({ state: 'detached', timeout: 15_000 }).catch(() => {
      /* spinner may never appear for fast responses — that's fine */
    });
  }

  /* ----------------------------------------------------------------------
   * OrangeHRM "OXD" design-system helpers — shared by every module page.
   * -------------------------------------------------------------------- */

  /**
   * Primary page heading in the top breadcrumb bar (e.g. "Admin", "PIM").
   * Some modules render a secondary breadcrumb h6 (e.g. "User Management"),
   * so we deliberately target the first.
   */
  get heading(): Locator {
    return this.page.locator('.oxd-topbar-header-breadcrumb h6').first();
  }

  /** A text/password input located by its field label inside an OXD group. */
  protected inputByLabel(label: string): Locator {
    return this.page
      .locator('.oxd-input-group', {
        has: this.page.locator('label', { hasText: new RegExp(`^${escapeRegExp(label)}`) }),
      })
      .locator('input');
  }

  /** Pick an option from an OXD <select>-style dropdown by its field label. */
  protected async selectByLabel(label: string, option: string): Promise<void> {
    await this.page
      .locator('.oxd-input-group', {
        has: this.page.locator('label', { hasText: new RegExp(`^${escapeRegExp(label)}`) }),
      })
      .locator('.oxd-select-text')
      .click();
    await this.page
      .getByRole('option', { name: option, exact: true })
      .click();
  }

  /**
   * Click an OXD button by its visible label (e.g. "Search", "Add").
   * Non-exact: OXD buttons render with surrounding whitespace/icons, so an
   * exact accessible-name match is unreliable.
   */
  protected button(name: string): Locator {
    return this.page.getByRole('button', { name });
  }

  /** Rows of the primary OXD data table on the page. */
  get tableRows(): Locator {
    return this.page.locator('.oxd-table-card');
  }

  /** Top sub-navigation tabs (e.g. Leave's "Apply", "Leave List"). */
  get topNavTabs(): Locator {
    return this.page.locator('.oxd-topbar-body-nav-tab-item');
  }

  /** Click a top sub-navigation tab by its visible label. */
  protected async clickTopNav(label: string): Promise<void> {
    await this.topNavTabs.filter({ hasText: label }).first().click();
    await this.waitForSpinnerToClear();
  }

  /** The "(N) Record(s) Found" banner above a results table (a Locator, so
   *  assertions on it auto-retry through OrangeHRM's async table refresh). */
  get recordsBanner(): Locator {
    return this.page.locator('.orangehrm-horizontal-padding span.oxd-text').first();
  }

  /** Numeric record count parsed from the banner (point-in-time read). */
  async recordCount(): Promise<number> {
    const text = await this.recordsBanner.textContent();
    const match = text?.match(/\((\d+)\)/);
    return match ? Number(match[1]) : 0;
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
