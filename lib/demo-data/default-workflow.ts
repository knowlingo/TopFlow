/**
 * Demo data for the default "Threat Intelligence Report Generator" workflow
 * Template ID: template-threat-intel (default workflow)
 *
 * This workflow demonstrates:
 * - Real-world security use case
 * - Multiple node types (HTTP, JavaScript, Conditional, Text Model, Structured Output, Image Gen)
 * - Professional visual output (threat map)
 * - Immediate "wow effect" for new users
 */

import type { DemoResult } from "./types"

/**
 * Pre-generated demo result for Threat Intelligence workflow
 *
 * Workflow structure (11 nodes):
 * Start → HTTP (threat feed) → JavaScript (risk calc) → Conditional (risk > 75?)
 *   ├─ TRUE → Prompt (urgent alert) → GPT-4 → Structured Output → Viz Prompt → Image → End
 *   └─ FALSE → Prompt (standard) → GPT-4 → Structured Output → Viz Prompt → Image → End
 */
export const DEFAULT_WORKFLOW_DEMO: DemoResult = {
  templateId: "template-threat-intel",
  workflowName: "Threat Intelligence Report Generator",
  outputs: {},
  nodeResults: {
    // Node 1: Start
    "threat-start": {
      nodeId: "threat-start",
      nodeType: "start",
      output: "Analyze latest threat intelligence",
      duration: 100,
      status: "completed",
    },

    // Node 2: HTTP Request - Fetch threat data
    "threat-http": {
      nodeId: "threat-http",
      nodeType: "httpRequest",
      output: {
        status: 200,
        data: {
          timestamp: "2026-01-07T10:00:00Z",
          threats: [
            {
              id: "CVE-2026-1234",
              severity: "CRITICAL",
              cvss: 9.8,
              title: "Apache Struts Remote Code Execution",
              description:
                "Unauthenticated remote code execution in Apache Struts 2.x",
              affected_systems: [
                "web-server-01",
                "web-server-02",
                "api-gateway",
              ],
              published: "2026-01-06",
              exploit_available: true,
            },
            {
              id: "CVE-2026-5678",
              severity: "CRITICAL",
              cvss: 9.1,
              title: "GitLab Authentication Bypass",
              description:
                "Authentication bypass allowing unauthorized repository access",
              affected_systems: ["gitlab-enterprise"],
              published: "2026-01-05",
              exploit_available: false,
            },
            {
              id: "APT-29-PHISH",
              severity: "HIGH",
              cvss: 7.8,
              title: "APT-29 Phishing Campaign",
              description:
                "Sophisticated spear-phishing targeting financial sector",
              affected_systems: ["email-gateway"],
              published: "2026-01-04",
              exploit_available: true,
            },
          ],
          summary: {
            total_threats: 3,
            critical: 2,
            high: 1,
            medium: 0,
            low: 0,
          },
        },
        headers: {
          "content-type": "application/json",
        },
      },
      duration: 1200,
      status: "completed",
    },

    // Node 3: JavaScript - Calculate risk score
    "threat-calc": {
      nodeId: "threat-calc",
      nodeType: "javascript",
      output: {
        risk_score: 87,
        priority: "CRITICAL",
        critical_count: 2,
        high_count: 1,
        exploitable_count: 2,
        total_threats: 3,
        timestamp: "2026-01-07T10:00:01Z",
      },
      duration: 800,
      status: "completed",
    },

    // Node 4: Conditional - Check if critical (risk_score > 75)
    "threat-cond": {
      nodeId: "threat-cond",
      nodeType: "conditional",
      output: true, // Risk score is 87, so TRUE branch
      duration: 500,
      status: "completed",
    },

    // Node 5: Prompt - Critical alert (TRUE branch)
    "threat-prompt-critical": {
      nodeId: "threat-prompt-critical",
      nodeType: "prompt",
      output: `URGENT THREAT ALERT

You are a cybersecurity analyst. Generate an executive-level threat intelligence report based on this data:

Risk Score: 87/100
Priority: CRITICAL
Critical Threats: 2
Active Exploits: 2

Format: Professional executive summary with:
1. Overview (2-3 sentences)
2. Critical threats list
3. Affected systems
4. Recommended immediate actions

Tone: Urgent but professional.`,
      duration: 200,
      status: "completed",
    },

    // Node 6: Text Model - Generate threat report with GPT-4
    "threat-text-model": {
      nodeId: "threat-text-model",
      nodeType: "textModel",
      output: {
        type: "text",
        content: `THREAT INTELLIGENCE REPORT
Generated: January 7, 2026 10:00 UTC

═══════════════════════════════════════

EXECUTIVE SUMMARY

High-priority threat activity detected with a risk score of 87/100. Three significant vulnerabilities identified, including two CRITICAL-severity CVEs with available exploits. Immediate action required to protect web infrastructure and source code repositories.

CRITICAL THREATS REQUIRING IMMEDIATE ATTENTION

1. CVE-2026-1234 (CVSS 9.8) - Apache Struts Remote Code Execution
   • Impact: Unauthenticated attackers can execute arbitrary code
   • Affected: Web servers (web-server-01, web-server-02, api-gateway)
   • Status: Public exploit available - ACTIVE THREAT
   • Timeline: Patch within 24 hours

2. CVE-2026-5678 (CVSS 9.1) - GitLab Authentication Bypass
   • Impact: Unauthorized access to private code repositories
   • Affected: GitLab Enterprise instance
   • Status: No public exploit yet, but vulnerability disclosed
   • Timeline: Emergency patch required within 48 hours

3. APT-29 Phishing Campaign (CVSS 7.8)
   • Impact: Credential theft via sophisticated spear-phishing
   • Affected: Email gateway, potential employee accounts
   • Status: Active campaign targeting financial sector
   • Timeline: Enhanced monitoring and user training immediate

AFFECTED INFRASTRUCTURE

• Web Application Tier: 3 servers requiring emergency patching
• DevOps Platform: GitLab Enterprise instance at risk
• Email Security: Gateway exposed to advanced phishing tactics

RECOMMENDED IMMEDIATE ACTIONS

1. EMERGENCY PATCHING (Priority 1 - 0-24 hours)
   □ Deploy patches for CVE-2026-1234 and CVE-2026-5678
   □ Implement temporary WAF rules if patching delayed
   □ Verify patch deployment across all affected systems

2. SECURITY POSTURE (Priority 2 - 0-48 hours)
   □ Enable enhanced email security filtering
   □ Deploy phishing awareness training for all staff
   □ Increase SOC monitoring for APT-29 indicators

3. INCIDENT RESPONSE (Priority 3 - Ongoing)
   □ Brief incident response team on current threats
   □ Prepare communication templates for potential breach
   □ Document response actions for compliance reporting

RISK ASSESSMENT

Current Threat Level: CRITICAL (87/100)
Exploitable Vulnerabilities: 2 of 3
Estimated Time to Compromise: < 24 hours without mitigation
Recommended Response Time: Immediate (P1 incident)

This report should be distributed to CISO, SOC leadership, and infrastructure teams immediately.`,
      },
      duration: 2800,
      status: "completed",
    },

    // Node 7: Structured Output - Extract action items
    "threat-structured": {
      nodeId: "threat-structured",
      nodeType: "structuredOutput",
      output: {
        type: "structured",
        schema: "ThreatActions",
        data: {
          affected_systems: [
            "web-server-01",
            "web-server-02",
            "api-gateway",
            "gitlab-enterprise",
            "email-gateway",
          ],
          attack_vectors: [
            "Remote Code Execution",
            "Authentication Bypass",
            "Spear Phishing",
            "Credential Theft",
          ],
          mitigations: [
            {
              action: "Emergency patch deployment for CVE-2026-1234",
              priority: "P1",
              deadline: "24 hours",
              responsible_team: "Infrastructure Team",
            },
            {
              action: "GitLab Enterprise security update (CVE-2026-5678)",
              priority: "P1",
              deadline: "48 hours",
              responsible_team: "DevOps Team",
            },
            {
              action: "Enhanced email security filtering deployment",
              priority: "P2",
              deadline: "48 hours",
              responsible_team: "Security Operations",
            },
            {
              action: "Phishing awareness training campaign",
              priority: "P2",
              deadline: "1 week",
              responsible_team: "Security Awareness Team",
            },
          ],
          compliance_requirements: [
            "Document incident response actions for SOC 2 audit",
            "Prepare breach notification templates (GDPR Article 33)",
            "Log all security events for compliance reporting",
          ],
        },
      },
      duration: 2000,
      status: "completed",
    },

    // Node 8: Prompt - Visualization instructions
    "threat-viz-prompt": {
      nodeId: "threat-viz-prompt",
      nodeType: "prompt",
      output: `Create a professional cybersecurity threat map visualization with the following elements:

THREAT LANDSCAPE:
- CVE-2026-1234 (Apache Struts RCE) - CRITICAL severity
- CVE-2026-5678 (GitLab Auth Bypass) - CRITICAL severity
- APT-29 Phishing Campaign - HIGH severity

AFFECTED SYSTEMS:
- Web Servers (3 instances)
- GitLab Enterprise
- Email Gateway

VISUALIZATION STYLE:
- Network diagram style with nodes and connections
- Color-coded threat severity (red=critical, orange=high)
- Show attack vectors as arrows between threat actors and systems
- Include risk heat zones
- Professional SOC dashboard aesthetic
- Dark background with bright accent colors
- Clean, modern design suitable for executive presentation

Create a threat intelligence dashboard that looks professional and actionable.`,
      duration: 200,
      status: "completed",
    },

    // Node 9: Image Generation - Threat map
    "threat-image": {
      nodeId: "threat-image",
      nodeType: "imageGeneration",
      output: {
        type: "image",
        url: "/demo-assets/images/threat-intelligence-map.webp",
        format: "webp",
        dimensions: { width: 1920, height: 1080 },
        text: "A professional cybersecurity threat map showing attack vectors, affected systems, and risk levels",
      },
      duration: 3500,
      status: "completed",
    },

    // Node 10: End - Display final results
    "threat-end": {
      nodeId: "threat-end",
      nodeType: "end",
      output: {
        report: `THREAT INTELLIGENCE REPORT
Generated: January 7, 2026 10:00 UTC

═══════════════════════════════════════

EXECUTIVE SUMMARY

High-priority threat activity detected with a risk score of 87/100. Three significant vulnerabilities identified, including two CRITICAL-severity CVEs with available exploits. Immediate action required to protect web infrastructure and source code repositories.

CRITICAL THREATS REQUIRING IMMEDIATE ATTENTION

1. CVE-2026-1234 (CVSS 9.8) - Apache Struts Remote Code Execution
   • Impact: Unauthenticated attackers can execute arbitrary code
   • Affected: Web servers (web-server-01, web-server-02, api-gateway)
   • Status: Public exploit available - ACTIVE THREAT
   • Timeline: Patch within 24 hours

2. CVE-2026-5678 (CVSS 9.1) - GitLab Authentication Bypass
   • Impact: Unauthorized access to private code repositories
   • Affected: GitLab Enterprise instance
   • Status: No public exploit yet, but vulnerability disclosed
   • Timeline: Emergency patch required within 48 hours

3. APT-29 Phishing Campaign (CVSS 7.8)
   • Impact: Credential theft via sophisticated spear-phishing
   • Affected: Email gateway, potential employee accounts
   • Status: Active campaign targeting financial sector
   • Timeline: Enhanced monitoring and user training immediate

RISK ASSESSMENT

Current Threat Level: CRITICAL (87/100)
Exploitable Vulnerabilities: 2 of 3
Estimated Time to Compromise: < 24 hours without mitigation
Recommended Response Time: Immediate (P1 incident)`,
        threat_map: "/demo-assets/images/threat-intelligence-map.webp",
        structured_data: {
          affected_systems: [
            "web-server-01",
            "web-server-02",
            "api-gateway",
            "gitlab-enterprise",
            "email-gateway",
          ],
          attack_vectors: [
            "Remote Code Execution",
            "Authentication Bypass",
            "Spear Phishing",
            "Credential Theft",
          ],
          mitigations: [
            {
              action: "Emergency patch deployment for CVE-2026-1234",
              priority: "P1",
              deadline: "24 hours",
              responsible_team: "Infrastructure Team",
            },
            {
              action: "GitLab Enterprise security update (CVE-2026-5678)",
              priority: "P1",
              deadline: "48 hours",
              responsible_team: "DevOps Team",
            },
            {
              action: "Enhanced email security filtering deployment",
              priority: "P2",
              deadline: "48 hours",
              responsible_team: "Security Operations",
            },
            {
              action: "Phishing awareness training campaign",
              priority: "P2",
              deadline: "1 week",
              responsible_team: "Security Awareness Team",
            },
          ],
        },
      },
      duration: 100,
      status: "completed",
    },
  },
  executionTime: 11400, // Total ms (~11.4 seconds simulated)
  timestamp: new Date().toISOString(),
  metadata: {
    aiModelsUsed: ["gpt-4o", "gemini-2.5-flash-image"],
    apiCalls: 2, // Text generation + Image generation
    dataSources: ["threat-intelligence-feed"],
  },
}

