# Continuous Integration

TopFlow runs CI via GitHub Actions, defined in `.github/workflows/ci.yml`.

## When it runs

- **push** to `master`, `main`, or `dev`
- **pull_request** targeting `master`, `main`, or `dev`

> Note: GitHub evaluates `pull_request` workflows from the **base branch**, so the
> workflow must exist on the branch you target (e.g. `dev`) for PR checks to run.

## Jobs

1. **Lint and Type Check** — `pnpm lint`, then `pnpm type-check` (blocking).
2. **Run Tests** — `pnpm test` (Jest); a coverage report is uploaded as an artifact.
3. **Build Application** — `pnpm build`, gated on the first two jobs passing.

All jobs run on Node 18 + pnpm 9 with a cached pnpm store.

## Why type-check is enforced as its own step

`next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `next build` does **not**
fail on TypeScript errors. The dedicated `pnpm type-check` step (`tsc --noEmit`) is therefore
the project's real type gate — keep it green.

## Run the same checks locally

```bash
pnpm install
pnpm lint
pnpm type-check
pnpm test
pnpm build
```
