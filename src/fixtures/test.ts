import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { PimPage } from '../pages/PimPage';
import { LeavePage } from '../pages/LeavePage';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import { TimePage } from '../pages/TimePage';
import { PerformancePage } from '../pages/PerformancePage';
import { DirectoryPage } from '../pages/DirectoryPage';
import { MaintenancePage } from '../pages/MaintenancePage';
import { ClaimPage } from '../pages/ClaimPage';
import { BuzzPage } from '../pages/BuzzPage';
import { adminUser } from '../data/users';

/**
 * Custom fixtures extend Playwright's base `test` so specs receive ready-made
 * page objects via dependency injection, plus an `authenticatedPage` fixture
 * that performs login once per test that needs an authenticated session.
 */
interface Fixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
  pimPage: PimPage;
  leavePage: LeavePage;
  recruitmentPage: RecruitmentPage;
  myInfoPage: MyInfoPage;
  timePage: TimePage;
  performancePage: PerformancePage;
  directoryPage: DirectoryPage;
  maintenancePage: MaintenancePage;
  claimPage: ClaimPage;
  buzzPage: BuzzPage;
  /** A DashboardPage already logged in as the seeded admin user. */
  authenticatedPage: DashboardPage;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },

  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },

  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  },

  recruitmentPage: async ({ page }, use) => {
    await use(new RecruitmentPage(page));
  },

  myInfoPage: async ({ page }, use) => {
    await use(new MyInfoPage(page));
  },

  timePage: async ({ page }, use) => {
    await use(new TimePage(page));
  },

  performancePage: async ({ page }, use) => {
    await use(new PerformancePage(page));
  },

  directoryPage: async ({ page }, use) => {
    await use(new DirectoryPage(page));
  },

  maintenancePage: async ({ page }, use) => {
    await use(new MaintenancePage(page));
  },

  claimPage: async ({ page }, use) => {
    await use(new ClaimPage(page));
  },

  buzzPage: async ({ page }, use) => {
    await use(new BuzzPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(adminUser.username, adminUser.password);
    await dashboard.expectLoaded();
    await use(dashboard);
  },
});

export { expect } from '@playwright/test';