/**
 * Alternative demo for standard (non-critical) threat scenario
 * Used when risk_score <= 75 (FALSE branch of conditional)
 */
export const DEFAULT_WORKFLOW_DEMO_ALT: DemoResult = {
  templateId: "template-threat-intel",
  workflowName: "Threat Intelligence Report Generator (Standard)",
  outputs: {},
  nodeResults: {
    "threat-start": {
      nodeId: "threat-start",
      nodeType: "start",
      output: "Analyze latest threat intelligence",
      duration: 100,
      status: "completed",
    },

    "threat-http": {
      nodeId: "threat-http",
      nodeType: "httpRequest",
      output: {
        status: 200,
        data: {
          timestamp: "2026-01-07T10:00:00Z",
          threats: [
            {
              id: "CVE-2026-3456",
              severity: "MEDIUM",
              cvss: 6.5,
              title: "WordPress Plugin XSS Vulnerability",
              description: "Cross-site scripting in popular WordPress plugin",
              affected_systems: ["marketing-website"],
              published: "2026-01-05",
              exploit_available: false,
            },
            {
              id: "CVE-2026-7890",
              severity: "MEDIUM",
              cvss: 5.8,
              title: "Node.js Dependency Update",
              description: "Minor security fix in Express.js dependency",
              affected_systems: ["api-backend"],
              published: "2026-01-03",
              exploit_available: false,
            },
          ],
          summary: {
            total_threats: 2,
            critical: 0,
            high: 0,
            medium: 2,
            low: 0,
          },
        },
        headers: {
          "content-type": "application/json",
        },
      },
      duration: 1200,
      status: "completed",
    },

    "threat-calc": {
      nodeId: "threat-calc",
      nodeType: "javascript",
      output: {
        risk_score: 40,
        priority: "MEDIUM",
        critical_count: 0,
        high_count: 0,
        exploitable_count: 0,
        total_threats: 2,
        timestamp: "2026-01-07T10:00:01Z",
      },
      duration: 800,
      status: "completed",
    },

    "threat-cond": {
      nodeId: "threat-cond",
      nodeType: "conditional",
      output: false, // Risk score is 40, so FALSE branch
      duration: 500,
      status: "completed",
    },

    "threat-prompt-standard": {
      nodeId: "threat-prompt-standard",
      nodeType: "prompt",
      output: `THREAT INTELLIGENCE SUMMARY

Generate a standard threat intelligence report based on this data:

Risk Score: 40/100
Priority: MEDIUM
Total Threats: 2

Format: Professional summary with context and recommendations.`,
      duration: 200,
      status: "completed",
    },

    "threat-text-model": {
      nodeId: "threat-text-model",
      nodeType: "textModel",
      output: {
        type: "text",
        content: `THREAT INTELLIGENCE SUMMARY
Generated: January 7, 2026 10:00 UTC

═══════════════════════════════════════

OVERVIEW

Routine threat monitoring has identified 2 medium-severity vulnerabilities requiring attention during the next maintenance window. Current risk score is 40/100, indicating normal operational security posture. No immediate emergency actions required.

IDENTIFIED VULNERABILITIES

1. CVE-2026-3456 (CVSS 6.5) - WordPress Plugin XSS
   • Impact: Potential cross-site scripting on marketing website
   • Affected: Marketing website (public-facing)
   • Status: Patch available, no active exploitation detected
   • Timeline: Apply during next scheduled maintenance (within 7 days)

2. CVE-2026-7890 (CVSS 5.8) - Node.js Dependency Update
   • Impact: Minor security improvement in Express.js
   • Affected: API backend services
   • Status: Routine dependency update
   • Timeline: Include in next deployment cycle (within 14 days)

AFFECTED SYSTEMS

• Marketing Website: WordPress plugin requires update
• API Backend: Express.js dependency patch recommended

RECOMMENDED ACTIONS

1. SCHEDULED MAINTENANCE (Priority 3 - 7 days)
   □ Update WordPress plugin on marketing website
   □ Test plugin compatibility in staging environment
   □ Deploy during low-traffic maintenance window

2. DEPENDENCY UPDATES (Priority 3 - 14 days)
   □ Update Express.js to latest patched version
   □ Run comprehensive test suite before deployment
   □ Monitor application performance post-update

3. ONGOING MONITORING
   □ Continue routine vulnerability scanning
   □ Review security advisories for newly disclosed threats
   □ Maintain patch management schedule

RISK ASSESSMENT

Current Threat Level: MEDIUM (40/100)
Exploitable Vulnerabilities: 0 of 2
Estimated Time to Compromise: Low risk, no immediate threat
Recommended Response: Standard patch management process

Security posture remains strong. Continue with routine monitoring and maintenance procedures.`,
      },
      duration: 2500,
      status: "completed",
    },

    "threat-structured": {
      nodeId: "threat-structured",
      nodeType: "structuredOutput",
      output: {
        type: "structured",
        schema: "ThreatActions",
        data: {
          affected_systems: ["marketing-website", "api-backend"],
          attack_vectors: ["Cross-Site Scripting", "Dependency Vulnerability"],
          mitigations: [
            {
              action: "WordPress plugin security update",
              priority: "P3",
              deadline: "7 days",
              responsible_team: "Web Team",
            },
            {
              action: "Express.js dependency update",
              priority: "P3",
              deadline: "14 days",
              responsible_team: "Backend Team",
            },
          ],
          compliance_requirements: [
            "Document patch application for audit trail",
            "Update vulnerability management records",
          ],
        },
      },
      duration: 2000,
      status: "completed",
    },

    "threat-viz-prompt": {
      nodeId: "threat-viz-prompt",
      nodeType: "prompt",
      output: `Create a security status dashboard showing routine maintenance items:

VULNERABILITIES:
- CVE-2026-3456 (WordPress XSS) - MEDIUM severity
- CVE-2026-7890 (Node.js Update) - MEDIUM severity

AFFECTED SYSTEMS:
- Marketing Website
- API Backend

VISUALIZATION STYLE:
- Clean security dashboard layout
- Green/yellow color scheme (no critical threats)
- Status indicators showing "Under Control"
- Maintenance timeline
- Professional but calm aesthetic
- Light background suitable for daytime operations

Create a security dashboard showing normal operations and routine maintenance.`,
      duration: 200,
      status: "completed",
    },

    "threat-image": {
      nodeId: "threat-image",
      nodeType: "imageGeneration",
      output: {
        type: "image",
        url: "/demo-assets/images/threat-status-normal.webp",
        format: "webp",
        dimensions: { width: 1920, height: 1080 },
        text: "Security status dashboard showing normal operations with routine maintenance items",
      },
      duration: 3500,
      status: "completed",
    },

    "threat-end": {
      nodeId: "threat-end",
      nodeType: "end",
      output: {
        report: `THREAT INTELLIGENCE SUMMARY
Generated: January 7, 2026 10:00 UTC

OVERVIEW: Routine threat monitoring has identified 2 medium-severity vulnerabilities requiring attention during the next maintenance window. Current risk score is 40/100, indicating normal operational security posture.

RISK ASSESSMENT: Current Threat Level: MEDIUM (40/100)
Exploitable Vulnerabilities: 0 of 2
Recommended Response: Standard patch management process

Security posture remains strong.`,
        threat_map: "/demo-assets/images/threat-status-normal.webp",
        structured_data: {
          affected_systems: ["marketing-website", "api-backend"],
          attack_vectors: ["Cross-Site Scripting", "Dependency Vulnerability"],
          mitigations: [
            {
              action: "WordPress plugin security update",
              priority: "P3",
              deadline: "7 days",
              responsible_team: "Web Team",
            },
            {
              action: "Express.js dependency update",
              priority: "P3",
              deadline: "14 days",
              responsible_team: "Backend Team",
            },
          ],
        },
      },
      duration: 100,
      status: "completed",
    },
  },
  executionTime: 10900,
  timestamp: new Date().toISOString(),
  metadata: {
    aiModelsUsed: ["gpt-4o", "gemini-2.5-flash-image"],
    apiCalls: 2,
    dataSources: ["threat-intelligence-feed"],
  },
}

/**
 * Get demo result for default workflow
 * Returns critical threat scenario (more impressive for first-time users)
 */
export function getDefaultWorkflowDemo(): DemoResult {
  // Always return critical scenario for demo mode (more impressive)
  // In a real implementation, you might randomize or let users choose
  return DEFAULT_WORKFLOW_DEMO
}
