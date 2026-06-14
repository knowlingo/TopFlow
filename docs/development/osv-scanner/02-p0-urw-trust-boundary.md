# W2 — URW Trust Boundary for the LLM Pipeline (P0)

**Priority:** P0 · **Effort:** L (phased) · **Depends on:** shares files with W1
**Design:** `docs/architecture/urw-llm-pipeline-design.md` (read first — this is the execution plan
for that design.)
**Related:** `lib/templates/github-scanner.ts`, `lib/topflow-execution-engine.ts`, `lib/demo-mode.ts`
(`renderReport`), `lib/osv/scanner.ts`, `lib/security/validation-engine.ts`,
`app/api/execute-workflow/route.ts`

---

## Problem

On consequential paths the LLM is an **author** (the scanner's `ai-analysis` node emits the free-text
report) and untrusted scanned content is interpolated into prompts as if trusted. That reopens
fabrication (fake CVEs) and the indirect-prompt-injection / lethal-trifecta exposure. URW closes this
by demoting the LLM to a **constrained selector** over a validated source-of-truth, with deterministic
assembly and human-gated side effects — applied to the security/compliance templates (not the
open-ended builder).

## Phases

### Phase 1 — Scanner → constrained-selector (Effort: M) — do first

Turn the scanner's `ai-analysis` from free-text author into a validated selector.

| # | Task | Files |
|---|---|---|
| 1.1 | Export the **known finding-ID set** from the scan result. | `lib/osv/scanner.ts` |
| 1.2 | Feed the LLM a **minimized view** (`{id, severity, component, fixAvailable}` + score), not raw advisory prose; pass any required untrusted text only inside a delimited *data* block, control chars stripped. | `topflow-execution-engine.ts`, `github-scanner.ts` |
| 1.3 | **Constrained elicitation:** replace the permissive `structuredOutput` schema with a tight Zod schema — `prioritizedFindingIds: string[]`, `recommendations: [{findingId, effort enum, impact enum}]`, `summaryLabel enum`. No free-text fact fields. | `github-scanner.ts`, `executeStructuredOutputNode` |
| 1.4 | **Existence validation (fail closed):** intersect returned IDs with the known set; drop/log unknowns; if none valid, fall back to deterministic ordering. | `topflow-execution-engine.ts` |
| 1.5 | **Deterministic assembly:** extend `renderReport(analysis, { order, recommendations })` and build the report from validated selections; the LLM ranks, code writes. | `demo-mode.ts` (`renderReport`) |
| 1.6 | Optional **non-authoritative AI commentary** section (no IDs/severities/numbers; stripped + labeled). | `github-scanner.ts` |
| 1.7 | Emit a **per-run audit record** (`providedIds`, `selectedIds`, `droppedIds`, `schemaValid`, `model`). | `topflow-execution-engine.ts` |

**Acceptance:** no free-text model output on the factual path; every reported CVE/GHSA resolves to a
known ID; injection planted in a package name / OSV summary cannot change a count/severity or trigger
an action (red-team fixture); demo mode + open builder unaffected.

### Phase 2 — Engine trifecta guard + human-gated sinks (Effort: L) — overlaps W1

| # | Task | Files |
|---|---|---|
| 2.1 | **Classify nodes:** reads-untrusted (`httpRequest`, real scan), holds-private-data (uses BYOK keys / private repo), external-comms (`httpRequest` non-GET / non-allowlisted host; future email/webhook). | `validation-engine.ts` |
| 2.2 | **Trifecta path check:** if one path combines all three with an LLM between → require a human gate (or block in the Restricted profile). | `validation-engine.ts`, `route.ts` |
| 2.3 | **Human gate** for outward/irreversible sinks downstream of an untrusted-fed LLM: present a small, legible diff for approval; never auto-fire. | `topflow-execution-engine.ts`, execution UI |
| 2.4 | **Credential isolation:** assert `apiKeys`/tokens are never in the interpolation namespace (a test that fails if a node can echo a key). | `topflow-execution-engine.ts` (+ test) |
| 2.5 | **Treat LLM output as untrusted into sinks** (LLM05): validate/escape model output flowing into `httpRequest` URL/body or `javascript`/`tool` nodes. | `topflow-execution-engine.ts` |

**Acceptance:** a workflow of `fetch untrusted → LLM → httpRequest POST` is gated/blocked; a test
proves no node can interpolate a BYOK key; SSRF tests (W1) pass.

### Phase 3 — Execution profiles, audit trail, advisory evaluator (Effort: L)

| # | Task | Files |
|---|---|---|
| 3.1 | Add `executionProfile` (`open` \| `restricted`) end-to-end; default the 8 security/compliance templates to `restricted`; surface it in the UI. | `route.ts`, templates, builder UI |
| 3.2 | Persist per-node audit records into the execution-history/timeline feature (observability, invariant 7). | execution-history (roadmap), engine |
| 3.3 | Optional **advisory evaluator** (LLM scores report quality) — annotates the run, never in the blocking path. | engine |

**Acceptance:** restricted templates enforce invariants 1–7; runs produce an auditable trace; the
evaluator can never block or alter the assembled artifact.

## Dependencies & sequencing

- Phase 1 → **M1** (small, high value; extends existing `renderReport`).
- Phase 2 → **M1**, co-developed with W1 tasks 1–2 (same files).
- Phase 3 → **M3**, alongside observability (W5).

## Risks

Faithful ≠ true (curate the OSV source); cherry-picked framing (deterministic default order + audit);
quarantine leakage if the schema grows free-text (keep it IDs/enums only); human-gate fatigue (gate
only true trifecta paths, small diffs); injection defense is strong, not perfect (red-team + W1).
