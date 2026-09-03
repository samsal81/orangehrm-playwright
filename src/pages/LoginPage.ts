import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { routes } from '../config/env';
import { BasePage } from './BasePage';

/**
 * The OrangeHRM authentication / login screen.
 * Locators favor accessible, user-facing attributes (name, role, placeholder)
 * so they stay resilient to the framework's generated class names.
 */
export class LoginPage extends BasePage {
  protected readonly path = routes.login;

  readonly username: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page.locator('.oxd-alert-content-text');
    this.forgotPasswordLink = page.getByText('Forgot your password?');
  }

  /** Fill credentials and submit. Does not assert the outcome. */
  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submitButton.click();
  }

  /** Per-field "Required" validation messages shown beneath inputs. */
  fieldError(field: 'Username' | 'Password'): Locator {
    return this.page
      .locator('.oxd-input-group', { has: this.page.getByPlaceholder(field) })
      .locator('.oxd-input-field-error-message');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.username).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectInvalidCredentials(): Promise<void> {
    await expect(this.errorAlert).toHaveText('Invalid credentials');
  }
}
