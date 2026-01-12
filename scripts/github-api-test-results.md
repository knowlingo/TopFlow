# GitHub Security Scanner - API Test Results

**Date**: 2026-01-12
**Purpose**: Validate real GitHub API for security scanner demo feasibility

## Key Findings

### ✅ Performance: PASS
- **Average time per repo**: 850-920ms
- **6 repos analyzed**: 5.97 seconds total
- **Target**: <30 seconds for full workflow
- **Result**: Well within target, even with network latency

### ⚠️ Rate Limiting Discovery
- **Unauthenticated limit**: 60 requests/hour
- **Requests per repo**: ~9 (metadata + security checks × 3 paths)
- **Max repos before limit**: ~6-7 repositories
- **Implication**: Demo MUST use mock data to avoid rate limit issues

### 📊 Security Score Distribution

| Repository | Category | Score | SECURITY.md | Dependabot | Active |
|------------|----------|-------|-------------|------------|--------|
| facebook/react | Frontend | 95/100 | ✓ | ✓ | ✓ |
| nodejs/node | Backend | 95/100 | ✓ | ✓ | ✓ |
| django/django | Backend | 85/100 | ✓ | ✗ | ✓ |
| OWASP/owasp-mastg | Security | 85/100 | ✓ | ✗ | ✓ |
| vuejs/vue | Frontend | 70/100 | ✗ | ✗ | ✓ |
| vercel/next.js | Frontend | 65/100 | ✗ | ✗ | ✓ |

**Insight**: Wide score variance (65-95) makes for compelling demo visuals

## Validated Data Structures

### Repository Metadata
```typescript
{
  name: string          // "react"
  owner: string         // "facebook"
  stars: number         // 242,192
  forks: number         // 50,363
  openIssues: number    // varies
  lastUpdated: string   // ISO 8601 timestamp
  defaultBranch: string // "main"
  hasSecurityPolicy: boolean
}
```

### Security Checks
1. **SECURITY.md detection**: Check 3 paths (root, .github/, docs/)
2. **Dependabot configuration**: Check 2 paths (.github/dependabot.yml, .yaml)
3. **Recent activity**: Last commit within 6 months
4. **Issue management**: Open issues count

### API Endpoints Used
- `GET /repos/{owner}/{repo}` - Basic metadata
- `GET /repos/{owner}/{repo}/contents/{path}` - File existence checks
- `GET /rate_limit` - Rate limit status

## Scoring Algorithm Validated

```typescript
Base score: 60 points
+ SECURITY.md: +15 points
+ Dependabot: +15 points
+ Recent activity (6 months): +5 points
+ Good issue management (<1000 open): +5 points
= Maximum: 100 points
```

**Result**: Produces meaningful distribution (65-95 range observed)

## Demo Implementation Recommendations

### 1. Mock Data Service (Required)
- Pre-fetch real data once, cache as JSON
- Serve from `/app/api/demo-github-scanner/route.ts`
- Update quarterly with fresh data
- Avoids rate limits, guarantees <30s execution

### 2. Repositories for MVP Demo (7 total)

**Frontend (3):**
- facebook/react - High score baseline (95)
- vercel/next.js - Lower score for contrast (65)
- vuejs/vue - Mid-range score (70)

**Backend (2):**
- nodejs/node - High score (95)
- django/django - Mid score (85)

**Security (2):**
- OWASP/owasp-mastg - Security-focused repo (85)
- aquasecurity/trivy - Vulnerability scanner (need to fetch)

### 3. Workflow Architecture (12 nodes)

Based on real API calls, the workflow should:

1. **Start Node**: Input repo URL
2. **Parse URL Node** (JS): Extract owner/repo
3. **Fetch Metadata Node** (HTTP): GET repo data
4. **Check SECURITY.md** (HTTP): 3 parallel paths
5. **Check Dependabot** (HTTP): 2 parallel paths
6. **Conditional Node**: Validate responses (200 = exists)
7. **Calculate Score** (JS): Apply scoring algorithm
8. **Generate Threats** (Text Model): AI-generated security insights
9. **Format Results** (JS): Structure final output
10. **End Node**: Return security report

**Total estimated time**: 2-3 seconds with mock data (vs. 6s with real API)

### 4. Error-Proof Design

Real API testing revealed:
- Network errors (rate limiting)
- 404 responses for missing files
- Varying response times (200-1200ms)

**Mock service must**:
- Always return 200 status
- Consistent <100ms response times
- No external dependencies
- Predictable security score distribution

## Next Steps

1. ✅ API concept validated - Fast enough, data structures confirmed
2. ⏭️ Generate mock data from real API responses
3. ⏭️ Implement demo API route (`/app/api/demo-github-scanner/`)
4. ⏭️ Build 12-node workflow template
5. ⏭️ Create results display component

## Code Artifacts

- **Test script**: `/scripts/test-github-api.ts`
- **Results**: This document
- **Next**: Mock data generation based on real responses
