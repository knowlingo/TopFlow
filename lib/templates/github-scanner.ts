/**
 * GitHub Repository Security Scanner - Workflow Template
 *
 * A comprehensive 12-node workflow that analyzes GitHub repositories for security issues
 * Demonstrates security-first AI workflow orchestration
 *
 * Features:
 * - URL parsing and validation
 * - Parallel metadata and security data fetching
 * - Weighted security score calculation
 * - Conditional branching based on grade
 * - AI-powered security analysis
 * - Structured recommendation extraction
 * - Visual dashboard generation
 *
 * @see /docs/repositioning-proposal/00-open-source-prep/01-github-repo-security-scanner-demo/
 */

import { type Node, type Edge } from "@xyflow/react"

// ============================================================================
// Node Definitions (12 Nodes)
// ============================================================================

export const GITHUB_SCANNER_NODES: Node[] = [
  // Node 1: Start - GitHub URL Input
  {
    id: "start",
    type: "start",
    position: { x: 100, y: 300 },
    data: {
      label: "GitHub Repository URL",
      placeholder: "https://github.com/owner/repo",
      inputType: "url",
      defaultValue: "https://github.com/facebook/react",
      status: "idle"
    }
  },

  // Node 2: JavaScript - Parse Repository URL
  {
    id: "extract-repo",
    type: "javascript",
    position: { x: 320, y: 300 },
    data: {
      label: "Parse Repository",
      code: `// Extract owner/repo from GitHub URL
const patterns = [
  /github\\.com\\/([^/]+)\\/([^/]+)/,
  /^([^/]+)\\/([^/]+)$/
];

for (const pattern of patterns) {
  const match = input1.match(pattern);
  if (match) {
    const owner = match[1];
    const repo = match[2].replace(/\\.git$/, '');
    return {
      owner: owner,
      repo: repo,
      fullName: owner + '/' + repo
    };
  }
}

throw new Error('Invalid GitHub URL format');`,
      status: "idle"
    }
  },

  // Node 3: HTTP Request - Fetch Repository Metadata
  {
    id: "fetch-metadata",
    type: "httpRequest",
    position: { x: 540, y: 200 },
    data: {
      label: "Fetch Repo Metadata",
      url: "https://api.github.com/repos/$input1.fullName",
      method: "GET",
      headers: JSON.stringify({ "Accept": "application/vnd.github+json" }, null, 2),
      status: "idle"
    }
  },

  // Node 4: HTTP Request - Fetch Security Analysis
  {
    id: "fetch-security",
    type: "httpRequest",
    position: { x: 540, y: 400 },
    data: {
      label: "Security Scan",
      url: "/api/demo/github-scan/$input1.fullName",
      method: "GET",
      headers: JSON.stringify({ "Accept": "application/json" }, null, 2),
      status: "idle"
    }
  },

  // Node 5: JavaScript - Calculate Security Score
  {
    id: "calculate-score",
    type: "javascript",
    position: { x: 760, y: 300 },
    data: {
      label: "Calculate Score",
      code: `// Calculate comprehensive security score from analysis data
const security = input2;

// Extract vulnerability counts
const vulnCritical = security.vulnerabilities?.critical || 0;
const vulnHigh = security.vulnerabilities?.high || 0;
const vulnMedium = security.vulnerabilities?.medium || 0;
const vulnLow = security.vulnerabilities?.low || 0;

// Vulnerability score (35% weight)
const vulnScore = Math.max(0, 100 -
  (vulnCritical * 30) -
  (vulnHigh * 20) -
  (vulnMedium * 10) -
  (vulnLow * 2)
);

// Dependency score (25% weight)
const depVuln = security.dependencyAudit?.vulnerable || 0;
const depOutdated = security.dependencyAudit?.outdated || 0;
const depScore = Math.max(0, 100 - (depVuln * 15) - (depOutdated * 0.3));

// Security practices score (25% weight)
const practices = security.securityPractices || {};
const practiceCount = Object.values(practices).filter(v => v === true).length;
const practiceTotal = Object.keys(practices).length || 1;
const practiceScore = (practiceCount / practiceTotal) * 100;

// OWASP compliance score (15% weight)
const owasp = security.owaspCompliance || {};
const owaspPass = Object.values(owasp).filter(v => v === "PASS").length;
const owaspTotal = Object.keys(owasp).length || 1;
const owaspScore = (owaspPass / owaspTotal) * 100;

// Calculate final weighted score
const finalScore = Math.round(
  (vulnScore * 0.35) +
  (depScore * 0.25) +
  (practiceScore * 0.25) +
  (owaspScore * 0.15)
);

// Determine grade
let grade;
if (finalScore >= 95) grade = "A+";
else if (finalScore >= 90) grade = "A";
else if (finalScore >= 85) grade = "A-";
else if (finalScore >= 80) grade = "B+";
else if (finalScore >= 70) grade = "B";
else if (finalScore >= 60) grade = "C+";
else if (finalScore >= 50) grade = "C";
else grade = "D";

return {
  score: finalScore,
  grade: grade,
  components: {
    vulnerability: Math.round(vulnScore),
    dependency: Math.round(depScore),
    practices: Math.round(practiceScore),
    owasp: Math.round(owaspScore)
  },
  breakdown: {
    vulnerabilities: { critical: vulnCritical, high: vulnHigh, medium: vulnMedium, low: vulnLow },
    dependencies: { vulnerable: depVuln, outdated: depOutdated }
  }
};`,
      status: "idle"
    }
  },

  // Node 6: Conditional - Grade Check
  {
    id: "grade-check",
    type: "conditional",
    position: { x: 980, y: 300 },
    data: {
      label: "Grade Check",
      condition: "input1.score >= 80",
      status: "idle"
    }
  },

  // Node 7: Prompt - Excellence Report (True Branch)
  {
    id: "prompt-excellent",
    type: "prompt",
    position: { x: 1200, y: 180 },
    data: {
      label: "Excellence Report",
      template: `🎉 SECURITY EXCELLENCE REPORT

Repository: $input1.fullName
Security Score: $input2.score/100 (Grade: $input2.grade)
Stars: $input3.stars | Forks: $input3.forks | Language: $input3.language

Generate a congratulatory security analysis report highlighting:

1. **Top Security Strengths**: Identify 3 exceptional security practices
2. **Why This Matters**: Explain why this repository sets a security standard
3. **Minor Enhancements**: 2-3 low-effort improvements that could boost the score
4. **Security Badges**: Recommend which security badges to display in README

Tone: Professional but celebratory. Focus on positive reinforcement.`,
      status: "idle"
    }
  },

  // Node 8: Prompt - Improvement Report (False Branch)
  {
    id: "prompt-improve",
    type: "prompt",
    position: { x: 1200, y: 420 },
    data: {
      label: "Improvement Report",
      template: `📊 SECURITY IMPROVEMENT REPORT

Repository: $input1.fullName
Security Score: $input2.score/100 (Grade: $input2.grade)
Stars: $input3.stars | Forks: $input3.forks | Language: $input3.language

Vulnerability Summary:
- Critical: $input2.breakdown.vulnerabilities.critical
- High: $input2.breakdown.vulnerabilities.high
- Medium: $input2.breakdown.vulnerabilities.medium
- Low: $input2.breakdown.vulnerabilities.low

Generate a constructive security improvement report with:

1. **Current Strengths**: What security practices are already in place
2. **Priority Fixes**: Top 5 security improvements ranked by impact
3. **Step-by-Step Guide**: Detailed instructions for each fix
4. **Effort Estimates**: Time required for each improvement
5. **Expected Impact**: How much each fix will improve the security score

Tone: Supportive and actionable. Make improvements feel achievable.`,
      status: "idle"
    }
  },

  // Node 9: Text Model - AI Security Analysis
  {
    id: "ai-analysis",
    type: "textModel",
    position: { x: 1420, y: 300 },
    data: {
      label: "AI Security Analysis",
      model: "gpt-4-turbo",
      temperature: 0.3,
      maxTokens: 1000,
      status: "idle"
    }
  },

  // Node 10: Structured Output - Extract Actionable Items
  {
    id: "extract-actions",
    type: "structuredOutput",
    position: { x: 1640, y: 300 },
    data: {
      label: "Extract Actions",
      schema: JSON.stringify({
        summary: "string",
        score: "number",
        grade: "string",
        strengths: ["string"],
        criticalFindings: ["string"],
        recommendations: [{
          priority: "HIGH | MEDIUM | LOW",
          action: "string",
          effort: "string",
          impact: "string",
          steps: ["string"]
        }],
        badges: {
          security: "string",
          coverage: "number",
          maintained: "boolean"
        },
        nextSteps: ["string"]
      }, null, 2),
      status: "idle"
    }
  },

  // Node 11: Image Generation - Security Dashboard Visualization
  {
    id: "generate-visual",
    type: "imageGeneration",
    position: { x: 1860, y: 300 },
    data: {
      label: "Generate Dashboard",
      model: "dall-e-3",
      size: "1792x1024",
      prompt: `Create a professional security dashboard visualization for a GitHub repository:

Repository: $input1.fullName
Security Score: $input2.score/100 ($input2.grade grade)

Design requirements:
- Circular gauge showing the security score (0-100) in the center
- Color-coded vulnerability breakdown chart (Critical=red, High=orange, Medium=yellow, Low=blue)
- OWASP Top 10 compliance matrix with checkmarks and warnings
- Dependency health metrics with bar charts
- Security practices checklist with icons
- Dark theme with GitHub-inspired colors (#161B22 background, #0D1117 cards)
- Professional security tool aesthetic with subtle gradients
- Clean, modern typography (Inter or system-ui font)
- Security shield icon or badge in the corner

Style: Cybersecurity dashboard, professional, data visualization, dark mode, GitHub colors`,
      status: "idle"
    }
  },

  // Node 12: End - Display Results
  {
    id: "end",
    type: "end",
    position: { x: 2080, y: 300 },
    data: {
      label: "Display Results",
      status: "idle"
    }
  }
]

