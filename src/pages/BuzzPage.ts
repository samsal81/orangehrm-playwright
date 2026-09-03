import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/** Buzz module — the social news feed with a post-composer box. */
export class BuzzPage extends BasePage {
  protected readonly path = routes.buzz;

  readonly postInput: Locator;

  constructor(page: Page) {
    super(page);
    this.postInput = page.locator('.oxd-buzz-post-input, textarea').first();
  }

  async expectLoaded(): Promise<void> {
    await this.expectToContainURL('buzz/viewBuzz');
    await expect(this.heading).toHaveText('Buzz');
    await expect(this.postInput).toBeVisible();
  }
}
