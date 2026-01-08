# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `app/`; `app/layout.tsx` wires the Geist fonts, analytics, error boundary, and Suspense shell.
- Feature logic is split across `components/` (React Flow nodes, panels), `hooks/` (Zustand stores, debounced autosave), `lib/` (workflow validation, execution, code generation), and `scripts/` (maintenance utilities).
- Public/static assets sit in `public/`; Tailwind config plus global layers live under `styles/`.
- The `docs/` tree is dual-purpose: public architecture & guides sync to GitHub, while private strategic files (`docs/repositioning-proposal/**`) stay local per `CLAUDE.md`; never expose those in PRs.

## Build, Test, and Development Commands
- `pnpm dev` boots the SPA on `localhost:3000` with React Flow debugging aids enabled.
- `pnpm build` performs the production Next.js build (serverless bundle + static assets) used by Vercel edge functions.
- `pnpm start` runs the compiled app to reproduce Vercel conditions locally.
- `pnpm lint` executes `next lint` with TypeScript + security rules; run before every commit.

## Coding Style & Naming Conventions
- Enforce TypeScript strictness, explicit return types on exported helpers, and React functional components with hooks; memoize node components to preserve React Flow performance.
- Tailwind drives styling; sort utility classes by layout → spacing → color → state, and abstract reusable variants via `clsx`/`cva`.
- Follow kebab-case for route folders (`app/privacy-impact/page.tsx`), PascalCase for components, camelCase for vars, and snake_case for localStorage keys that mirror persisted schema (`ai-agent-api-keys`).
- Editors should use 2-space indentation and save-on-format with Prettier (Next.js default config is sufficient).

## Testing Guidelines
- UI and workflow tests should mock React Flow and Zustand stores; place files beside the code under test (`components/workflow-sidebar.test.tsx`).
- Cover new node types, validation helpers (`lib/validation.ts`), and execution paths (`/api/execute-workflow`) with unit or integration tests; snapshot complex panels to detect accidental regressions.
- Always manually validate localStorage flows (autosave, BYOK, demo cache) in the dev server, since these are security-critical and not yet fully automated.

## Commit & Pull Request Guidelines
- Use conventional commits that highlight security or workflow impact (`feat: add SOC2 evidence template`, `fix: enforce SSRF hostname allowlist`).
- PR descriptions must explain scope, affected files, and security/privacy implications; attach screenshots or recordings when the UI changes.
- Link related docs in `/docs/architecture/**` or `/docs/guides/**` if they change, and call out whether private strategy docs were touched (never attach their contents).
- Confirm `pnpm lint` plus any relevant tests pass; note manual validation steps (BYOK, demo mode, export flow) in the PR checklist.

## Security & Configuration Tips
- Respect the five-layer security model described in `CLAUDE.md`: browser hardening, TLS defaults, edge rate limiting, serverless execution safeguards, and external API hygiene; when modifying one layer, assess ripple effects on the others.
- BYOK keys must never leave the client; mock them in docs/demos and ensure new code paths keep storage in `localStorage` only.
- Update validation and code-generation utilities whenever a node schema or provider changes to prevent execution-time surprises.
- Watch browser storage limits (~10 MB); recycle autosaves (keep ≤5), compress large payloads, and document any new persistence strategy for reviewers.
