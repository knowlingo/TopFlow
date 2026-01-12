import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Eye, Activity } from "lucide-react"
import Link from "next/link"
import { getDemoWorkflowResult, hasDemoData } from "@/lib/demo-data"
import { ExportSection } from "@/components/reports/export-section"
import { ThreatVisualization } from "@/components/reports/threat-visualization"

interface ReportPageProps {
  params: Promise<{
    templateId: string
  }>
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { templateId } = await params

  // Check if demo data exists
  if (!hasDemoData(templateId)) {
    notFound()
  }

  // Load demo data
  const demoResult = getDemoWorkflowResult(templateId)!

  // For OT workflow specifically
  if (templateId === "template-ot-critical-infra") {
    return <OTCriticalInfraReport demoResult={demoResult} />
  }

  // Generic report fallback
  return <GenericReport demoResult={demoResult} templateId={templateId} />
}

// OT-specific report component
function OTCriticalInfraReport({ demoResult }: any) {
  const riskScore = demoResult.nodeResults["ot-risk-calc"]?.output?.combined_risk_score || 92
  const riskData = demoResult.nodeResults["ot-risk-calc"]?.output || {}
  const itThreats = demoResult.nodeResults["it-threat-feed"]?.output?.threats || []
  const otThreats = demoResult.nodeResults["ot-threat-feed"]?.output?.threats || []
  const iotData = demoResult.nodeResults["iot-telemetry"]?.output || {}

  return (
    <div className="relative">
      {/* TLP Banner */}
      <div className="fixed top-16 left-0 right-0 z-50 bg-amber-500 text-black text-center font-bold text-xs tracking-wider py-2 shadow-lg print:static print:border-2 print:border-black">
        TLP:AMBER - DEMO DATA - LIMITED DISCLOSURE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 print:mt-0 print:px-0">
        {/* Header */}
        <header className="border-b border-border pb-6 mb-8 print:mb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-3">
                OT Critical Infrastructure Threat Report
              </h1>
              <Badge variant="destructive" className="text-sm">
                INC-2026-001-CRITICAL
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-mono text-muted-foreground">
              <div>
                Date: <span className="text-foreground">Jan 7, 2026</span>
              </div>
              <div>
                Time: <span className="text-foreground">14:23 UTC</span>
              </div>
              <div>
                Sector: <span className="text-foreground">Energy / Smart Grid</span>
              </div>
              <div>
                Compliance: <span className="text-foreground">NERC CIP-008-6</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-8 print:break-inside-avoid">
          {/* Executive Summary - Takes 2 columns */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                The SOC has detected a sophisticated, multi-stage cyber attack targeting the{" "}
                <strong>Smart Energy Grid Control Plane</strong>. Threat actors (APT Volt Typhoon)
                have compromised the IT perimeter and moved laterally into the OT network.
              </p>

              <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-md">
                <strong className="text-destructive block mb-2">Critical Impact Analysis:</strong>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    Perimeter Breach: <strong>CVE-2024-3400 (CVSS 10.0)</strong>
                  </li>
                  <li>
                    OT Infiltration: Reconnaissance on <strong>Smart Inverter Array 01</strong>
                  </li>
                  <li>Safety Risk: High probability of command injection</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-md">
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  RECOMMENDATION: Initiate Emergency Response Plan Level 1. Sever IT-OT bridges
                  immediately.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-border print:hidden">
                <Link href="/builder?template=template-ot-critical-infra">
                  <Button className="w-full" size="lg">
                    <Eye className="mr-2 h-4 w-4" />
                    Build This Workflow in TopFlow
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Risk Score Box */}
          <Card className="relative overflow-hidden border-destructive print:border-2 print:border-black">
            <div className="absolute top-0 left-0 right-0 h-px bg-destructive shadow-[0_0_15px_2px_rgba(239,68,68,0.5)] print:shadow-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-destructive/10 to-transparent pointer-events-none print:bg-none" />

            <CardContent className="flex flex-col items-center justify-center h-full py-8 relative z-10">
              <div className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">
                Current Risk Score
              </div>
              <div
                className="text-8xl font-black text-destructive font-mono leading-none mb-2 print:text-black"
                style={{
                  textShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
                }}
              >
                {riskScore}
              </div>
              <div className="text-xl text-muted-foreground mb-4">/ 100</div>
              <Badge variant="destructive" className="print:border print:border-black">
                CRITICAL
              </Badge>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Threshold &gt; 85 triggers Mandatory Reporting
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Threat Landscape Visualization */}
        <section className="mb-8 print:break-inside-avoid">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Activity className="h-6 w-6" />
              Threat Landscape Visualization
            </h2>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500">
              LIVE TOPOLOGY
            </Badge>
          </div>
          <ThreatVisualization />
        </section>

        {/* Technical Analysis */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            🛡️ Technical Analysis
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Zone 1 */}
            <Card className="print:border print:border-gray-400">
              <CardHeader>
                <CardTitle className="text-blue-500 text-lg print:text-black">
                  Zone 1: IT & Cloud
                </CardTitle>
                <Badge variant="destructive" className="w-fit print:border print:border-black">
                  CVSS 10.0
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">CVE-2024-3400</p>
                  <p className="text-sm text-muted-foreground">
                    Palo Alto GlobalProtect CMD Injection
                  </p>
                </div>
                <hr className="border-border" />
                <p className="text-sm text-muted-foreground">
                  Unauthenticated RCE on Enterprise VPN Gateway. Attacker gained root access,
                  bypassing MFA/Firewall.
                </p>
              </CardContent>
            </Card>

            {/* Lateral Movement */}
            <Card className="print:border print:border-gray-400">
              <CardHeader>
                <CardTitle className="text-blue-500 text-lg print:text-black">
                  Lateral Movement
                </CardTitle>
                <Badge
                  variant="outline"
                  className="w-fit bg-amber-500/10 text-amber-600 border-amber-500 print:border-black print:text-black"
                >
                  CVSS 8.1
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">CVE-2024-6387</p>
                  <p className="text-sm text-muted-foreground">OpenSSH &quot;regreSSHion&quot;</p>
                </div>
                <hr className="border-border" />
                <p className="text-sm text-muted-foreground">
                  Targeted Linux Control Server (Jump Host). &quot;Living-off-the-Land&quot; tactics
                  observed masking movement to Data Diode.
                </p>
              </CardContent>
            </Card>

            {/* Zone 3 OT */}
            <Card className="border-destructive print:border-2 print:border-black">
              <CardHeader>
                <CardTitle className="text-destructive text-lg print:text-black">
                  Zone 3: OT Target
                </CardTitle>
                <Badge variant="destructive" className="w-fit print:border print:border-black">
                  Volt Typhoon
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">Smart Inverter Array 01</p>
                  <p className="text-sm text-muted-foreground">Telemetry Anomalies</p>
                </div>
                <hr className="border-border" />
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Heartbeat: IRREGULAR (47s delay)</li>
                  <li>Packet Loss: 12%</li>
                  <li>Firmware manipulation suspected</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Asset Status Table */}
        <section className="mb-8 print:break-inside-avoid">
          <Card>
            <CardHeader>
              <CardTitle>📋 Asset Status Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Asset Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Zone</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Telemetry Notes</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">Enterprise VPN Gateway</td>
                      <td className="py-3 px-4">IT (Zone 1)</td>
                      <td className="py-3 px-4 text-destructive font-bold print:text-black">
                        <span className="inline-block h-2 w-2 rounded-full bg-destructive mr-2 shadow-[0_0_8px_currentColor] print:shadow-none print:bg-black" />
                        COMPROMISED
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">Root access detected</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">Linux Control Server</td>
                      <td className="py-3 px-4">IT (Zone 1)</td>
                      <td className="py-3 px-4 text-amber-600 font-bold print:text-black">
                        <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mr-2 shadow-[0_0_8px_currentColor] print:shadow-none print:bg-black" />
                        AT RISK
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        SSH active connections high
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">SCADA Bridge/PLC</td>
                      <td className="py-3 px-4">OT (Zone 3)</td>
                      <td className="py-3 px-4 text-yellow-600 font-bold print:text-black">
                        <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 mr-2 shadow-[0_0_8px_currentColor] print:shadow-none print:bg-black" />
                        WARNING
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">Downstream irregularity</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">Smart Inverter Array 01</td>
                      <td className="py-3 px-4">OT (Zone 3)</td>
                      <td className="py-3 px-4 text-destructive font-bold print:text-black">
                        <span className="inline-block h-2 w-2 rounded-full bg-destructive mr-2 shadow-[0_0_8px_currentColor] print:shadow-none print:bg-black" />
                        ANOMALOUS
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">Heartbeat failure</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Power Storage Unit B</td>
                      <td className="py-3 px-4">OT (Zone 3)</td>
                      <td className="py-3 px-4 text-green-600 font-bold print:text-black">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_currentColor] print:shadow-none print:bg-black" />
                        NOMINAL
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">--</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Plan */}
        <section className="mb-8 print:break-inside-avoid">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Emergency Action Plan (EAP)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-destructive pl-6">
                <h4 className="text-destructive font-bold mb-2 print:text-black">
                  Phase 1: Containment (Immediate)
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>
                    <strong>Isolate Network:</strong> Physically disconnect uplink between Linux
                    Control Server and Data Diode.
                  </li>
                  <li>
                    <strong>Manual Override:</strong> Dispatch field engineers to switch Smart
                    Inverter Array 01 to local/manual.
                  </li>
                  <li>
                    <strong>Credential Reset:</strong> Force reset Domain Admin and VPN credentials.
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-amber-500 pl-6">
                <h4 className="text-amber-600 font-bold mb-2 print:text-black">
                  Phase 2: Eradication (&lt; 4 Hours)
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>
                    <strong>Patching:</strong> Apply hotfix for CVE-2024-3400.
                  </li>
                  <li>
                    <strong>Re-imaging:</strong> Re-image Linux Control Server from offline Gold
                    Master.
                  </li>
                  <li>
                    <strong>Firmware Verify:</strong> Checksum validation on SCADA PLC.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Export Section */}
        <ExportSection templateId="template-ot-critical-infra" />

        {/* Compliance Footer */}
        <footer className="p-6 bg-card border border-border rounded-lg print:border-black">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <strong className="block mb-2">NERC CIP-008-6 Compliance Note:</strong>
              <p className="text-sm text-muted-foreground">
                This is a Reportable Cyber Security Incident (High Impact BES).
                <br />
                Deadline to notify E-ISAC/NCCIC:{" "}
                <span className="text-destructive font-bold print:text-black">1 Hour</span>.
              </p>
            </div>
            <div className="text-xs font-mono text-muted-foreground text-right">
              Generated by TopFlow Critical Infrastructure Defense Workflow
              <br />
              Report ID: INC-2026-001
              <br />
              Execution Time: {demoResult.executionTime / 1000}s
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Generic report component for other templates
function GenericReport({ demoResult, templateId }: { demoResult: any; templateId: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{demoResult.workflowName}</h1>
      <p className="text-muted-foreground mb-8">
        This is a demo report generated from template: <code className="font-mono">{templateId}</code>
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Execution Results</CardTitle>
          <p className="text-sm text-muted-foreground">
            Completed in {demoResult.executionTime / 1000} seconds
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Metadata</h3>
              <div className="bg-muted p-4 rounded-md text-sm">
                <p>
                  <strong>AI Models Used:</strong> {demoResult.metadata?.aiModelsUsed?.join(", ")}
                </p>
                <p>
                  <strong>API Calls:</strong> {demoResult.metadata?.apiCalls}
                </p>
                <p>
                  <strong>Data Sources:</strong> {demoResult.metadata?.dataSources?.join(", ")}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Node Results</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-xs max-h-96">
                {JSON.stringify(demoResult.nodeResults, null, 2)}
              </pre>
            </div>

            <div className="pt-4 border-t border-border">
              <Link href={`/builder?template=${templateId}`}>
                <Button className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Build This Workflow in TopFlow
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Metadata for SEO
export async function generateMetadata({ params }: ReportPageProps) {
  const { templateId } = await params

  if (templateId === "template-ot-critical-infra") {
    return {
      title: "OT Critical Infrastructure Threat Report - TopFlow Demo",
      description:
        "Live demo of an AI-generated OT security incident report for energy sector. Showcases NERC CIP-008 compliance automation, threat intelligence analysis, and risk scoring.",
      openGraph: {
        title: "OT Critical Infrastructure Threat Report",
        description:
          "See how TopFlow automates OT security incident reporting for critical infrastructure.",
        type: "article",
      },
    }
  }

  return {
    title: "Security Report Demo - TopFlow",
    description: "View a live example of TopFlow's AI-powered security workflow output.",
  }
}
