# Development Guide: OSV Real-Scan Implementation

Companion to `docs/architecture/osv-real-scan-design.md`. This is the hands-on guide for building,
running, testing, and extending the real (OSV-powered) GitHub vulnerability scan.

---

## 1. What this adds

A real scan path alongside the existing demo. Demo mode is untouched.

> **BYOK is two keys, two axes** (see §9 and design doc §6): a **GitHub token** gates the *scan-data*
> axis (real vs mock), and an **AI provider key** gates the *report-narrative* axis (LLM vs templated).
> This PR delivers the scan-data engine + endpoint; the per-axis gating and UI for both keys are the
> follow-up.

| File | Purpose |
|---|---|
| `lib/osv/scanner.ts` | Framework-agnostic scan engine (GitHub + OSV clients, manifest parsers, severity model, `RepoAnalysis` mapping). Pure helpers exported for tests. |
| `app/api/scan/github/[...repo]/route.ts` | Next.js route. BYOK token handling; returns `RepoAnalysis` JSON. |
| `lib/__tests__/osv-scanner.test.ts` | Jest unit tests for the pure logic (no network). |
| `docs/architecture/osv-real-scan-design.md` | Design rationale & architecture. |

## 2. Prerequisites

- A **GitHub Personal Access Token** (classic or fine-grained), read-only:
  - Public repositories: `public_repo` (or no scope, but a token is strongly recommended for the
    60 → 5,000 req/hr limit increase).
  - Private repositories: `repo` (read).
- No OSV.dev key is required.

## 3. Run it locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Call the real endpoint directly (the token goes in a header, never the URL):

```bash
# A deliberately vulnerable app
curl -s "http://localhost:3000/api/scan/github/juice-shop/juice-shop" \
  -H "x-github-token: ghp_your_token_here" | jq '.securityScore, .vulnerabilities | {critical,high,medium,low}'

# A clean, modern repo
curl -s "http://localhost:3000/api/scan/github/knowlingo/TopFlow" \
  -H "x-github-token: ghp_your_token_here" | jq '.dependencyAudit'
```

> Without a token the call still works for public repos but is limited to 60 req/hr and may return a
> `502` advising you to supply one.

## 4. API reference

> This endpoint returns scan **data** (`RepoAnalysis`). The human-readable **report** is produced
> downstream by the workflow's AI Security Analysis node — an LLM when an AI key is present, otherwise
> a templated render (§9). Data and narrative are gated by two different keys.

### `GET /api/scan/github/[...repo]`

| | |
|---|---|
| **Path** | `owner/repo` (catch-all segment), e.g. `/api/scan/github/facebook/react` |
| **Header** | `x-github-token: <PAT>` (optional but recommended). `Authorization: Bearer <PAT>` also accepted. |
| **Runtime** | Node.js, `maxDuration = 30` (matches the workflow engine budget) |
| **Caching** | `Cache-Control: no-store` (results are per-repo/per-user/time-sensitive) |

**Response (200)** — a `RepoAnalysis`-compatible object:

```jsonc
{
  "repository": "juice-shop/juice-shop",
  "stars": 0, "forks": 0, "language": "TypeScript",
  "lastAnalyzed": "2026-06-13T21:00:00.000Z",
  "scanMode": "real-osv",
  "securityScore": 17, "grade": "D",
  "vulnerabilities": {
    "critical": 2, "high": 12, "medium": 12, "low": 0,
    "details": [
      { "id": "CVE-2015-9235", "osvId": "GHSA-...", "severity": "CRITICAL",
        "component": "jsonwebtoken@0.4.0", "description": "Verification Bypass in jsonwebtoken",
        "fix": "Upgrade to 4.2.2", "effort": "30+ minutes" }
    ]
  },
  "dependencyAudit": {
    "total": 129, "vulnerable": 11, "outdated": null, "licenses": [],
    "riskBreakdown": { "high": 7, "medium": 4, "low": 0 },
    "ecosystemsScanned": ["npm"]
  },
  "securityPractices": {
    "has_security_policy": true, "dependabot_enabled": false,
    "code_scanning": null, "secret_scanning": null, "branch_protection": null,
    "signed_commits": null, "two_factor_required": null
  },
  "owaspCompliance": { "A06_vulnerable_components": "FAIL" },
  "_meta": { "manifestSources": ["package.json (129)"], "dataSources": ["GitHub REST API", "OSV.dev"], "byok": true }
}
```