// ============================================================================
// Edge Definitions (11 Connections)
// ============================================================================

export const GITHUB_SCANNER_EDGES: Edge[] = [
  {
    id: "e1",
    source: "start",
    target: "extract-repo",
    label: "URL"
  },
  {
    id: "e2",
    source: "extract-repo",
    target: "fetch-metadata",
    label: "owner/repo"
  },
  {
    id: "e3",
    source: "extract-repo",
    target: "fetch-security",
    label: "owner/repo"
  },
  {
    id: "e4",
    source: "fetch-metadata",
    target: "calculate-score",
    label: "metadata"
  },
  {
    id: "e5",
    source: "fetch-security",
    target: "calculate-score",
    label: "security"
  },
  {
    id: "e6",
    source: "calculate-score",
    target: "grade-check",
    label: "score"
  },
  {
    id: "e7-true",
    source: "grade-check",
    target: "prompt-excellent",
    sourceHandle: "true",
    label: "✅ Excellent"
  },
  {
    id: "e7-false",
    source: "grade-check",
    target: "prompt-improve",
    sourceHandle: "false",
    label: "⚠️ Needs Work"
  },
  {
    id: "e8a",
    source: "prompt-excellent",
    target: "ai-analysis",
    label: "prompt"
  },
  {
    id: "e8b",
    source: "prompt-improve",
    target: "ai-analysis",
    label: "prompt"
  },
  {
    id: "e9",
    source: "ai-analysis",
    target: "extract-actions",
    label: "analysis"
  },
  {
    id: "e10",
    source: "extract-actions",
    target: "generate-visual",
    label: "data"
  },
  {
    id: "e11",
    source: "generate-visual",
    target: "end",
    label: "dashboard"
  }
]

