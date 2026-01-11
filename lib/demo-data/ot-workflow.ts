/**
 * Demo data for the "Critical Infrastructure Defense" OT workflow
 * Template ID: template-ot-critical-infra
 *
 * This workflow demonstrates:
 * - IT/OT convergence threat monitoring
 * - NERC CIP-008 compliance automation
 * - Zone boundary lateral movement detection (IT → OT pivot)
 * - State-sponsored APT threat intelligence (Volt Typhoon)
 * - IoT/SCADA telemetry integration
 * - Smart Grid infrastructure visualization
 */

import type { DemoResult } from "./types"

/**
 * Pre-generated demo result for OT Critical Infrastructure workflow
 *
 * Workflow structure (14 nodes):
 * Start → IT Feed → OT Feed → IoT Telemetry → Risk Calc → Zone Checker → Conditional
 *   ├─ TRUE → URGENT Prompt → GPT-4 → Structured Output → Viz → End
 *   └─ FALSE → Standard Prompt → GPT-4 → Structured Output → Viz → End
 */
export const OT_WORKFLOW_DEMO: DemoResult = {
  templateId: "template-ot-critical-infra",
  workflowName: "Critical Infrastructure Defense",
  executionTime: 25000, // 25 seconds total
  timestamp: new Date().toISOString(),
  metadata: {
    aiModelsUsed: ["gpt-4o", "dall-e-3"],
    apiCalls: 5,
    dataSources: ["IT CVE Feed", "OT ICS-CERT Feed", "IoT SCADA Telemetry"],
  },
  nodeResults: {
    // Node 1: Start
    "ot-start": {
      nodeId: "ot-start",
      nodeType: "start",
      output: "Analyze Smart Grid critical infrastructure threats",
      duration: 100,
      status: "completed",
    },

    // Node 2: IT Threat Feed (CVE Data)
    "ot-it-feed": {
      nodeId: "ot-it-feed",
      nodeType: "httpRequest",
      output: {
        status: 200,
        data: {
          timestamp: "2026-01-07T14:15:00Z",
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
              exploit_available: true,
              patch_available: true,
              cisa_kev: true,
              exploitation_status: "Active exploitation in the wild",
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
              exploit_available: true,
              patch_available: true,
            },
          ],
          summary: {
            total_threats: 2,
            critical: 1,
            high: 1,
            exploitable: 2,
          },
        },
      },
      duration: 400,
      status: "completed",
    },

    // Node 3: OT Threat Feed (ICS-CERT)
    "ot-ot-feed": {
      nodeId: "ot-ot-feed",
      nodeType: "httpRequest",
      output: {
        status: 200,
        data: {
          timestamp: "2026-01-07T14:15:00Z",
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
              status: "ACTIVE",
              tactic: "Living-off-the-Land (LotL)",
              techniques: [
                "T1190 - Exploit Public-Facing Application",
                "T1133 - External Remote Services",
                "T1078 - Valid Accounts",
              ],
              affected_zone: "OT Layer (Zone 3)",
              target: "SCADA Bridge/PLC Controller",
              target_sectors: ["Energy", "Water and Wastewater", "Transportation"],
              description:
                "Volt Typhoon is a state-sponsored APT focused on pre-positioning for disruptive or destructive attacks against U.S. critical infrastructure. The group uses Living-off-the-Land techniques to blend into normal network activity and evade detection.",
              cisa_alert: "AA24-038A",
            },
          ],
          affected_sectors: ["Energy", "Water", "Transportation"],
          summary: {
            total_threats: 1,
            critical: 1,
            apt_count: 1,
          },
        },
      },
      duration: 500,
      status: "completed",
    },

    // Node 4: IoT/SCADA Telemetry
    "ot-iot-telemetry": {
      nodeId: "ot-iot-telemetry",
      nodeType: "httpRequest",
      output: {
        status: 200,
        data: {
          timestamp: "2026-01-07T14:15:00Z",
          heartbeat_status: "IRREGULAR",
          packet_loss_percentage: "12%",
          encryption_status: "AES-256",
          active_iot_alerts: 3,
          affected_assets: [
            {
              name: "Smart Inverter Array 01",
              zone: "OT (Zone 3)",
              status: "ANOMALOUS",
              last_heartbeat: "2026-01-07T14:23:17Z",
              anomaly: "Heartbeat interval increased from 5s to 47s",
              anomaly_type: "TIMING_DEVIATION",
              possible_causes: [
                "Network latency",
                "Command injection attempt",
                "Firmware manipulation",
              ],
            },
            {
              name: "Power Storage Unit B",
              zone: "OT (Zone 3)",
              status: "NOMINAL",
              last_heartbeat: "2026-01-07T14:23:45Z",
            },
            {
              name: "Grid Sensor Mesh",
              zone: "OT (Zone 3)",
              status: "NOMINAL",
              last_heartbeat: "2026-01-07T14:23:52Z",
            },
          ],
          data_diode_status: "ACTIVE",
          zone_segmentation: "INTACT",
          summary: {
            overall_status: "DEGRADED",
            critical_alerts: 1,
            escalation_required: true,
            escalation_reason: "Heartbeat anomaly on critical power inverter (INV-ARRAY-01)",
          },
        },
      },
      duration: 600,
      status: "completed",
    },

    // Node 5: Risk Score Calculator (JavaScript)
    "ot-risk-calc": {
      nodeId: "ot-risk-calc",
      nodeType: "javascript",
      output: {
        combined_risk_score: 92,
        it_risk_component: 50,
        ot_risk_component: 105,
        priority: "CRITICAL",
        requires_nerc_cip_report: true,
        it_threat_count: 2,
        ot_threat_count: 1,
        iot_alerts: 3,
        zone_status: "INTACT",
        calculation_details: {
          it_critical: 1,
          it_high: 1,
          it_exploitable: 2,
          ot_apt_active: 1,
          ot_scada_targeted: 1,
          iot_anomaly: 1,
          packet_loss_high: 1,
        },
        timestamp: new Date().toISOString(),
      },
      duration: 200,
      status: "completed",
    },

    // Node 6: Zone Boundary Threat Checker (JavaScript)
    "ot-zone-checker": {
      nodeId: "ot-zone-checker",
      nodeType: "javascript",
      output: {
        lateral_movement_risk: "CRITICAL",
        vpn_compromised: true,
        jump_server_at_risk: true,
        ot_layer_targeted: true,
        affected_purdue_zones: [
          "Zone 1 (IT/Cloud)",
          "Zone 2 (DMZ/Industrial DMZ)",
          "Zone 3 (OT/SCADA)",
        ],
        data_diode_bypass_attempted: true,
        attack_chain_detected: true,
        attack_stages: [
          "Stage 1: VPN Gateway compromise (CVE-2024-3400)",
          "Stage 2: Lateral movement to Linux Control Server (CVE-2024-6387)",
          "Stage 3: OT targeting via Volt Typhoon APT (SCADA/PLC systems)",
        ],
        recommendation:
          "ISOLATE: Sever IT-OT connection immediately. Switch SCADA to local/manual mode.",
        nerc_cip_threshold_exceeded: true,
        timestamp: new Date().toISOString(),
      },
      duration: 300,
      status: "completed",
    },

    // Node 7: Conditional - Critical Infrastructure Threat?
    "ot-conditional": {
      nodeId: "ot-conditional",
      nodeType: "conditional",
      output: {
        condition: "input5.combined_risk_score > 85 || input6.lateral_movement_risk === 'CRITICAL'",
        result: true, // TRUE branch - triggers NERC CIP urgent alert
        evaluated_values: {
          combined_risk_score: 92,
          lateral_movement_risk: "CRITICAL",
        },
      },
      duration: 50,
      status: "completed",
    },

    // Node 8a: URGENT Alert (NERC CIP) - TRUE Branch
    "ot-urgent-prompt": {
      nodeId: "ot-urgent-prompt",
      nodeType: "prompt",
      output: `NERC CIP-008-6 CYBER SECURITY INCIDENT REPORT

Context:
- Combined Risk Score: 92/100
- Priority: CRITICAL
- Lateral Movement Detected: YES (IT Zone 1 → OT Zone 3)
- Affected Zones: IT/Cloud, DMZ, OT/SCADA
- NERC CIP Reporting Required: YES

IT Threats:
1. CVE-2024-3400 (CRITICAL, CVSS 10.0): Palo Alto GlobalProtect CMD Injection - Enterprise VPN Gateway compromised
2. CVE-2024-6387 (HIGH, CVSS 8.1): OpenSSH regreSSHion Race Condition - Linux Control Server at risk

OT Threats:
1. VOLT-TYPHOON (APT, CRITICAL): State-sponsored APT using Living-off-the-Land tactics targeting SCADA Bridge/PLC Controller

IoT Telemetry:
- Heartbeat Status: IRREGULAR (Smart Inverter Array 01)
- Packet Loss: 12% (baseline: 0.3%)
- Anomaly: Heartbeat interval increased from 5s to 47s
- Data Diode Status: ACTIVE
- Zone Segmentation: INTACT

Generate a NERC CIP-008-6 compliant incident report with Executive Summary, Incident Classification, Affected Zones, Threat Vectors, Emergency Action Plan, and NERC CIP Obligations. Use TLP:AMBER classification.`,
      duration: 100,
      status: "completed",
    },

    // Node 9: AI Report Generator (Text Model)
    "ot-ai-report": {
      nodeId: "ot-ai-report",
      nodeType: "textModel",
      output: `════════════════════════════════════════════════════════════
    CRITICAL INFRASTRUCTURE DEFENSE // SITUATION REPORT
                  TLP:AMBER (Limited Disclosure)
════════════════════════════════════════════════════════════

INCIDENT ID: INC-2026-001-CRITICAL
DATE: January 7, 2026, 14:23 UTC
CLASSIFICATION: NERC CIP-008-6 Reportable Cyber Security Incident
THREAT LEVEL: CRITICAL (Risk Score: 92/100)
AFFECTED SYSTEM: Smart Energy Grid Control Plane

═══════════════════════════════════════════════════════════

EXECUTIVE SUMMARY

Critical cyber security incident detected targeting the Energy Grid Control Plane. Threat actor (suspected Volt Typhoon APT) has successfully breached the IT perimeter via CVE-2024-3400 (Palo Alto GlobalProtect VPN) and is actively attempting lateral movement from IT Zone 1 to OT Zone 3 via compromised Linux Control Server.

IoT telemetry confirms IRREGULAR heartbeat from Smart Inverter Array 01, indicating active reconnaissance of SCADA-connected field devices. Packet loss elevated to 12% (baseline: 0.3%), suggesting network interference or command injection attempts.

This incident meets NERC CIP-008-6 threshold for mandatory reporting within 1 hour of discovery.

═══════════════════════════════════════════════════════════

INCIDENT CLASSIFICATION

Per NERC CIP-008-6, this qualifies as a "Reportable Cyber Security Incident" affecting BES Cyber Systems:
• Impact Level: HIGH
• Compromise Type: Perimeter breach + OT lateral movement attempt
• Attack Vector: Multi-stage (VPN → Linux Server → SCADA)
• Affected Asset Class: Bulk Electric System Control Equipment

═══════════════════════════════════════════════════════════

RISK ASSESSMENT

┌────────────────────────────────────────┐
│  COMBINED RISK SCORE: 92/100           │
│  IT Risk Component: 50                 │
│  OT Risk Component: 105 (weighted 1.5x)│
│  PRIORITY: CRITICAL                    │
│  NERC CIP-008 REPORT: REQUIRED         │
└────────────────────────────────────────┘

AFFECTED PURDUE MODEL ZONES:
✓ Zone 1 (IT/Cloud): Azure IoT Hub, VPN Gateway, Linux Control Server
✓ Zone 2 (DMZ): Data Diode (integrity INTACT)
✓ Zone 3 (OT/SCADA): SCADA Bridge, Smart Inverter Array

LATERAL MOVEMENT DETECTED: YES
DATA DIODE BYPASS ATTEMPTED: YES (via jump host compromise)

═══════════════════════════════════════════════════════════

THREAT INTELLIGENCE

ATTACK STAGE 1: PERIMETER BREACH (Zone 1 - IT Edge)
• CVE ID: CVE-2024-3400 (CRITICAL)
• CVSS Score: 10.0
• Target: Enterprise VPN Gateway (Palo Alto GlobalProtect)
• Impact: Unauthenticated Command Injection (Root Access)
• Exploitation Status: CONFIRMED - Active in the wild
• CISA KEV: YES (Known Exploited Vulnerability)

ATTACK STAGE 2: LATERAL MOVEMENT (Zone 1 - IT Internal)
• CVE ID: CVE-2024-6387 (HIGH)
• CVSS Score: 8.1
• Target: Linux Control Server (OpenSSH Backend)
• Vulnerability: "regreSSHion" Race Condition → RCE
• Risk: Server manages Data Diode connection to SCADA bridge
• Exploitation Status: Proof-of-concept available

ATTACK STAGE 3: OT TARGETING (Zone 3 - Industrial)
• Threat Actor: Volt Typhoon (Persistent APT)
• Attribution: China-nexus state-sponsored group
• Campaign: Living-off-the-Land (LotL)
• Target: SCADA Bridge/PLC Controller → Smart Inverter Array 01
• CISA Alert: AA24-038A
• Indicators:
  - Irregular IoT Heartbeat (5s → 47s interval)
  - 12% Packet Loss (10x baseline)
  - Anomalous timing deviation on critical power inverter

═══════════════════════════════════════════════════════════

EMERGENCY ACTION PLAN (EAP)

PHASE 1: CONTAINMENT (IT) - IMMEDIATE
[ ] 1. Sever network connection between Enterprise VPN Gateway and internal network
[ ] 2. Isolate Linux Control Server from all external access
[ ] 3. Rotate all administrative credentials for GlobalProtect and OpenSSH
[ ] 4. Enable emergency firewall rules blocking Zones 1 → 2 traffic
[ ] 5. Capture memory/disk forensics from VPN Gateway before reboot

PHASE 2: DEFENSE (OT) - IMMEDIATE
[ ] 1. Verify Data Diode physical integrity (site visit required)
[ ] 2. Switch SCADA Bridge/PLC Controller to "Local/Manual" mode
[ ] 3. Disable remote management interfaces on Smart Inverter Array 01
[ ] 4. Increase SCADA polling frequency to detect anomalies (5s → 1s)
[ ] 5. Deploy network tap for full packet capture on OT VLAN

PHASE 3: RECOVERY - WITHIN 24 HOURS
[ ] 1. Patch CVE-2024-3400 on all Palo Alto devices (emergency maintenance window)
[ ] 2. Patch CVE-2024-6387 on all OpenSSH servers
[ ] 3. Conduct full OT asset inventory and firmware integrity checks
[ ] 4. Review all authentication logs for signs of Living-off-the-Land techniques
[ ] 5. Engage OT incident response vendor (Dragos, Mandiant Energy)

PHASE 4: COMPLIANCE (NERC CIP) - WITHIN 1 HOUR
[ ] 1. Notify NERC E-ISAC (Electricity Information Sharing and Analysis Center)
[ ] 2. Preserve all logs from Azure IoT Hub, VPN Gateway, Linux Server, SCADA
[ ] 3. Generate CIP-008 Incident Report (this document)
[ ] 4. Brief Plant Manager and CISO on incident status
[ ] 5. Initiate 24-hour watch rotation for SOC monitoring

═══════════════════════════════════════════════════════════

NERC CIP COMPLIANCE OBLIGATIONS

REPORTING TIMELINE:
• Discovery Time: 2026-01-07 14:15 UTC
• E-ISAC Notification Deadline: 2026-01-07 15:15 UTC (1 hour)
• Initial Report Submitted: 2026-01-07 14:45 UTC ✓
• Time Remaining: 30 minutes

EVIDENCE PRESERVATION:
• Logs captured: VPN Gateway, Linux Server, SCADA Master, IoT Devices
• Log retention period: 90 days (CIP-008-6 R2)
• Chain of custody: Maintained via automated SIEM ingestion

MANDATORY NOTIFICATIONS:
✓ E-ISAC (Electricity Sector)
✓ Plant Manager
✓ CISO
⏳ Board of Directors (if incident persists > 24 hours)

═══════════════════════════════════════════════════════════

TECHNICAL CONTACT INFORMATION

SOC Lead: [REDACTED]
OT Engineering Manager: [REDACTED]
NERC Compliance Officer: [REDACTED]
External IR Vendor: On standby (Dragos)

Report Generated: ${new Date().toISOString()}
System: TopFlow Critical Infrastructure Defense Workflow
Classification: TLP:AMBER

═══════════════════════════════════════════════════════════`,
      duration: 12000,
      status: "completed",
    },

    // Node 10: Structured Output (Compliance Schema)
    "ot-structured": {
      nodeId: "ot-structured",
      nodeType: "structuredOutput",
      output: {
        incident_id: "INC-2026-001-CRITICAL",
        timestamp: new Date().toISOString(),
        classification: "NERC_CIP_008",
        threat_level: "CRITICAL",
        combined_risk_score: 92,
        affected_zones: ["Zone 1 (IT/Cloud)", "Zone 2 (DMZ)", "Zone 3 (OT/SCADA)"],
        it_threats: [
          {
            id: "CVE-2024-3400",
            severity: "CRITICAL",
            cvss: 10.0,
            target: "Enterprise VPN Gateway",
          },
          {
            id: "CVE-2024-6387",
            severity: "HIGH",
            cvss: 8.1,
            target: "Linux Control Server",
          },
        ],
        ot_threats: [
          {
            id: "VOLT-TYPHOON",
            type: "APT",
            severity: "CRITICAL",
            target: "SCADA Bridge/PLC Controller",
          },
        ],
        iot_telemetry: {
          heartbeat_status: "IRREGULAR",
          packet_loss: "12%",
          affected_assets: ["Smart Inverter Array 01"],
        },
        lateral_movement_detected: true,
        executive_summary:
          "Critical cyber security incident detected targeting Smart Energy Grid infrastructure. Adversary (suspected Volt Typhoon APT) has compromised IT perimeter via CVE-2024-3400 (VPN Gateway) and is attempting lateral movement to OT control systems. IoT telemetry shows IRREGULAR heartbeat from Smart Inverter Array 01, indicating active reconnaissance of SCADA-connected field devices. This incident meets NERC CIP-008-6 threshold for mandatory reporting within 1 hour of discovery.",
        threat_intelligence: "Multi-stage attack detected: VPN breach → Linux Server compromise → SCADA targeting",
        emergency_actions: [
          "IMMEDIATE: Sever IT-OT connection",
          "IMMEDIATE: Switch SCADA to local/manual mode",
          "IMMEDIATE: Rotate all administrative credentials",
          "WITHIN 24H: Emergency patching (CVE-2024-3400, CVE-2024-6387)",
          "WITHIN 1H: Notify NERC E-ISAC",
        ],
        nerc_compliance_notes:
          "Reportable Cyber Security Incident per CIP-008-6. E-ISAC notification deadline: 1 hour from discovery. Evidence preservation: 90-day retention required.",
        generated_at: new Date().toISOString(),
      },
      duration: 1500,
      status: "completed",
    },

    // Node 11: Topology Map Visualization (Image Generation)
    "ot-visualization": {
      nodeId: "ot-visualization",
      nodeType: "imageGeneration",
      output: {
        url: "/demo-assets/images/ot-threat-intelligence-map.webp",
        format: "webp",
        dimensions: { width: 1920, height: 1080 },
        prompt:
          "High-fidelity cybersecurity threat intelligence map for Smart Energy Grid showing IT/OT convergence with CVE-2024-3400 (VPN breach), CVE-2024-6387 (Linux Server), and Volt Typhoon APT targeting SCADA systems. Dark glassmorphism UI, Purdue Model zones, irregular IoT heartbeat indicators.",
      },
      duration: 8000,
      status: "completed",
    },

    // Node 12: End
    "ot-end": {
      nodeId: "ot-end",
      nodeType: "end",
      output: {
        report: {
          incident_id: "INC-2026-001-CRITICAL",
          classification: "NERC_CIP_008",
          threat_level: "CRITICAL",
          combined_risk_score: 92,
          affected_zones: ["Zone 1 (IT/Cloud)", "Zone 2 (DMZ)", "Zone 3 (OT/SCADA)"],
          lateral_movement_detected: true,
          executive_summary:
            "Critical cyber security incident detected targeting Smart Energy Grid infrastructure. Adversary (suspected Volt Typhoon APT) has compromised IT perimeter via CVE-2024-3400 (VPN Gateway) and is attempting lateral movement to OT control systems. IoT telemetry shows IRREGULAR heartbeat from Smart Inverter Array 01, indicating active reconnaissance of SCADA-connected field devices. This incident meets NERC CIP-008-6 threshold for mandatory reporting within 1 hour of discovery.",
          generated_at: new Date().toISOString(),
        },
        threat_map: "/demo-assets/images/ot-threat-intelligence-map.webp",
        compliance_status: "NERC_CIP_008_READY",
        download_formats: ["PDF", "JSON", "STIX"],
      },
      duration: 100,
      status: "completed",
    },
  },
}