`null` practice fields require elevated token scopes / additional GitHub security APIs and are
intentionally not faked (see Future work).

**Error statuses:** `400` (bad `owner/repo`), `500` (no manifest / unexpected),
`502` (repo not found, private without token, or GitHub rate-limited).

## 5. Module reference — `lib/osv/scanner.ts`

| Export | Signature | Notes |
|---|---|---|
| `scanRepository` | `(owner, repo, { githubToken? }) => Promise<ScanResult>` | The orchestrator. |
| `parsePackageLock` / `parsePnpmLock` / `parsePackageJson` | `(text) => Dep[]` | npm ecosystem. |
| `parseRequirements` | `(text) => Dep[]` | PyPI. |
| `parseGoMod` | `(text) => Dep[]` | Go. |
| `parseCargoLock` | `(text) => Dep[]` | crates.io. |
| `cvss3Base` | `(vector) => number \| null` | CVSS v3.1 base score. |
| `bucket` | `(score) => Severity` | Score → severity band. |
| `severityOf` | `(osvVuln) => Severity` | GHSA rating, else CVSS, else MEDIUM. |
| `fixedVersionFor` | `(osvVuln, name) => string` | Remediation hint from `affected[].ranges`. |
| `gradeFor` | `(score) => string` | Letter grade. |

Network calls use the global `fetch` (available in the Node runtime / Vercel). The scan only ever
contacts `api.github.com`, `api.osv.dev`, and GitHub `download_url`s.

## 6. Testing

```bash
pnpm test                       # all Jest tests
pnpm test osv-scanner           # this suite
```

`lib/__tests__/osv-scanner.test.ts` covers the deterministic, offline logic: every manifest parser,
the CVSS base-score calculation, severity precedence (GHSA → CVSS → default), and grading. Live
GitHub/OSV calls are validated manually (Section 8) to keep the unit suite hermetic and fast.

## 7. Extending: add a new ecosystem

1. Write `parseXyz(text: string): Dep[]` returning `{ ecosystem, name, version }` with the **exact
   OSV ecosystem string** (e.g. `npm`, `PyPI`, `Go`, `crates.io`, `Maven`, `RubyGems`, `NuGet`,
   `Packagist` — see the OSV schema).
2. Register the filename + parser in the `candidates` list in `collectDependencies` (put lockfiles
   before loose manifests).
3. Export the parser and add a unit test in `lib/__tests__/osv-scanner.test.ts`.
4. Verify against a known-vulnerable sample with `POST https://api.osv.dev/v1/query`.

## 8. Validation evidence (live)

Validated against `api.github.com` + `api.osv.dev`:

| Repo | Manifest | Deps | Vulnerable | Result |
|---|---|---|---|---|
| `juice-shop/juice-shop` | `package.json` | 129 | 11 | 2 critical / 12 high / 12 medium → **17/100 (D)**; real CVEs incl. `CVE-2015-9235` (jsonwebtoken), `CVE-2020-15084` (express-jwt) |
| `knowlingo/TopFlow` | `pnpm-lock.yaml` | 1,025 | 0 | **75/100 (B)** — clean dependencies |

Spot-check OSV directly:

```bash
curl -s -X POST https://api.osv.dev/v1/query \
  -d '{"package":{"name":"lodash","ecosystem":"npm"},"version":"4.17.4"}' | jq '.vulns | length'   # -> 10
```

## 9. Wiring into the product: two BYOK axes (follow-up PR)

"Bring your own key" is **two independent keys** gating **two independent axes**. Neither implies the
other; each degrades gracefully. (Design doc §6 has the full rationale.)

| Axis | Key | Node | Transport |
|---|---|---|---|
| Scan **data** | GitHub token | `Security Scan` (httpRequest) → `/api/scan/github` | `x-github-token` header |
| Report **narrative** | AI provider key | `AI Security Analysis` (text-model) | `apiKeys` in the `execute-workflow` body |

