/**
 * Demo Threat Intelligence API Endpoint
 *
 * Provides realistic threat data for the default "Threat Intelligence Report Generator" workflow.
 * This endpoint simulates a threat intelligence feed aggregator.
 *
 * Used in demo mode to avoid external API dependencies.
 */

import { NextResponse } from "next/server"

export const runtime = "edge"

/**
 * GET /api/demo-threat-intel
 *
 * Returns simulated threat intelligence data including CVEs and active campaigns
 */
export async function GET() {
  // Simulate realistic API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Return randomized threat scenario (80% critical, 20% normal)
  const isCritical = Math.random() > 0.2

  if (isCritical) {
    // Critical threat scenario
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      threats: [
        {
          id: "CVE-2026-1234",
          severity: "CRITICAL",
          cvss: 9.8,
          title: "Apache Struts Remote Code Execution",
          description:
            "Unauthenticated remote code execution vulnerability in Apache Struts 2.x framework. Attackers can execute arbitrary commands on affected servers.",
          affected_systems: ["web-server-01", "web-server-02", "api-gateway"],
          published: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
          exploit_available: true,
          references: [
            "https://nvd.nist.gov/vuln/detail/CVE-2026-1234",
            "https://struts.apache.org/security.html",
          ],
          patch_available: true,
          attack_complexity: "LOW",
          privileges_required: "NONE",
        },
        {
          id: "CVE-2026-5678",
          severity: "CRITICAL",
          cvss: 9.1,
          title: "GitLab Authentication Bypass",
          description:
            "Critical authentication bypass vulnerability allowing unauthorized access to private repositories and sensitive source code.",
          affected_systems: ["gitlab-enterprise"],
          published: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
          exploit_available: false,
          references: [
            "https://about.gitlab.com/releases/categories/releases/",
          ],
          patch_available: true,
          attack_complexity: "LOW",
          privileges_required: "NONE",
        },
        {
          id: "APT-29-PHISH",
          severity: "HIGH",
          cvss: 7.8,
          title: "APT-29 Phishing Campaign",
          description:
            "Advanced persistent threat group APT-29 (Cozy Bear) conducting sophisticated spear-phishing campaign targeting financial sector organizations.",
          affected_systems: ["email-gateway"],
          published: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
          exploit_available: true,
          references: [
            "https://attack.mitre.org/groups/G0016/",
            "https://www.cisa.gov/news-events/cybersecurity-advisories",
          ],
          patch_available: false,
          attack_complexity: "MEDIUM",
          privileges_required: "NONE",
          mitigation:
            "Enhanced email filtering, user security awareness training",
        },
      ],
      summary: {
        total_threats: 3,
        critical: 2,
        high: 1,
        medium: 0,
        low: 0,
      },
      metadata: {
        feed_version: "2.1",
        last_updated: new Date().toISOString(),
        sources: [
          "NVD",
          "CISA",
          "Vendor Security Advisories",
          "Threat Intelligence Platforms",
        ],
        confidence: "HIGH",
      },
    })
  } else {
    // Normal/routine threat scenario
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      threats: [
        {
          id: "CVE-2026-3456",
          severity: "MEDIUM",
          cvss: 6.5,
          title: "WordPress Plugin XSS Vulnerability",
          description:
            "Cross-site scripting (XSS) vulnerability in popular WordPress contact form plugin affecting versions prior to 5.8.2.",
          affected_systems: ["marketing-website"],
          published: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          exploit_available: false,
          references: [
            "https://wordpress.org/plugins/",
            "https://wpscan.com/vulnerabilities",
          ],
          patch_available: true,
          attack_complexity: "MEDIUM",
          privileges_required: "LOW",
        },
        {
          id: "CVE-2026-7890",
          severity: "MEDIUM",
          cvss: 5.8,
          title: "Node.js Express Framework Update",
          description:
            "Minor security improvement in Express.js middleware handling. Recommended to update to latest version.",
          affected_systems: ["api-backend"],
          published: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
          exploit_available: false,
          references: [
            "https://expressjs.com/en/advanced/security-updates.html",
          ],
          patch_available: true,
          attack_complexity: "HIGH",
          privileges_required: "LOW",
        },
      ],
      summary: {
        total_threats: 2,
        critical: 0,
        high: 0,
        medium: 2,
        low: 0,
      },
      metadata: {
        feed_version: "2.1",
        last_updated: new Date().toISOString(),
        sources: ["NVD", "npm Security Advisories", "WordPress Security Team"],
        confidence: "MEDIUM",
      },
    })
  }
}

/**
 * OPTIONS handler for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
