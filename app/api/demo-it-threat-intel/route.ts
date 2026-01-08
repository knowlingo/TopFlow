/**
 * Demo IT Threat Intelligence API Endpoint
 *
 * Provides realistic IT/Enterprise CVE threat data for the OT Critical Infrastructure workflow.
 * This endpoint simulates IT-focused threat feeds (VPN, Linux, Cloud vulnerabilities).
 *
 * Used in demo mode to avoid external API dependencies.
 */

import { NextResponse } from "next/server"

export const runtime = "edge"

/**
 * GET /api/demo-it-threat-intel
 *
 * Returns simulated IT threat intelligence data (CVE-2024-3400, CVE-2024-6387)
 */
export async function GET() {
  // Simulate realistic API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    feed_type: "IT_ENTERPRISE",
    threats: [
      {
        id: "CVE-2024-3400",
        severity: "CRITICAL",
        cvss: 10.0,
        title: "Palo Alto GlobalProtect CMD Injection",
        description:
          "Unauthenticated command injection vulnerability in Palo Alto Networks GlobalProtect gateway. Allows attackers to execute arbitrary code with root privileges on the firewall.",
        affected_zone: "IT Edge (Zone 1)",
        target: "Enterprise VPN Gateway",
        vendor: "Palo Alto Networks",
        product: "GlobalProtect",
        affected_versions: ["PAN-OS 10.2", "PAN-OS 11.0", "PAN-OS 11.1"],
        published: "2024-04-12T00:00:00Z",
        exploit_available: true,
        patch_available: true,
        patch_urgency: "EMERGENCY",
        attack_complexity: "LOW",
        privileges_required: "NONE",
        user_interaction: "NONE",
        references: [
          "https://nvd.nist.gov/vuln/detail/CVE-2024-3400",
          "https://security.paloaltonetworks.com/CVE-2024-3400",
          "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
        ],
        cisa_kev: true,
        exploitation_status: "Active exploitation in the wild",
        threat_actor: "Multiple threat actors including APT groups",
      },
      {
        id: "CVE-2024-6387",
        severity: "HIGH",
        cvss: 8.1,
        title: "regreSSHion Race Condition (OpenSSH)",
        description:
          "Signal handler race condition in OpenSSH server (sshd) on glibc-based Linux systems. Unauthenticated remote code execution possible on vulnerable servers.",
        affected_zone: "IT Internal (Zone 1)",
        target: "Linux Control Server",
        vendor: "OpenSSH",
        product: "OpenSSH Server",
        affected_versions: ["8.5p1 - 9.7p1"],
        published: "2024-07-01T00:00:00Z",
        exploit_available: true,
        patch_available: true,
        patch_urgency: "HIGH",
        attack_complexity: "HIGH",
        privileges_required: "NONE",
        user_interaction: "NONE",
        references: [
          "https://nvd.nist.gov/vuln/detail/CVE-2024-6387",
          "https://www.qualys.com/2024/07/01/cve-2024-6387/regresshion.txt",
          "https://www.openssh.com/security.html",
        ],
        cisa_kev: false,
        exploitation_status: "Proof-of-concept available",
        threat_actor: "Unknown (research-grade exploit published)",
        technique: "Race condition in sshd signal handler",
      },
    ],
    summary: {
      total_threats: 2,
      critical: 1,
      high: 1,
      medium: 0,
      low: 0,
      exploitable: 2,
      patch_available: 2,
      cisa_kev_count: 1,
    },
    metadata: {
      feed_version: "3.0",
      feed_name: "IT Enterprise Threat Feed",
      last_updated: new Date().toISOString(),
      sources: ["NVD", "CISA KEV", "Vendor Security Advisories", "Qualys Research"],
      confidence: "HIGH",
      scope: "IT/Enterprise Systems (Zone 1)",
    },
  })
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
