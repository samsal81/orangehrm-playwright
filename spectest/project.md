# Test Project Context

## Purpose
Spec-driven, end-to-end Playwright test suite for the public
[OrangeHRM demo](https://opensource-demo.orangehrmlive.com). It validates the core
HRM modules (Auth, Admin, PIM, Leave, Time, Recruitment, My Info, Performance,
Directory, Maintenance, Claim, Buzz) through the browser using the Page Object Model.

## Tech Stack
- Playwright Test (`@playwright/test` ^1.50)
- TypeScript ^5.7 (ESM — `"type": "module"`)
- Node.js (>= 20.19)
- dotenv for environment configuration
- Reporters: `list`, `html` (→ `playwright-report/`), `junit` (→ `test-results/junit.xml`)
- Cross-browser projects: chromium, firefox, webkit

## Test Project Conventions

### Test Code Style
- One spec file per module, grouped by directory under `tests/<module>/` (e.g.
  `tests/admin/system-users.spec.ts`).
- Specs import the **custom `test`/`expect`**, never `@playwright/test` directly:
  `import { test, expect } from '../../src/fixtures/test';`
- Wrap each file's tests in a `test.describe('Module › Feature', ...)` block.
- Tag fast, high-value checks with `@smoke` in the test title (run via `npm run test:smoke`).
- Specs stay declarative: no raw selectors or navigation in the spec body — that
  lives in page objects. A spec reads as intent + assertions.
- Use Playwright web-first assertions on Locators (`toBeVisible`, `toHaveText`,
  `toContainText`, `toHaveCount`, `toHaveURL`) so they auto-retry through
  OrangeHRM's async table refreshes. Never use `page.waitForTimeout()`.

### Test Architecture Patterns
- **Page Object Model** in `src/pages/`. Every page extends `BasePage`
  (`src/pages/BasePage.ts`), declares a relative `path`, and reuses shared OXD
  design-system helpers: `inputByLabel`, `selectByLabel`, `button`, `clickTopNav`,
  `tableRows`, `recordsBanner`/`recordCount`, `heading`, `toast`,
  `waitForSpinnerToClear`.
- **Custom fixtures** in `src/fixtures/test.ts` (`base.extend`):
  - One fixture per page object (`adminPage`, `pimPage`, `leavePage`, …) so specs
    receive ready-made page objects via dependency injection.
  - `authenticatedPage` logs in as the seeded admin once for any test/hook that
    requests it, then yields a loaded `DashboardPage`. Use it in `beforeEach` for
    suites that need an authenticated session (reference it via `void authenticatedPage`).
- **Config & data are centralized**:
  - `src/config/env.ts` — typed env (`baseURL`, admin creds, `headless`, `isCI`)
    with demo-site defaults, plus a `routes` map of app path fragments.
  - `src/data/users.ts` — `adminUser` credentials and a table-driven `invalidLogins`
    array for negative login cases.
- **Resilient locators** — prefer role / placeholder / text / labeled-input helpers
  over OrangeHRM's generated `.oxd-*` class names where practical. When `.oxd-*`
  classes are unavoidable, isolate them inside a `BasePage` helper, not in specs.

### Testing Strategy
- Framework: Playwright (POM + custom fixtures)
- Spec format: SpecTest (human-readable test specs → plan → generate → heal)
- Generation: prefer reusing existing page objects & fixtures over inlining
  selectors; if a new module needs a page object, add it under `src/pages/` and
  expose it as a fixture in `src/fixtures/test.ts`.
- Maintenance: use `spectest heal` for flaky/failing tests; the demo site has
  variable latency (config retries once locally, twice on CI).
- Coverage: critical user flows + validation/negative paths and module navigation.

### Git Workflow
This project is not currently a git repository. If versioned later: feature
branches per change-id (kebab-case, verb-led, e.g. `add-leave-apply-tests`),
keeping SpecTest `changes/` proposals reviewed before implementation.

## Domain Context
OrangeHRM is an open-source HRM application. Key concepts: a left **sidebar** of
modules; each module page shows a **breadcrumb heading**, a search/filter area, and
an **OXD data table** with a "(N) Record(s) Found" banner. Forms use the OXD design
system (labeled input groups, custom `.oxd-select` dropdowns, toast alerts on save).
The seeded admin account is `Admin` / `admin123`.

## Important Constraints
- **Non-destructive by policy.** The target is a *shared public demo*. Add/Save
  flows must assert validation and then **cancel** — never persist test data
  (e.g. don't actually create users/employees/candidates). See README "Module
  coverage" note.
- Demo site has variable latency and occasional downtime; rely on web-first
  assertions and the configured retries rather than fixed waits.
- No real PII or secrets; credentials default to the public demo values and can
  be overridden via `.env` (`BASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `HEADLESS`).

## Application Under Test
- Base URL: `https://opensource-demo.orangehrmlive.com` (overridable via `BASE_URL`).
- Route fragments are defined in `src/config/env.ts` (`routes`), e.g.
  `auth/login`, `dashboard/index`, `admin/viewSystemUsers`, `pim/viewEmployeeList`,
  `leave/viewLeaveList`, etc.
- No backend mocking — tests run against the live demo instance over HTTPS
  (`ignoreHTTPSErrors: true`). Default viewport 1366×768.
