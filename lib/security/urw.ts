/**
 * lib/security/urw.ts — Untrusted Reasoning Worker (URW), Phase 1
 *
 * Demotes the LLM from free-text author to a constrained ranker/selector on
 * the GitHub Security Scanner's narrative path. The LLM receives only a
 * minimized, sanitized view of findings (IDs + severity — no advisory prose)
 * and may only return IDs from the known set. All factual assembly is done
 * deterministically in code.
 *
 * Threat closed: a payload injected into a package name, OSV summary, or
 * description cannot change a reported severity, fabricate a CVE ID, or
 * trigger an outbound action — because the LLM never sees raw advisory text
 * and its ID output is intersected with a ground-truth set before use.
 *
 * Design doc: docs/architecture/urw-llm-pipeline-design.md
 * Tutorial:   docs/AI-Security/osv-scanner/ (tutorial 05, planned)
 */

import { z } from 'zod'
import type { ScanResult, VulnDetail } from '../osv/scanner'

// ---------------------------------------------------------------------------
// 1. Known finding-ID set  (task 1.1)
// ---------------------------------------------------------------------------

/** Extract every finding ID and OSV ID from a ScanResult for ground-truth validation. */
export function extractKnownIds(result: ScanResult): Set<string> {
  const ids = new Set<string>()
  for (const v of result.vulnerabilities?.details ?? []) {
    if (v.id)    ids.add(v.id)
    if (v.osvId) ids.add(v.osvId)
  }
  return ids
}

// ---------------------------------------------------------------------------
// 2. Minimized, sanitized LLM input  (task 1.2)
// ---------------------------------------------------------------------------

/** Strip control characters that could encode prompt-injection payloads. */
const CTRL = /[\x00-\x1f\x7f]/g
function sanitize(s: string): string {
  return s.replace(CTRL, ' ').trim()
}

export interface MinimizedFinding {
  id: string
  severity: string
  component: string
  fixAvailable: boolean
}

/**
 * Build the minimal, sanitized view the LLM is allowed to see.
 * Advisory descriptions (untrusted source) are deliberately omitted.
 */
export function buildMinimizedView(result: ScanResult): MinimizedFinding[] {
  return (result.vulnerabilities?.details ?? []).map((v: VulnDetail) => ({
    id:           sanitize(v.id),
    severity:     sanitize(v.severity),
    component:    sanitize(v.component),
    fixAvailable: !v.fix.toLowerCase().includes('see advisory'),
  }))
}

/** Build the constrained prompt delivered to the LLM. */
export function buildUrwPrompt(
  findings: MinimizedFinding[],
  score: number,
  grade: string
): string {
  const dataBlock = JSON.stringify(findings, null, 2)
  return `You are a security prioritization assistant. Your ONLY job is to rank the findings \
below by remediation priority and return the JSON schema requested.

STRICT RULES — violation makes the output unusable:
- Use ONLY finding IDs that appear verbatim in the DATA BLOCK. Never invent or modify IDs.
- Do not include severity scores, CVE numbers, or factual claims in commentaryHint.
- commentaryHint must not contain any ID strings or numeric scores.

REPOSITORY CONTEXT:
- Security score: ${score}/100  (grade ${grade})
- Finding count: ${findings.length}

--- DATA BLOCK BEGIN ---
${dataBlock}
--- DATA BLOCK END ---

Rank the findings by remediation priority, highest first. Return your response as JSON.`
}

// ---------------------------------------------------------------------------
// 3. Constrained elicitation schema  (task 1.3)
// ---------------------------------------------------------------------------

export const URW_CONSTRAINED_SCHEMA = z.object({
  prioritizedFindingIds: z
    .array(z.string())
    .describe('IDs from the DATA BLOCK only, ranked by remediation priority (highest first).'),

  recommendations: z
    .array(z.object({
      findingId: z.string().describe('Must match an ID from the DATA BLOCK exactly.'),
      effort:    z.enum(['LOW', 'MEDIUM', 'HIGH']),
      impact:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    }))
    .describe('Per-finding remediation metadata. No fabricated IDs.'),

  summaryLabel: z
    .enum(['SECURE', 'MINOR_ISSUES', 'NEEDS_ATTENTION', 'HIGH_RISK', 'CRITICAL_RISK'])
    .describe('Overall security posture label derived solely from the findings above.'),

  commentaryHint: z
    .string()
    .max(280)
    .optional()
    .describe('Optional non-authoritative note. No IDs, no severity numbers. Max 280 chars.'),
})

export type UrwConstrainedOutput = z.infer<typeof URW_CONSTRAINED_SCHEMA>

// ---------------------------------------------------------------------------
// 4. Existence validation — fail closed  (task 1.4)
// ---------------------------------------------------------------------------

export interface UrwValidationResult {
  selectedIds:              string[]
  droppedIds:               string[]
  selectedRecommendations:  UrwConstrainedOutput['recommendations']
}

/**
 * Intersect LLM-returned IDs with the known ground-truth set.
 * Unknown IDs are logged and dropped; the caller falls back to deterministic
 * ordering if selectedIds is empty.
 */
export function validateFindingIds(
  output: UrwConstrainedOutput,
  knownIds: Set<string>
): UrwValidationResult {
  const selectedIds = output.prioritizedFindingIds.filter(id => knownIds.has(id))
  const droppedIds  = output.prioritizedFindingIds.filter(id => !knownIds.has(id))
  const selectedRecommendations = (output.recommendations ?? [])
    .filter(r => knownIds.has(r.findingId))

  return { selectedIds, droppedIds, selectedRecommendations }
}

// ---------------------------------------------------------------------------
// 5. Commentary strip  (task 1.6)
// ---------------------------------------------------------------------------

/**
 * Strip anything that looks like an ID, a CVE reference, or a numeric score
 * from the optional AI commentary before surfacing it.
 */
export function stripCommentary(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  return raw
    .replace(/\b(CVE|GHSA|OSV|CWE)-[\w.-]+/gi, '[ID]')
    .replace(/\b\d{2,3}\/100\b/g, '[score]')
    .replace(/\b\d+\s*(critical|high|medium|low)\b/gi, '[count]')
    .trim()
    || undefined
}

// ---------------------------------------------------------------------------
// 6. Audit record  (task 1.7)
// ---------------------------------------------------------------------------

export interface UrwAuditRecord {
  timestamp:          string
  workflowId:         string
  model:              string
  providedIds:        string[]
  returnedIds:        string[]
  selectedIds:        string[]
  droppedIds:         string[]
  schemaValid:        boolean
  summaryLabel:       string
  commentaryStripped: boolean
}

export function buildAuditRecord(params: {
  workflowId:    string
  model:         string
  knownIds:      Set<string>
  output:        UrwConstrainedOutput
  validation:    UrwValidationResult
  schemaValid:   boolean
  rawCommentary: string | undefined
}): UrwAuditRecord {
  return {
    timestamp:          new Date().toISOString(),
    workflowId:         params.workflowId,
    model:              params.model,
    providedIds:        Array.from(params.knownIds),
    returnedIds:        params.output.prioritizedFindingIds,
    selectedIds:        params.validation.selectedIds,
    droppedIds:         params.validation.droppedIds,
    schemaValid:        params.schemaValid,
    summaryLabel:       params.output.summaryLabel,
    commentaryStripped: !!params.rawCommentary && params.rawCommentary !== stripCommentary(params.rawCommentary),
  }
}