1. **Token capture (UI).** Add an optional "GitHub token" field to the scanner input dialog
   (`components/workflow-input-dialog.tsx`) and/or `components/api-settings-dialog.tsx`. Persist it in
   `localStorage` (suggested key `ai-agent-github-token`) — same lifecycle as the AI provider keys.
   The AI key reuses the existing `ai-agent-api-keys` settings; no change there.
2. **Decoupled gating.** Today `lib/demo-mode.ts › shouldUseDemoMode` keys only on the AI key and
   returns one boolean for the whole workflow — so a GitHub token alone can't trigger a real scan.
   Split the decision per axis:
   - **scan-data axis = real** when a GitHub token is present *or* the user toggles real mode (public
     repos scan tokenless at 60/hr; private + 5,000/hr need the token); else mock.
   - **narrative axis = LLM** when any AI key is present; else the templated report.
   In real mode the **Security Scan** node (`lib/templates/github-scanner.ts`) targets
   `/api/scan/github/$input1.fullName` with the `x-github-token` header; in demo it keeps
   `/api/demo/github-scan/...`.
3. **Provider-agnostic report model.** The template hardcodes `openai/gpt-4o-mini`, so an
   Anthropic-only user hits *"OpenAI API key not configured."* Resolve the report model from whichever
   provider key exists (suggested priority `anthropic → openai → google → groq`) instead of a fixed
   model string.
4. **Templated (no-LLM) report fallback.** A real scan must not *require* an AI key. Factor the
   `RepoAnalysis → markdown` rendering that `getGitHubScannerMockResponse` already performs into a
   shared `renderReport(analysis)` helper, and use it whenever no AI key is present (for both real and
   demo data). Reserve the LLM path for the richer narrative when a key is available.
5. **No downstream changes.** Output conforms to `RepoAnalysis`, so the "Calculate Score (Real API
   mode)" node, results dialog, and visualization work unchanged regardless of which combination is active.

### Behavior matrix

| GitHub token | AI key | Scan data | Report | Effective mode |
|:---:|:---:|---|---|---|
| – | – | mock | templated mock | Demo (zero-setup default) |
| – | ✓ | real (public, 60/hr) | real LLM | Live narrative, public data |
| ✓ | – | real (public + private, 5,000/hr) | templated (no LLM) | Real scan, no AI key |
| ✓ | ✓ | real | real LLM | Fully real |

## 10. Productionization checklist

- [ ] **Decoupled gating** — make `shouldUseDemoMode` (or a scanner-specific resolver) GitHub-token / `scanMode` aware so a real scan can run without an AI key (§9).
- [ ] **Provider-agnostic report model** — resolve the report model from the available provider key instead of hardcoded `openai/gpt-4o-mini` (§9).
- [ ] **Shared `renderReport(analysis)`** — extract the `RepoAnalysis → markdown` renderer so the templated (no-LLM) fallback and the demo path share it (§9).
- [ ] Chunk `/v1/querybatch` for very large lockfiles (batch in groups of, e.g., 500).
- [ ] Add parsers: `yarn.lock`, `Pipfile.lock`, `poetry.lock`, `composer.lock`, `Gemfile.lock`.
- [ ] Populate `dependencyAudit.outdated` via registry latest-version lookups.
- [ ] Real `securityPractices` (branch protection, secret/code scanning) via GitHub security APIs.
- [ ] Short-TTL response cache keyed by `repo + commit SHA`.
- [ ] Surface CVE links + CVSS scores in the results UI.
- [ ] Rate-limit the route itself (`@upstash/ratelimit`) consistent with `/api/execute-workflow`.

## 11. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `502` "rate limit" | Supply `x-github-token`; unauth is 60/hr. |
| `502` "not found" on a known repo | Repo was renamed (the API follows redirects) or is private — provide a token with `repo` scope. |
| `500` "No parseable dependency manifest" | The repo has no supported manifest at root; add the relevant parser (Section 7). |
| Few results vs expectation on an npm repo | Only `package.json` was present (direct deps). Commit a lockfile for transitive coverage. |
