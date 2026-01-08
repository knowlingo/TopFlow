/**
 * Demo IoT/SCADA Telemetry API Endpoint
 *
 * Provides realistic IoT/SCADA operational telemetry for the OT Critical Infrastructure workflow.
 * This endpoint simulates real-time data from industrial IoT devices and SCADA systems.
 *
 * Used in demo mode to avoid external API dependencies.
 */

import { NextResponse } from "next/server"

export const runtime = "edge"

/**
 * GET /api/demo-iot-telemetry
 *
 * Returns simulated IoT/SCADA telemetry data (heartbeat, packet loss, encryption status)
 */
export async function GET() {
  // Simulate realistic API delay (slightly longer for telemetry aggregation)
  await new Promise((resolve) => setTimeout(resolve, 600))

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    telemetry_type: "SCADA_IOT_OPERATIONAL",
    plant_id: "GRID-EAST-01",
    plant_name: "Eastern Smart Grid Control Center",
    heartbeat_status: "IRREGULAR",
    heartbeat_details: {
      status: "IRREGULAR",
      expected_interval_ms: 5000,
      actual_interval_ms: 47000,
      deviation_percentage: 840,
      alert_threshold_exceeded: true,
      anomaly_detected_at: "2026-01-07T14:18:32Z",
    },
    packet_loss_percentage: "12%",
    packet_loss_details: {
      percentage: 12.3,
      baseline: 0.3,
      threshold: 5.0,
      status: "CRITICAL",
      measurement_window_minutes: 15,
      packets_sent: 18450,
      packets_lost: 2269,
    },
    encryption_status: "AES-256",
    encryption_details: {
      algorithm: "AES-256-GCM",
      key_rotation_status: "CURRENT",
      last_rotation: "2026-01-01T00:00:00Z",
      next_rotation: "2026-02-01T00:00:00Z",
      tls_version: "1.3",
      certificate_expiry: "2027-01-07T00:00:00Z",
    },
    active_iot_alerts: 3,
    affected_assets: [
      {
        asset_id: "INV-ARRAY-01",
        name: "Smart Inverter Array 01",
        type: "POWER_INVERTER",
        zone: "OT (Zone 3)",
        manufacturer: "SolarEdge",
        model: "SE100K-US",
        firmware_version: "4.10.71",
        status: "ANOMALOUS",
        severity: "HIGH",
        last_heartbeat: "2026-01-07T14:23:17Z",
        expected_heartbeat: "2026-01-07T14:23:22Z",
        heartbeat_delay_seconds: 47,
        anomaly: "Heartbeat interval increased from 5s to 47s",
        anomaly_type: "TIMING_DEVIATION",
        possible_causes: [
          "Network latency or interference",
          "Device CPU overload",
          "Command injection attempt",
          "Firmware manipulation",
        ],
        scada_protocol: "Modbus TCP",
        ip_address: "192.168.100.45",
        mac_address: "00:1A:2B:3C:4D:5E",
        vlan: "OT-SCADA-VLAN-100",
      },
      {
        asset_id: "PSU-UNIT-B",
        name: "Power Storage Unit B",
        type: "BATTERY_STORAGE",
        zone: "OT (Zone 3)",
        manufacturer: "Tesla",
        model: "Megapack 2XL",
        firmware_version: "2.5.3",
        status: "NOMINAL",
        severity: "NONE",
        last_heartbeat: "2026-01-07T14:23:45Z",
        expected_heartbeat: "2026-01-07T14:23:50Z",
        heartbeat_delay_seconds: 0,
        anomaly: null,
        scada_protocol: "DNP3",
        ip_address: "192.168.100.78",
        mac_address: "00:1A:2B:3C:4D:6F",
        vlan: "OT-SCADA-VLAN-100",
        battery_status: {
          charge_percentage: 87,
          temperature_celsius: 23.4,
          cycles: 1247,
          health: "GOOD",
        },
      },
      {
        asset_id: "GRID-SENSOR-MESH",
        name: "Grid Sensor Mesh",
        type: "SENSOR_NETWORK",
        zone: "OT (Zone 3)",
        manufacturer: "GE Grid Solutions",
        model: "GridSense Pro",
        firmware_version: "8.2.1",
        status: "NOMINAL",
        severity: "NONE",
        last_heartbeat: "2026-01-07T14:23:52Z",
        expected_heartbeat: "2026-01-07T14:23:55Z",
        heartbeat_delay_seconds: 0,
        anomaly: null,
        scada_protocol: "IEC 61850",
        ip_address: "192.168.100.92",
        mac_address: "00:1A:2B:3C:4D:7A",
        vlan: "OT-SCADA-VLAN-100",
        sensor_count: 147,
        sensors_online: 147,
        sensors_offline: 0,
      },
    ],
    data_diode_status: "ACTIVE",
    data_diode_details: {
      status: "ACTIVE",
      direction: "IT_TO_OT_UNIDIRECTIONAL",
      throughput_kbps: 256,
      integrity_check: "PASSED",
      last_integrity_check: "2026-01-07T14:20:00Z",
      bypass_attempts_detected: 0,
      location: "Zone 2 (DMZ)",
    },
    zone_segmentation: "INTACT",
    zone_segmentation_details: {
      status: "INTACT",
      zones_monitored: ["Zone 1 (IT/Cloud)", "Zone 2 (DMZ)", "Zone 3 (OT/SCADA)"],
      firewall_rules_active: 347,
      unauthorized_connections: 0,
      vlan_isolation: "ENFORCED",
      last_segmentation_audit: "2026-01-06T00:00:00Z",
    },
    network_statistics: {
      total_devices: 3,
      devices_online: 3,
      devices_offline: 0,
      devices_anomalous: 1,
      average_latency_ms: 12.4,
      peak_latency_ms: 89.3,
      jitter_ms: 4.2,
    },
    summary: {
      overall_status: "DEGRADED",
      critical_alerts: 1,
      warning_alerts: 2,
      info_alerts: 0,
      recommended_action: "INVESTIGATE",
      escalation_required: true,
      escalation_reason: "Heartbeat anomaly on critical power inverter (INV-ARRAY-01)",
    },
    metadata: {
      telemetry_version: "3.0",
      telemetry_source: "SCADA Master Station",
      collection_method: "Real-time polling (5s interval)",
      last_updated: new Date().toISOString(),
      data_quality: "HIGH",
      confidence: "HIGH",
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
