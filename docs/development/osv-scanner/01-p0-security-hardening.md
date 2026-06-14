# W1 — Close the "5-Layer Defense" Integrity Gap (P0)

**Priority:** P0 (highest trust-per-effort) · **Effort:** L · **Depends on:** none
**Related:** `docs/architecture/architecture-overview.md`, `lib/security/validation-engine.ts`,
`lib/security/encryption.ts`, `lib/topflow-execution-engine.ts`,
`app/api/execute-workflow/route.ts`, `components/api-settings-dialog.tsx`, `lib/storage.ts`,
`next.config.mjs`

---

## Problem

`architecture-overview.md` advertises a **5-layer defense** (input sanitization, TLS, rate limiting,
SSRF prevention, sandboxed execution). The development roadmap/implementation guide lists several of
those same controls as **open vulnerabilities to be built**. For a CISO-built product whose pitch is
trust, that mismatch is the single biggest credibility risk. This workstream makes the claimed
controls **real, tested, and honestly documented**.

## Current state (grounded in code)

- `app/api/execute-workflow/route.ts` calls `validateWorkflow()` (cycles, SSRF) and `validateApiKeys()`
  from `@charliesu/workflow-core`, and does basic `<>`-stripping sanitization. Coverage of the SSRF /
  cycle checks is flagged as incomplete in the impl guide.
- Rate limiting is an **in-memory `Map` per serverless instance**, per-IP only → resets on cold start,
  not shared across instances.
- `tool`/`javascript` nodes execute via `new Function(code)(...)` in `executeToolNode` — full access to
  the server runtime (no real sandbox).
- API keys are stored as **plaintext** `localStorage["ai-agent-api-keys"]` (and now
  `ai-agent-github-token`); `lib/security/encryption.ts` exists but isn't wired into the settings flow.
  The settings dialog says keys are "encrypted in your browser" (not yet true).
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true` (type errors don't fail the build).

## Target / Definition of Done

Each control is implemented, has a test proving it, and `architecture-overview.md` reflects real
status (Implemented / Planned) per control. Public claims match reality.

## Tasks

| # | Task | Effort | Files |
|---|---|:--:|---|
| 1 | **SSRF egress allowlist** on the HTTP node: block private/reserved ranges (`10/8`, `172.16/12`, `192.168/16`, `127/8`, `169.254.169.254`, `::1`, `localhost`, `*.internal`), enforce `http(s)` only, block redirects into private space, optional per-workflow allowlist. Distinguish **internal app routes** (the scanner's `/api/scan/github` localhost call) from user-supplied URLs so real scans still work. | M | `executeHttpRequestNode` in `topflow-execution-engine.ts`, `validation-engine.ts` |
| 2 | **Cycle detection** before execution: DFS / topological check; reject cyclic graphs with a clear error; guard against runaway loops + credit burn. Verify/extend what `validateWorkflow` does and enforce it server-side. | S–M | `validation-engine.ts`, `route.ts` |
| 3 | **JS sandbox replacement**: replace `new Function()` with an isolate (e.g. `isolated-vm`, QuickJS-wasm, or a worker) with no network/fs/global access, a memory cap, and a hard timeout. | L | `executeToolNode` (+ any `javascript` path) in `topflow-execution-engine.ts` |
| 4 | **Durable rate limiting**: replace the in-memory map with Redis/Vercel KV (`@upstash/ratelimit`), keyed per-IP **and** per-token, applied to `execute-workflow`, `scan/github`, and `badge`. | M | `route.ts`, `app/api/scan/github/.../route.ts`, `app/api/badge/.../route.ts` |
| 5 | **Encrypt API keys at rest**: wire `lib/security/encryption.ts` (Web Crypto) into save/read in the settings dialog; migrate existing plaintext `ai-agent-api-keys` / `ai-agent-github-token`. | S–M | `api-settings-dialog.tsx`, `workflow-input-dialog.tsx`, `storage.ts`, `encryption.ts` |
| 6 | **Reconcile claims/docs**: update `architecture-overview.md` to mark each control Implemented vs Planned; fix README "API keys never touch our servers" (they transit the serverless function on live runs — state "not stored" instead) and the "encrypted in your browser" copy (accurate once #5 lands). | S | `docs/architecture/architecture-overview.md`, `README.md`, `api-settings-dialog.tsx` |
| 7 | **(Optional) Tighten the build**: once the codebase is type-clean, drop `typescript.ignoreBuildErrors` so `next build` enforces types (pairs with the CI type-check gate). | S | `next.config.mjs` |

## Dependencies & sequencing

- Tasks 1, 2, 4 land in **M1** (trust core) and share files with URW Phase 2 (W2) — do them together.
- Task 3 (sandbox) is P0-by-risk but L-effort and self-contained → **M3**.
- Tasks 5, 6 are quick, high-trust → **M1**.

## Acceptance criteria

- A request whose HTTP node targets `http://169.254.169.254/...` or `http://127.0.0.1:…` (non-app)
  is rejected by a test; the scanner's internal `/api/scan/github` call still succeeds.
- A cyclic workflow is rejected pre-execution (test).
- A `tool` node attempting `process.env`, `fetch`, or `require('fs')` fails in the sandbox (test).
- Rate limit holds across simulated instances (shared store).
- Stored keys are ciphertext at rest; a migration upgrades existing plaintext.
- `architecture-overview.md` shows per-control status; README/api-settings copy is accurate.

## Risks

- Sandbox replacement may break existing JS-node workflows → provide a compatibility shim + migration
  notes. SSRF allowlist could block legitimate internal/self-hosted targets → make the allowlist
  configurable. Encryption migration must not lock users out → fall back to re-entry on decrypt failure.
