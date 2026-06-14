# W3 — Make a Second Template Real (P1)

**Priority:** P1 · **Effort:** M · **Depends on:** the BYOK + dedicated-endpoint pattern (shipped) and
ideally URW Phase 1 (W2) so the new template is trust-correct from day one.
**Related:** `lib/security-templates.ts`, `lib/templates/`, `lib/demo-mode.ts`,
`lib/demo-data/`, `app/api/scan/github/[...repo]/route.ts` (reference implementation),
`lib/osv/scanner.ts` (reference engine)

---

## Problem

Seven of the eight templates still run on mock data. The OSV scanner proved a repeatable recipe:
**a free/BYOK real data source → a dedicated API route → deterministic mapping into the template's
contract → demo preserved as the default.** Converting a second template compounds the
"actually works, not just a demo" message and validates that the pattern generalizes.

## Recommendation: PII Detection first (GDPR as a stretch)

| Candidate | Real data source | Fit | Verdict |
|---|---|---|---|
| **PII Detection** | Deterministic detectors (regex/Luhn/NER) over user-provided text + optional BYOK LLM classification | Self-contained; no external connectors; clean source-of-truth; URW-shaped | **Start here** |
| GDPR data-access (DSAR) | Requires connectors to real data stores (DBs, SaaS) | High value but needs integrations + auth plumbing | Stretch / later |

PII detection mirrors the OSV pattern with a *local* source-of-truth: deterministic matchers are the
authority; the LLM (if a key is present) only **classifies/contextualizes** under URW constraints.

## Target / Definition of Done

A PII Detection workflow that, given real input text/files, returns **real** findings (type, location,
confidence) from deterministic detectors, optionally enriched by a constrained LLM, rendered via a
shared assembler — with demo mode unchanged and the whole thing URW-compliant.

## Tasks

| # | Task | Effort | Files |
|---|---|:--:|---|
| 1 | **Deterministic detector lib** (source-of-truth): emails, phone numbers, SSNs, credit cards (Luhn-validated), IPs, API-key-shaped strings, addresses; each match → `{id, type, span, sample(masked), confidence}`. | M | `lib/pii/detector.ts` (new) |
| 2 | **Real endpoint** mirroring the scanner: `app/api/detect/pii/route.ts` — accepts text/files, runs detectors, returns a structured `PiiAnalysis`; no data stored. | S–M | new route |
| 3 | **Template wiring**: point the PII template's analysis node at the real endpoint in real mode; keep the demo endpoint for demo mode (reuse `resolveScanModes`-style gating). | M | `lib/templates/…`, `lib/security-templates.ts`, `lib/demo-mode.ts` |
| 4 | **URW narrative** (if AI key present): constrained LLM that selects/labels detected IDs only (no new PII invented); else templated render. Reuse the `renderReport` pattern → `renderPiiReport`. | M | engine, `demo-mode.ts` |
| 5 | **Privacy**: process in-memory only; mask samples in output; never log raw PII; document the data-handling guarantees. | S | route, docs |
| 6 | **Tests**: detector unit tests (incl. Luhn, false-positive guards) + a URW red-team case (injected text can't fabricate or suppress a finding). | M | `lib/__tests__/` |

## Dependencies & sequencing

- Lands in **M2**, after URW Phase 1 establishes the constrained-selector + assembler pattern (so PII
  is URW-correct on day one rather than retrofitted).
- Reuses W1's rate-limiting + SSRF posture for the new route.

## Acceptance criteria

- Real input text yields real, deterministic PII findings (test); credit-card detection is
  Luhn-validated; samples are masked.
- With an AI key, the report narrative references only detected finding IDs; without one, a templated
  report renders from the same findings.
- No raw PII is persisted or logged; demo mode unchanged.

## Risks / notes

- Detector precision/recall is the hard part — start with high-precision patterns + masking, iterate.
- GDPR DSAR is deferred specifically because it needs real connectors + auth; scope it separately once
  the backend (Supabase Phase 4) and integration story exist.
