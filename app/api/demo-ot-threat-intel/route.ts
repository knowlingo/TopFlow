/**
 * Demo OT Threat Intelligence API Endpoint
 *
 * Provides realistic OT/ICS threat data for the OT Critical Infrastructure workflow.
 * This endpoint simulates ICS-CERT advisories and APT threat intelligence.
 *
 * Used in demo mode to avoid external API dependencies.
 */

import { NextResponse } from "next/server"

export const runtime = "edge"

/**
 * GET /api/demo-ot-threat-intel
 *
 * Returns simulated OT/ICS threat intelligence (Volt Typhoon APT, SCADA advisories)
 */
export async function GET() {
  // Simulate realistic API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    feed_type: "OT_ICS_SCADA",
    threats: [
      {
        id: "VOLT-TYPHOON",
        type: "APT",
        severity: "CRITICAL",
        badge: "PERSISTENT",
        actor: "Volt Typhoon",
        attribution: "China-nexus state-sponsored APT",
        campaign_name: "Living Off the Land (LotL)",
        first_observed: "2021-06-01T00:00:00Z",
        last_activity: "2026-01-05T00:00:00Z",
        status: "ACTIVE",
        tactic: "Living-off-the-Land (LotL)",
        techniques: [
          "T1190 - Exploit Public-Facing Application",
          "T1133 - External Remote Services",
          "T1078 - Valid Accounts",
          "T1505.003 - Web Shell",
          "T1027 - Obfuscated Files or Information",
        ],
        affected_zone: "OT Layer (Zone 3)",
        target: "SCADA Bridge/PLC Controller",
        target_sectors: [
          "Energy",
          "Water and Wastewater",
          "Communications",
          "Transportation",
          "Government Facilities",
        ],
        description:
          "Volt Typhoon is a state-sponsored APT focused on pre-positioning for disruptive or destructive attacks against U.S. critical infrastructure. The group uses Living-off-the-Land techniques to blend into normal network activity and evade detection. They target IT/OT convergence points to gain access to operational technology systems.",
        attack_chain: [
          "1. Exploit internet-facing devices (Fortinet FortiGuard, Cisco routers)",
          "2. Establish persistence via web shells and scheduled tasks",
          "3. Credential harvesting using native OS tools (no malware)",
          "4. Lateral movement to OT networks via compromised jump hosts",
          "5. Reconnaissance of SCADA/PLC systems",
          "6. Pre-positioning for potential disruptive attacks",
        ],
        ot_specific_ttps: [
          "Targeting data diode bypass mechanisms",
          "Exploiting IT-managed OT devices (HMI workstations)",
          "Firmware manipulation on industrial controllers",
          "SCADA protocol injection (Modbus, DNP3)",
        ],
        cisa_alert: "AA24-038A",
        cisa_alert_title:
          "PRC State-Sponsored Actors Compromise and Maintain Persistent Access to U.S. Critical Infrastructure",
        cisa_alert_url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a",
        references: [
          "https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience/critical-infrastructure-sectors",
          "https://attack.mitre.org/groups/G1017/",
          "https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/",
          "https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/3408019/",
        ],
        mitigation_priority: "CRITICAL",
        recommended_actions: [
          "Audit all internet-facing OT devices for unauthorized access",
          "Enforce strict network segmentation between IT and OT zones",
          "Monitor for unusual authentication patterns (off-hours, new devices)",
          "Deploy application allowlisting on OT workstations",
          "Review all service accounts with OT access privileges",
        ],
      },
    ],
    affected_sectors: ["Energy", "Water", "Transportation", "Communications", "Government"],
    ot_assets_at_risk: [
      "SCADA Bridge/PLC Controllers",
      "Human-Machine Interfaces (HMI)",
      "Smart Grid Components (Inverters, RTUs)",
      "Industrial Control Systems (ICS)",
      "Supervisory Control Systems",
    ],
    summary: {
      total_threats: 1,
      critical: 1,
      apt_count: 1,
      active_campaigns: 1,
      persistent_threats: 1,
      ot_specific_threats: 1,
    },
    metadata: {
      feed_version: "3.0",
      feed_name: "OT/ICS Threat Intelligence Feed",
      last_updated: new Date().toISOString(),
      sources: [
        "CISA ICS-CERT",
        "NSA Cybersecurity Advisories",
        "FBI Cyber Division",
        "Microsoft Threat Intelligence",
        "Dragos WorldView",
      ],
      confidence: "HIGH",
      scope: "OT/ICS/SCADA Systems (Zone 3)",
      classification: "TLP:AMBER",
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