// ============================================================================
// Template Metadata
// ============================================================================

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  featured: boolean
  demoEnabled: boolean
  workflow: {
    nodes: Node[]
    edges: Edge[]
  }
  metadata: {
    author: string
    version: string
    lastUpdated: string
    estimatedTime: string
    requiresApiKey: boolean
  }
  preview?: {
    image: string
    video?: string
  }
}

export const GITHUB_SCANNER_TEMPLATE: WorkflowTemplate = {
  id: "github-security-scanner",
  name: "GitHub Repository Security Scanner",
  description: "Analyze any GitHub repository for security vulnerabilities, code quality, and compliance issues in under 30 seconds. Generates comprehensive security reports with actionable recommendations.",
  category: "Security",
  tags: ["security", "github", "demo", "popular", "compliance", "owasp"],
  featured: true,
  demoEnabled: true,

  workflow: {
    nodes: GITHUB_SCANNER_NODES,
    edges: GITHUB_SCANNER_EDGES
  },

  metadata: {
    author: "TopFlow",
    version: "1.0.0",
    lastUpdated: "2026-01-12",
    estimatedTime: "30 seconds",
    requiresApiKey: false // Demo mode doesn't require API keys
  },

  preview: {
    image: "/templates/github-scanner-preview.webp"
  }
}

// ============================================================================
// Template Registration Helper
// ============================================================================

/**
 * Get the GitHub Scanner template
 * Use this to load the template in the builder
 */
export function getGitHubScannerTemplate(): WorkflowTemplate {
  return GITHUB_SCANNER_TEMPLATE
}

/**
 * Get template by ID
 * For dynamic template loading
 */
export function getTemplateById(id: string): WorkflowTemplate | null {
  if (id === "github-security-scanner") {
    return GITHUB_SCANNER_TEMPLATE
  }
  return null
}
