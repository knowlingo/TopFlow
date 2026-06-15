/**
 * @jest-environment node
 */
import {
  extractKnownIds,
  buildMinimizedView,
  buildUrwPrompt,
  URW_CONSTRAINED_SCHEMA,
  validateFindingIds,
  stripCommentary,
  buildAuditRecord,
  type UrwConstrainedOutput,
} from '../urw'
import type { ScanResult } from '../../osv/scanner'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeScanResult(overrides: Partial<ScanResult> = {}): ScanResult {
  return {
    repository: 'owner/repo',
    stars: 100, forks: 10, language: 'TypeScript',
    lastAnalyzed: '2026-06-14T00:00:00Z',
    scanMode: 'real-osv',
    securityScore: 60, grade: 'C',
    vulnerabilities: {
      critical: 1, high: 1, medium: 1, low: 0,
      details: [
        { id: 'CVE-2023-001', osvId: 'GHSA-aaa-bbb-ccc', severity: 'CRITICAL', component: 'lodash@4.17.20', description: 'Prototype pollution', fix: 'Upgrade to 4.17.21', effort: '5 minutes' },
        { id: 'CVE-2023-002', osvId: 'GHSA-ddd-eee-fff', severity: 'HIGH',     component: 'axios@0.21.0',  description: 'SSRF vulnerability',  fix: 'Upgrade to 1.6.0',  effort: '15 minutes' },
        { id: 'CVE-2023-003', osvId: 'GHSA-ggg-hhh-iii', severity: 'MEDIUM',   component: 'semver@6.3.0',  description: 'ReDoS vulnerability',  fix: 'Upgrade to 7.5.2',  effort: '5 minutes' },
      ],
    },
    dependencyAudit: { total: 100, vulnerable: 3, outdated: null, licenses: [], riskBreakdown: { high: 2, medium: 1, low: 0 }, ecosystemsScanned: ['npm'] },
    securityPractices: { has_security_policy: true, dependabot_enabled: false, code_scanning: null, secret_scanning: null, branch_protection: null, signed_commits: null, two_factor_required: null },
    owaspCompliance: { A06_vulnerable_components: 'FAIL' },
    _meta: { manifestSources: ['package-lock.json (100)'], dataSources: ['GitHub REST API', 'OSV.dev'], byok: true },
    ...overrides,
  }
}

