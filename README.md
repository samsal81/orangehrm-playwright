# OrangeHRM — Playwright Test Framework

A spec-driven, TypeScript end-to-end testing framework for the
[OrangeHRM demo](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login),
built on [Playwright Test](https://playwright.dev) using the Page Object Model.

## Layout

```
.
├── playwright.config.ts        # Runner config: projects, reporters, timeouts, retries
├── src/
│   ├── config/env.ts           # Typed env + route constants (.env aware)
│   ├── data/users.ts           # Test data (credentials, negative cases)
│   ├── fixtures/test.ts        # Custom fixtures: page objects + auth session
│   └── pages/                  # Page Object Model (one class per module)
│       ├── BasePage.ts         # Shared OXD design-system helpers (dropdowns,
│       │                       #   labeled inputs, table, record banner, top-nav)
│       ├── LoginPage.ts        DashboardPage.ts
│       ├── AdminPage.ts        PimPage.ts        LeavePage.ts
│       ├── TimePage.ts         RecruitmentPage.ts MyInfoPage.ts
│       ├── PerformancePage.ts  DirectoryPage.ts  MaintenancePage.ts
│       └── ClaimPage.ts        BuzzPage.ts
└── tests/                      # Specs, grouped by module
    ├── auth/                   # login, session
    ├── dashboard/              # sidebar navigation
    ├── admin/  pim/  leave/  time/  recruitment/
    └── my-info/ performance/ directory/ maintenance/ claim/ buzz/
```

## Module coverage

| Module       | Key checks                                                        |
|--------------|-------------------------------------------------------------------|
| Auth         | valid/invalid login (data-driven), empty-form validation, logout, protected-route redirect |
| Admin        | user list, search by username, no-results, status filter, Add-user required validation |
| PIM          | employee list, no-results by id, Add-Employee required validation, cancel |
| Leave        | sub-nav tabs, Apply, Assign Leave                                  |
| Time         | Timesheets + Attendance tabs                                       |
| Recruitment  | candidate list, Vacancies tab, Add-Candidate required validation   |
| My Info      | personal details loads with populated name                        |
| Performance  | Manage Reviews, My Trackers                                        |
| Directory    | searchable directory listing                                      |
| Maintenance  | Administrator-Access password gate                                |
| Claim        | sub-nav tabs, Submit Claim                                         |
| Buzz         | feed + post composer                                              |

> Add/Save flows are intentionally **non-destructive** — they assert validation
> and cancel, so the shared public demo isn't polluted with test data.

## Setup

```bash
npm install
npx playwright install        # download browser binaries
cp .env.example .env          # optional — defaults already target the demo
```

## Running

```bash
npm test                  # all projects, headless
npm run test:headed       # headed
npm run test:ui           # Playwright UI mode (watch/inspect)
npm run test:chromium     # single browser
npm run test:smoke        # only @smoke-tagged tests
npm run report            # open the last HTML report
npm run typecheck         # tsc --noEmit
npm run codegen           # record new steps against the demo site
```

## Design notes

- **Page Object Model** — UI structure lives in `src/pages`; specs stay
  readable and declarative.
- **Custom fixtures** (`src/fixtures/test.ts`) inject page objects and provide
  an `authenticatedPage` fixture that logs in once per test that needs it.
- **Resilient locators** — prefer role/placeholder/text over OrangeHRM's
  generated `.oxd-*` class names where practical.
- **Data-driven specs** — negative login cases and module navigation are
  table-driven, so adding a case is a one-line change.

## Using the Playwright MCP server (optional)

This repo is a standard Playwright project, so you can let an agent author and
run tests through the official Playwright MCP server. Add it to your MCP client
config:

```jsonc
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

With it connected, the agent can drive the live site (navigate, snapshot the
accessibility tree, click, fill) to discover selectors and generate new specs
in `tests/`, then run them with `npm test`.
