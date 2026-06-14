# W4 — Distribution Loop: Action / PR Bot + Real Badges (P1)

**Priority:** P1 · **Effort:** M · **Depends on:** the real scan endpoint + `lib/osv/scanner.ts`
(shipped); CI enabled (parked); short-TTL caching.
**Related:** `app/api/badge/[owner]/[repo]/route.ts`, `app/api/scan/github/[...repo]/route.ts`,
`lib/osv/scanner.ts`, `app/showcase/security-scanner/`, `README.md`

---

## Problem

The README already leans on growth hooks — a live security-score **badge API**, shareable report
cards, and SEO "scan `<famous repo>`" pages — but they're only credible once scans are **real**
(which they now are). Turning these into a real acquisition loop makes the scanner a growth engine
instead of a demo, and a CI/PR integration meets developers where they work.

## Current state

- `app/api/badge/[owner]/[repo]/route.ts` exists but serves demo/mock scores.
- `app/showcase/security-scanner/` + OG routes exist for shareable cards.
- No GitHub Action / PR integration exists. `lib/osv/scanner.ts` is reusable, framework-agnostic logic.

## Target / Definition of Done

(1) A GitHub Action that runs the OSV scan on PRs and posts a score + findings comment, optionally
failing on a threshold; (2) README badges that reflect **real**, cached scores; (3) shareable report
cards backed by real data.

## Tasks

| # | Task | Effort | Files / artifacts |
|---|---|:--:|---|
| 1 | **Real badge endpoint**: have the badge route call the real scanner (or read a cached `ScanResult`) and emit shields-compatible JSON/SVG; short-TTL cache keyed by `repo + commit SHA`. | M | `app/api/badge/.../route.ts`, cache util |
| 2 | **GitHub Action** (composite or Docker): runs the OSV scan against the PR's repo (reuse `lib/osv/scanner.ts` or call the deployed `/api/scan/github`), outputs score + findings; input for fail-threshold (e.g. fail on any CRITICAL). | M | `action.yml` + small runner, or a published action repo |
| 3 | **PR-comment bot**: the Action uses the workflow `GITHUB_TOKEN` to upsert a single sticky comment with the score, severity breakdown, and top findings (linked to advisories). | S–M | within the Action |
| 4 | **Real shareable cards / showcase**: back the OG image + showcase pages with real cached scans; "Scan your repo" CTA. | M | `app/showcase/security-scanner/`, OG route |
| 5 | **README badge snippet** + docs: copy-paste badge markdown; document the Action usage. | S | `README.md`, `docs/` |
| 6 | **Marketplace publish** (optional): publish the Action to the GitHub Marketplace. | S | action repo metadata |

## Dependencies & sequencing

- Lands in **M3**. Badges/cards (tasks 1, 4) can proceed immediately on the real endpoint. The Action
  (2, 3) is most credible once CI is enabled and the scan endpoint is deployed.
- Reuse W1 rate-limiting on the badge route (badges are unauthenticated + cacheable → cache hard).

## Acceptance criteria

- A README badge for a real repo shows its real, cached letter grade and updates after a re-scan.
- Opening a PR in a repo using the Action posts/updates a single comment with real findings; the
  configured threshold can fail the check.
- Showcase/OG cards render real data; no mock CVE IDs anywhere user-facing.

## Risks / notes

- **Rate limits & cost:** badges are public and cacheable — cache aggressively (per commit SHA) and
  rate-limit to avoid GitHub/OSV throttling. Unauthenticated badge scans use the 60 req/hr public
  limit unless a server token is configured for self-host.
- **Trust:** because findings are now real, never display stale/cached results without a timestamp;
  show "scanned at \<commit\>".