function makeOutput(overrides: Partial<UrwConstrainedOutput> = {}): UrwConstrainedOutput {
  return {
    prioritizedFindingIds: ['CVE-2023-001', 'CVE-2023-002', 'CVE-2023-003'],
    recommendations: [
      { findingId: 'CVE-2023-001', effort: 'HIGH', impact: 'CRITICAL' },
      { findingId: 'CVE-2023-002', effort: 'MEDIUM', impact: 'HIGH' },
    ],
    summaryLabel: 'HIGH_RISK',
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// extractKnownIds
// ---------------------------------------------------------------------------

describe('extractKnownIds', () => {
  it('collects every id and osvId from details', () => {
    const ids = extractKnownIds(makeScanResult())
    expect(ids.has('CVE-2023-001')).toBe(true)
    expect(ids.has('GHSA-aaa-bbb-ccc')).toBe(true)
    expect(ids.has('CVE-2023-002')).toBe(true)
    expect(ids.size).toBe(6) // 3 CVEs + 3 GHSAs
  })

  it('returns empty set for empty details', () => {
    const result = makeScanResult()
    result.vulnerabilities.details = []
    expect(extractKnownIds(result).size).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// buildMinimizedView
// ---------------------------------------------------------------------------

describe('buildMinimizedView', () => {
  it('returns one entry per finding with id, severity, component, fixAvailable', () => {
    const view = buildMinimizedView(makeScanResult())
    expect(view).toHaveLength(3)
    expect(view[0]).toEqual({ id: 'CVE-2023-001', severity: 'CRITICAL', component: 'lodash@4.17.20', fixAvailable: true })
  })

  it('strips control characters from all string fields', () => {
    const result = makeScanResult()
    result.vulnerabilities.details[0].id = 'CVE-2023-001\x00\x1f'
    result.vulnerabilities.details[0].component = 'lodash\x07@4.17.20'
    const view = buildMinimizedView(result)
    // trim() removes trailing-space artifacts produced by the replacement
    expect(view[0].id).toBe('CVE-2023-001')
    expect(view[0].component).not.toContain('\x07')
  })

  it('marks fixAvailable=false when fix says "See advisory"', () => {
    const result = makeScanResult()
    result.vulnerabilities.details[0].fix = 'See advisory for remediation'
    const view = buildMinimizedView(result)
    expect(view[0].fixAvailable).toBe(false)
  })

  it('does NOT include advisory description (untrusted field)', () => {
    const view = buildMinimizedView(makeScanResult())
    for (const f of view) {
      expect(Object.keys(f)).not.toContain('description')
    }
  })
})

// ---------------------------------------------------------------------------
// buildUrwPrompt
// ---------------------------------------------------------------------------

describe('buildUrwPrompt', () => {
  it('includes DATA BLOCK delimiters', () => {
    const findings = buildMinimizedView(makeScanResult())
    const prompt = buildUrwPrompt(findings, 60, 'C')
    expect(prompt).toContain('--- DATA BLOCK BEGIN ---')
    expect(prompt).toContain('--- DATA BLOCK END ---')
  })

  it('includes the score and grade', () => {
    const prompt = buildUrwPrompt([], 75, 'B')
    expect(prompt).toContain('75/100')
    expect(prompt).toContain('grade B')
  })

  it('does NOT include advisory description text in the prompt', () => {
    const findings = buildMinimizedView(makeScanResult())
    const prompt = buildUrwPrompt(findings, 60, 'C')
    expect(prompt).not.toContain('Prototype pollution')
    expect(prompt).not.toContain('SSRF vulnerability')
  })
})

// ---------------------------------------------------------------------------
// URW_CONSTRAINED_SCHEMA
// ---------------------------------------------------------------------------

describe('URW_CONSTRAINED_SCHEMA', () => {
  it('parses a valid constrained output', () => {
    const result = URW_CONSTRAINED_SCHEMA.safeParse(makeOutput())
    expect(result.success).toBe(true)
  })

  it('rejects unknown summaryLabel values', () => {
    const result = URW_CONSTRAINED_SCHEMA.safeParse(makeOutput({ summaryLabel: 'UNKNOWN' as any }))
    expect(result.success).toBe(false)
  })

  it('rejects unknown effort values in recommendations', () => {
    const result = URW_CONSTRAINED_SCHEMA.safeParse(makeOutput({
      recommendations: [{ findingId: 'CVE-2023-001', effort: 'EXTREME' as any, impact: 'HIGH' }],
    }))
    expect(result.success).toBe(false)
  })

  it('accepts commentaryHint up to 280 chars', () => {
    const r = URW_CONSTRAINED_SCHEMA.safeParse(makeOutput({ commentaryHint: 'a'.repeat(280) }))
    expect(r.success).toBe(true)
  })

  it('rejects commentaryHint over 280 chars', () => {
    const r = URW_CONSTRAINED_SCHEMA.safeParse(makeOutput({ commentaryHint: 'a'.repeat(281) }))
    expect(r.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// validateFindingIds
// ---------------------------------------------------------------------------

describe('validateFindingIds', () => {
  it('selects IDs present in the known set', () => {
    const known = extractKnownIds(makeScanResult())
    const { selectedIds, droppedIds } = validateFindingIds(makeOutput(), known)
    expect(selectedIds).toEqual(['CVE-2023-001', 'CVE-2023-002', 'CVE-2023-003'])
    expect(droppedIds).toEqual([])
  })

  it('drops fabricated IDs not in the known set (fail closed)', () => {
    const known = extractKnownIds(makeScanResult())
    const output = makeOutput({ prioritizedFindingIds: ['CVE-2023-001', 'CVE-FAKE-999'] })
    const { selectedIds, droppedIds } = validateFindingIds(output, known)
    expect(selectedIds).toEqual(['CVE-2023-001'])
    expect(droppedIds).toEqual(['CVE-FAKE-999'])
  })

  it('returns empty arrays when the LLM returns no known IDs', () => {
    const known = extractKnownIds(makeScanResult())
    const output = makeOutput({ prioritizedFindingIds: ['CVE-INVENTED-001', 'CVE-INVENTED-002'] })
    const { selectedIds, droppedIds } = validateFindingIds(output, known)
    expect(selectedIds).toHaveLength(0)
    expect(droppedIds).toHaveLength(2)
  })

  it('also validates recommendations by findingId', () => {
    const known = extractKnownIds(makeScanResult())
    const output = makeOutput({
      recommendations: [
        { findingId: 'CVE-2023-001', effort: 'HIGH', impact: 'CRITICAL' },
        { findingId: 'CVE-FAKE-999', effort: 'LOW', impact: 'LOW' },
      ],
    })
    const { selectedRecommendations } = validateFindingIds(output, known)
    expect(selectedRecommendations).toHaveLength(1)
    expect(selectedRecommendations[0].findingId).toBe('CVE-2023-001')
  })

  it('accepts OSV IDs (GHSA-*) as valid known IDs', () => {
    const known = extractKnownIds(makeScanResult())
    const output = makeOutput({ prioritizedFindingIds: ['GHSA-aaa-bbb-ccc'] })
    const { selectedIds } = validateFindingIds(output, known)
    expect(selectedIds).toContain('GHSA-aaa-bbb-ccc')
  })
})

// ---------------------------------------------------------------------------
// stripCommentary
// ---------------------------------------------------------------------------

describe('stripCommentary', () => {
  it('returns undefined for undefined input', () => {
    expect(stripCommentary(undefined)).toBeUndefined()
  })

  it('replaces CVE/GHSA/OSV/CWE references with [ID]', () => {
    const stripped = stripCommentary('Consider fixing CVE-2023-001 and GHSA-xxx-yyy-zzz.')
    expect(stripped).not.toContain('CVE-2023-001')
    expect(stripped).not.toContain('GHSA-xxx-yyy-zzz')
    expect(stripped).toContain('[ID]')
  })

  it('replaces score patterns like "72/100"', () => {
    const stripped = stripCommentary('Score is 72/100.')
    expect(stripped).toContain('[score]')
  })

  it('replaces count+severity patterns', () => {
    const stripped = stripCommentary('There are 3 critical vulnerabilities.')
    expect(stripped).toContain('[count]')
  })

  it('passes through safe general text unchanged', () => {
    const safe = 'The dependency management practices look promising overall.'
    expect(stripCommentary(safe)).toBe(safe)
  })
})

// ---------------------------------------------------------------------------
// buildAuditRecord
// ---------------------------------------------------------------------------

describe('buildAuditRecord', () => {
  it('records all expected fields', () => {
    const scan    = makeScanResult()
    const known   = extractKnownIds(scan)
    const output  = makeOutput()
    const validation = validateFindingIds(output, known)

    const audit = buildAuditRecord({
      workflowId: 'github-security-scanner',
      model: 'openai/gpt-4o-mini',
      knownIds: known,
      output,
      validation,
      schemaValid: true,
      rawCommentary: undefined,
    })

    expect(audit.workflowId).toBe('github-security-scanner')
    expect(audit.model).toBe('openai/gpt-4o-mini')
    expect(audit.schemaValid).toBe(true)
    expect(audit.summaryLabel).toBe('HIGH_RISK')
    expect(audit.providedIds).toHaveLength(6)
    expect(audit.selectedIds).toEqual(['CVE-2023-001', 'CVE-2023-002', 'CVE-2023-003'])
    expect(audit.droppedIds).toHaveLength(0)
    expect(audit.commentaryStripped).toBe(false)
    expect(typeof audit.timestamp).toBe('string')
  })

  it('flags commentaryStripped=true when the commentary was altered', () => {
    const scan    = makeScanResult()
    const known   = extractKnownIds(scan)
    const output  = makeOutput({ commentaryHint: 'CVE-2023-001 is the worst.' })
    const validation = validateFindingIds(output, known)
    const audit = buildAuditRecord({
      workflowId: 'github-security-scanner',
      model: 'openai/gpt-4o-mini',
      knownIds: known,
      output,
      validation,
      schemaValid: true,
      rawCommentary: output.commentaryHint,
    })
    expect(audit.commentaryStripped).toBe(true)
  })
})
