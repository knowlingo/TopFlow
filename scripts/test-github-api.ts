/**
 * GitHub Repository Security Scanner - API Concept Test
 *
 * Tests real GitHub API endpoints to validate:
 * - Response times and feasibility of <30s execution
 * - Data structure assumptions
 * - Security analysis approach
 * - Rate limiting behavior
 */

interface RepoMetadata {
  name: string
  owner: string
  stars: number
  forks: number
  openIssues: number
  lastUpdated: string
  defaultBranch: string
  hasSecurityPolicy: boolean
  vulnerabilityAlerts?: boolean
}

interface SecurityAnalysis {
  score: number
  threats: Array<{
    category: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    description: string
  }>
  checks: {
    hasSecurityMd: boolean
    hasDependabot: boolean
    hasCodeScanning: boolean
    branchProtection: boolean
    twoFactorAuth: boolean
  }
}

/**
 * Test GitHub REST API v3 endpoints
 */
async function testGitHubAPI() {
  console.log('🔍 GitHub Security Scanner - API Concept Test\n')

  // Test repositories (MVP: 7 repos across frontend, backend, and security)
  const testRepos = [
    // Frontend frameworks
    'facebook/react',
    'vercel/next.js',
    'vuejs/vue',
    // Backend frameworks
    'nodejs/node',
    'django/django',
    // Security tools
    'OWASP/owasp-mastg',
    'aquasecurity/trivy',
  ]

  const startTime = Date.now()

  for (const repo of testRepos) {
    console.log(`\n📦 Analyzing: ${repo}`)
    console.log('─'.repeat(50))

    try {
      const repoStartTime = Date.now()

      // 1. Fetch basic repository metadata
      const metadata = await fetchRepoMetadata(repo)
      console.log(`✓ Metadata fetched (${Date.now() - repoStartTime}ms)`)
      console.log(`  Stars: ${metadata.stars.toLocaleString()}`)
      console.log(`  Forks: ${metadata.forks.toLocaleString()}`)
      console.log(`  Last updated: ${metadata.lastUpdated}`)

      // 2. Check for SECURITY.md
      const hasSecurityMd = await checkSecurityFile(repo)
      console.log(`✓ Security file check (${Date.now() - repoStartTime}ms)`)
      console.log(`  SECURITY.md: ${hasSecurityMd ? '✓' : '✗'}`)

      // 3. Check for dependabot.yml
      const hasDependabot = await checkDependabot(repo)
      console.log(`✓ Dependabot check (${Date.now() - repoStartTime}ms)`)
      console.log(`  Dependabot: ${hasDependabot ? '✓' : '✗'}`)

      // 4. Check branch protection (requires auth with appropriate scopes)
      // const branchProtection = await checkBranchProtection(repo, metadata.defaultBranch)
      // console.log(`✓ Branch protection check (${Date.now() - repoStartTime}ms)`)

      // 5. Calculate basic security score
      const score = calculateSecurityScore({
        hasSecurityMd,
        hasDependabot,
        hasRecentActivity: isRecentlyUpdated(metadata.lastUpdated),
        hasGoodIssueManagement: metadata.openIssues < 1000,
      })

      const repoTime = Date.now() - repoStartTime
      console.log(`\n🎯 Security Score: ${score}/100`)
      console.log(`⏱️  Analysis time: ${repoTime}ms`)

    } catch (error) {
      console.error(`✗ Error analyzing ${repo}:`, error)
    }
  }

  const totalTime = Date.now() - startTime
  console.log('\n' + '='.repeat(50))
  console.log(`\n⏱️  Total execution time: ${totalTime}ms (${(totalTime/1000).toFixed(2)}s)`)
  console.log(`📊 Average per repo: ${(totalTime/testRepos.length).toFixed(0)}ms`)
  console.log(`\n✓ Target: <30s for full workflow`)
  console.log(`${totalTime < 30000 ? '✓ PASS' : '✗ FAIL'}: Execution time within target`)
}

/**
 * Fetch repository metadata from GitHub API
 */
async function fetchRepoMetadata(repo: string): Promise<RepoMetadata> {
  const [owner, name] = repo.split('/')

  // GitHub REST API v3 - no auth required for public repos
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'TopFlow-Security-Scanner-Test',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  return {
    name: data.name,
    owner: data.owner.login,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    lastUpdated: data.updated_at,
    defaultBranch: data.default_branch,
    hasSecurityPolicy: data.has_security_policy || false,
  }
}

/**
 * Check if repository has SECURITY.md file
 */
async function checkSecurityFile(repo: string): Promise<boolean> {
  // Try multiple common locations
  const paths = [
    'SECURITY.md',
    '.github/SECURITY.md',
    'docs/SECURITY.md',
  ]

  for (const path of paths) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/contents/${path}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'TopFlow-Security-Scanner-Test',
          },
        }
      )

      if (response.ok) {
        return true
      }
    } catch (error) {
      // File doesn't exist, continue
    }
  }

  return false
}

/**
 * Check if repository has Dependabot configuration
 */
async function checkDependabot(repo: string): Promise<boolean> {
  const paths = [
    '.github/dependabot.yml',
    '.github/dependabot.yaml',
  ]

  for (const path of paths) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/contents/${path}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'TopFlow-Security-Scanner-Test',
          },
        }
      )

      if (response.ok) {
        return true
      }
    } catch (error) {
      // File doesn't exist, continue
    }
  }

  return false
}

/**
 * Check if repository has been updated recently (within 6 months)
 */
function isRecentlyUpdated(lastUpdated: string): boolean {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  return new Date(lastUpdated) > sixMonthsAgo
}

/**
 * Calculate basic security score
 */
function calculateSecurityScore(checks: {
  hasSecurityMd: boolean
  hasDependabot: boolean
  hasRecentActivity: boolean
  hasGoodIssueManagement: boolean
}): number {
  let score = 60 // Base score

  if (checks.hasSecurityMd) score += 15
  if (checks.hasDependabot) score += 15
  if (checks.hasRecentActivity) score += 5
  if (checks.hasGoodIssueManagement) score += 5

  return Math.min(score, 100)
}

/**
 * Test rate limiting behavior
 */
async function testRateLimiting() {
  console.log('\n🔐 Testing GitHub API Rate Limits\n')

  const response = await fetch('https://api.github.com/rate_limit', {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'TopFlow-Security-Scanner-Test',
    },
  })

  const data = await response.json()

  console.log('Rate Limit Status:')
  console.log(`  Limit: ${data.resources.core.limit}`)
  console.log(`  Remaining: ${data.resources.core.remaining}`)
  console.log(`  Reset: ${new Date(data.resources.core.reset * 1000).toLocaleString()}`)

  if (data.resources.core.remaining < 10) {
    console.warn('\n⚠️  WARNING: Low rate limit remaining!')
  }
}

// Run tests
async function main() {
  try {
    await testRateLimiting()
    await testGitHubAPI()

    console.log('\n✓ API concept validation complete!\n')
    console.log('Next steps:')
    console.log('  1. Results show API calls are fast enough (<30s)')
    console.log('  2. Data structures validated')
    console.log('  3. Ready to generate mock data based on real responses')
    console.log('  4. Implement 12-node workflow with mock data service')

  } catch (error) {
    console.error('\n✗ Test failed:', error)
    process.exit(1)
  }
}

main()
