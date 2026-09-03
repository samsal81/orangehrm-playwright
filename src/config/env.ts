import 'dotenv/config';

/**
 * Centralized, typed access to environment configuration.
 * Falls back to the public OrangeHRM demo defaults so the suite
 * runs out-of-the-box without a .env file.
 */
export const env = {
  baseURL: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  admin: {
    username: process.env.ADMIN_USERNAME ?? 'Admin',
    password: process.env.ADMIN_PASSWORD ?? 'admin123',
  },
  headless: (process.env.HEADLESS ?? 'true') !== 'false',
  isCI: !!process.env.CI,
} as const;

/** Application route fragments (relative to baseURL). */
export const routes = {
  login: '/web/index.php/auth/login',
  dashboard: '/web/index.php/dashboard/index',
  admin: '/web/index.php/admin/viewSystemUsers',
  pim: '/web/index.php/pim/viewEmployeeList',
  leave: '/web/index.php/leave/viewLeaveList',
  time: '/web/index.php/time/viewEmployeeTimesheet',
  recruitment: '/web/index.php/recruitment/viewCandidates',
  myInfo: '/web/index.php/pim/viewMyDetails',
  performance: '/web/index.php/performance/searchEvaluatePerformanceReview',
  directory: '/web/index.php/directory/viewDirectory',
  maintenance: '/web/index.php/maintenance/purgeEmployee',
  claim: '/web/index.php/claim/viewAssignClaim',
  buzz: '/web/index.php/buzz/viewBuzz',
} as const;
