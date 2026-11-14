# sdet-platform

A single, layered test-automation portfolio built with Playwright + TypeScript. Each layer (UI, API,
contract, CI/Docker, performance, mobile, security, AI/LLM evals) is added incrementally on top of
the same foundation, against the same system under test.

## System under test

[Practice Software Testing ("Toolshop")](https://practicesoftwaretesting.com), a demo e-commerce
app built for testers.

| Surface | URL                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------- |
| UI      | https://practicesoftwaretesting.com                                                                            |
| API     | https://api.practicesoftwaretesting.com ([Swagger](https://api.practicesoftwaretesting.com/api/documentation)) |
| Source  | https://github.com/testsmith-io/practice-software-testing                                                      |

Seeded users (password `welcome01`): `admin@`, `customer@`, `customer2@practicesoftwaretesting.com`.

> The public demo throttles datacenter IPs, so CI currently runs static checks only. Browser and API
> tests will run in CI once the SUT is containerised locally.

## Getting started

```bash
nvm use                       # Node version pinned in .nvmrc
npm ci
npx playwright install chromium
cp .env.example .env          # optional: override BASE_URL / API_URL
npm run test:smoke
```

## Project layout

```
tests/
  e2e/        UI specs
  api/        API specs
src/
  pages/      Page objects (no assertions)
  clients/    API clients
  data/       Test data and factories
```

## Scripts

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm test`             | Run all Playwright tests                      |
| `npm run test:smoke`   | Run only tests tagged `@smoke`                |
| `npm run test:ui`      | Open Playwright UI mode                       |
| `npm run typecheck`    | Type-check the whole project (`tsc --noEmit`) |
| `npm run lint`         | Lint with ESLint (type-aware)                 |
| `npm run lint:fix`     | Lint and auto-fix                             |
| `npm run format`       | Format with Prettier                          |
| `npm run format:check` | Verify formatting (used in CI)                |
| `npm run report`       | Open the last HTML report                     |

## Design decisions

- **Why Toolshop:** it is built for testers, with a real UI, a documented REST API, seeded users,
  stable `data-test` hooks and a Docker setup, so every layer can target one realistic app.
- **Why TypeScript + a typecheck gate:** Playwright transpiles TS without type-checking, so type
  errors would otherwise only surface at runtime. `tsc --noEmit` in CI catches them before any test
  runs.
- **Why `tests/` vs `src/`:** specs describe _behaviour_; `src/` holds reusable _mechanics_ (page
  objects, clients, data). Page objects never assert, so failures always point at the spec that
  owns the expectation.
- **Why lint rules that catch test bugs:** a missing `await` on an action or `expect` makes a test
  pass without checking anything. `no-floating-promises` and `eslint-plugin-playwright` turn those
  silent false-greens into build failures.

## Roadmap

- UI: page objects and core user journeys
- API: typed clients, schema validation, auth fixtures
- Contract: consumer-driven contract tests
- CI/Docker: local SUT in Docker, full test runs in GitHub Actions
- Performance: load and latency checks
- Mobile: device emulation and mobile flows
- Security: auth, access-control and header checks
- AI/LLM evals: evaluation harness for LLM-backed features
