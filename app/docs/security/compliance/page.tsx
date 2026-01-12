import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle2, AlertCircle, FileCheck, Lock, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Security & Compliance | TopFlow Documentation",
  description: "Understand TopFlow's compliance-conscious design, GDPR features, SOC 2 considerations, and industry-specific security guidance for regulated environments.",
}

export default function CompliancePage() {
  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "gdpr-compliance", title: "GDPR Compliance" },
    { id: "soc2-considerations", title: "SOC 2 Considerations" },
    { id: "hipaa-healthcare", title: "HIPAA & Healthcare" },
    { id: "industry-specific", title: "Industry-Specific Guidance" },
    { id: "best-practices", title: "Compliance Best Practices" },
  ]

  return (
    <>
      <SidebarPortal currentTab="security" />
      <TOCPortal items={tocItems} />

      <div className="prose prose-invert max-w-none">
        <h1>Security & Compliance</h1>
        <p className="text-xl text-muted-foreground">
          TopFlow is built with compliance-conscious design principles. Learn how its privacy-first architecture
          supports GDPR, SOC 2, and industry-specific security requirements for regulated environments.
        </p>

        <section id="overview">
          <h2>Overview</h2>
          <p>
            TopFlow demonstrates <strong>compliance by design</strong>—security and privacy features baked into
            the architecture from day one, not bolted on as an afterthought. As a platform built by a former CISO,
            it showcases how to build AI systems that meet enterprise security standards.
          </p>

          <div className="grid md:grid-cols-3 gap-4 not-prose my-8">
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-3/20 flex items-center justify-center mb-3">
                  <Lock className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="text-lg">Privacy-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All data stored in your browser only. No backend database means no data breach risk.
                  True privacy by design.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Security Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  12 security validations including SSRF prevention, rate limiting, cycle detection, and input sanitization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center mb-3">
                  <FileCheck className="h-5 w-5 text-destructive" />
                </div>
                <CardTitle className="text-lg">Audit-Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Code export generates audit trails. Open source for security review. Compliance documentation built-in.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3>Compliance Philosophy</h3>
          <p>
            TopFlow's approach to compliance is based on four principles:
          </p>
          <ol>
            <li><strong>Data Minimization</strong>: Collect only what's absolutely necessary (spoiler: nothing on the server)</li>
            <li><strong>User Control</strong>: Users own 100% of their data—workflows, API keys, execution history</li>
            <li><strong>Transparency</strong>: Open source for community security review and audit</li>
            <li><strong>Purpose Limitation</strong>: Data used only for workflow execution, never for analytics or tracking</li>
          </ol>

          <p>
            This isn't just good practice—it's <strong>authentic privacy-first positioning</strong>. You can't breach data you never collected.
          </p>
        </section>

        <section id="gdpr-compliance">
          <h2>GDPR Compliance</h2>
          <p>
            The General Data Protection Regulation (GDPR) is the EU's comprehensive privacy law. TopFlow's client-side
            architecture makes GDPR compliance straightforward because <strong>no personal data is processed server-side</strong>.
          </p>

          <h3>GDPR Article 5 Principles</h3>
          <p>
            TopFlow aligns with all six GDPR data protection principles:
          </p>

          <div className="not-prose space-y-4 my-6">
            <Card className="border-green-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-green-400">1. Lawfulness, Fairness, Transparency</CardTitle>
                    <CardDescription>Data processing must be legal, fair, and transparent</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2">How TopFlow Complies:</p>
                <ul className="space-y-1">
                  <li>• No user accounts or authentication required (no personal data collection)</li>
                  <li>• Open source code allows full transparency into data handling</li>
                  <li>• Clear documentation of data flows and storage</li>
                  <li>• Privacy policy in plain language (not legalese)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-green-400">2. Purpose Limitation</CardTitle>
                    <CardDescription>Data collected for specified purposes only</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2">How TopFlow Complies:</p>
                <ul className="space-y-1">
                  <li>• Data used exclusively for workflow execution</li>
                  <li>• No secondary use (analytics, advertising, profiling)</li>
                  <li>• No data selling or sharing with third parties</li>
                  <li>• Execution results are ephemeral (not persisted server-side)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-green-400">3. Data Minimization</CardTitle>
                    <CardDescription>Collect only necessary data</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2">How TopFlow Complies:</p>
                <ul className="space-y-1">
                  <li>• Zero server-side storage of user data (localStorage only)</li>
                  <li>• No tracking cookies or analytics by default</li>
                  <li>• No user profiles, email addresses, or identifiers</li>
                  <li>• API keys stored locally, never sent to TopFlow servers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-green-400">4. Accuracy</CardTitle>
                    <CardDescription>Data must be accurate and up-to-date</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2">How TopFlow Complies:</p>
                <ul className="space-y-1">
                  <li>• Users have direct control over all data (localStorage)</li>
                  <li>• Workflows editable at any time</li>
                  <li>• Version history allows reverting to accurate states</li>
                  <li>• No stale server-side cached data</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-green-400">5. Storage Limitation</CardTitle>
                    <CardDescription>Data retained only as long as necessary</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2">How TopFlow Complies:</p>
                <ul className="space-y-1">
                  <li>• No server-side retention (data doesn't exist to retain)</li>
                  <li>• Users control localStorage retention via browser settings</li>
                  <li>• Auto-save keeps only last 5 versions (automatic cleanup)</li>
                  <li>• Execution results discarded after streaming to client</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-green-400">6. Integrity & Confidentiality</CardTitle>
                    <CardDescription>Appropriate security measures</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2">How TopFlow Complies:</p>
                <ul className="space-y-1">
                  <li>• HTTPS/TLS 1.3 for all communications</li>
                  <li>• localStorage encrypted at browser level</li>
                  <li>• SSRF prevention protects against unauthorized access</li>
                  <li>• Rate limiting prevents abuse and DoS attacks</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3>GDPR Data Subject Rights</h3>
          <p>
            Because TopFlow stores no personal data server-side, most GDPR rights are inherently satisfied:
          </p>

          <table>
            <thead>
              <tr>
                <th>Right</th>
                <th>Implementation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Right to Access</strong></td>
                <td>Users have full access to localStorage via browser DevTools or export feature</td>
                <td>✅ Built-in</td>
              </tr>
              <tr>
                <td><strong>Right to Rectification</strong></td>
                <td>Users can edit workflows at any time</td>
                <td>✅ Built-in</td>
              </tr>
              <tr>
                <td><strong>Right to Erasure</strong></td>
                <td>Clear browser storage deletes all data instantly</td>
                <td>✅ Built-in</td>
              </tr>
              <tr>
                <td><strong>Right to Data Portability</strong></td>
                <td>JSON export/import functionality</td>
                <td>✅ Implemented</td>
              </tr>
              <tr>
                <td><strong>Right to Restrict Processing</strong></td>
                <td>Users control when workflows execute</td>
                <td>✅ Built-in</td>
              </tr>
              <tr>
                <td><strong>Right to Object</strong></td>
                <td>No automated profiling or marketing (N/A)</td>
                <td>✅ By design</td>
              </tr>
              <tr>
                <td><strong>Breach Notification</strong></td>
                <td>No server-side data = no breach to notify</td>
                <td>✅ N/A</td>
              </tr>
            </tbody>
          </table>

          <div className="not-prose my-6 p-4 bg-chart-3/10 border border-chart-3/30 rounded-lg">
            <p className="text-sm font-semibold text-chart-3 mb-2">GDPR Workflow Example</p>
            <p className="text-sm text-muted-foreground">
              TopFlow includes a pre-built template: <strong>GDPR Data Access Request Automation</strong>.
              This workflow demonstrates how to handle Article 15 (Right to Access) requests automatically,
              including data aggregation, PII redaction, and response generation.
            </p>
          </div>
        </section>

        <section id="soc2-considerations">
          <h2>SOC 2 Considerations</h2>
          <p>
            SOC 2 is a compliance framework for service providers storing customer data in the cloud. While TopFlow
            stores no customer data server-side, understanding SOC 2 principles helps with enterprise deployment.
          </p>

          <h3>SOC 2 Trust Service Criteria</h3>
          <p>
            SOC 2 defines five "Trust Service Criteria" (TSC). Here's how TopFlow aligns with each:
          </p>

          <div className="not-prose space-y-4 my-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base">Security (CC1-CC9)</CardTitle>
                    <CardDescription>Protection against unauthorized access</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2"><strong>TopFlow Implementation:</strong></p>
                <ul className="space-y-1">
                  <li>• 12 security validations including SSRF prevention, cycle detection</li>
                  <li>• Rate limiting (10 req/min per IP) prevents abuse</li>
                  <li>• Input sanitization and validation on all user inputs</li>
                  <li>• HTTPS/TLS 1.3 enforced for all communications</li>
                  <li>• Open source for security review and audit</li>
                </ul>
                <p className="mt-3 text-green-400 font-semibold">Status: ✅ Well-implemented</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base">Availability (A1)</CardTitle>
                    <CardDescription>System accessible when needed</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2"><strong>TopFlow Implementation:</strong></p>
                <ul className="space-y-1">
                  <li>• Stateless architecture enables horizontal scaling</li>
                  <li>• No database dependencies (can't have database downtime)</li>
                  <li>• Deployed on Vercel Edge Network (global CDN)</li>
                  <li>• Automatic failover and load balancing</li>
                </ul>
                <p className="mt-3 text-green-400 font-semibold">Status: ✅ Well-implemented</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <CardTitle className="text-base">Processing Integrity (PI1)</CardTitle>
                    <CardDescription>Processing is complete, valid, accurate, timely</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2"><strong>TopFlow Implementation:</strong></p>
                <ul className="space-y-1">
                  <li>• Pre-execution validation prevents invalid workflows</li>
                  <li>• Error handling returns clear, actionable messages</li>
                  <li>• Code export generates production-ready TypeScript</li>
                  <li>• Version history allows auditing workflow changes</li>
                </ul>
                <p className="mt-3 text-yellow-400 font-semibold">Status: ⚠️ Partially implemented (audit logging recommended)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <CardTitle className="text-base">Confidentiality (C1)</CardTitle>
                    <CardDescription>Information designated as confidential is protected</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2"><strong>TopFlow Implementation:</strong></p>
                <ul className="space-y-1">
                  <li>• API keys stored in localStorage (browser-secured)</li>
                  <li>• Keys never logged in error messages or traces</li>
                  <li>• No server-side persistence of sensitive data</li>
                  <li>• BYOK model—users control their own credentials</li>
                </ul>
                <p className="mt-3 text-yellow-400 font-semibold">Status: ⚠️ Good for demo, encryption recommended for enterprise</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base">Privacy (P1-P8)</CardTitle>
                    <CardDescription>Personal info collected, used, retained, disclosed appropriately</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground mb-2"><strong>TopFlow Implementation:</strong></p>
                <ul className="space-y-1">
                  <li>• Zero server-side data collection (true privacy-first)</li>
                  <li>• No tracking, analytics, or profiling by default</li>
                  <li>• Users own 100% of their data via localStorage</li>
                  <li>• Open source allows privacy verification</li>
                </ul>
                <p className="mt-3 text-green-400 font-semibold">Status: ✅ Exceptional implementation</p>
              </CardContent>
            </Card>
          </div>

          <h3>Enterprise Deployment Recommendations</h3>
          <p>
            For organizations pursuing SOC 2 certification with TopFlow:
          </p>
          <ul>
            <li><strong>Add audit logging</strong>: Track all workflow executions, validations, and configuration changes</li>
            <li><strong>Implement role-based access control (RBAC)</strong>: Define user roles and permissions</li>
            <li><strong>Enhanced monitoring</strong>: Set up SIEM integration for security event correlation</li>
            <li><strong>Incident response plan</strong>: Document procedures for security incidents</li>
            <li><strong>Vendor management</strong>: Ensure AI providers (OpenAI, Anthropic, etc.) have SOC 2 reports</li>
          </ul>
        </section>

        <section id="hipaa-healthcare">
          <h2>HIPAA & Healthcare</h2>
          <p>
            The Health Insurance Portability and Accountability Act (HIPAA) governs Protected Health Information (PHI)
            in the United States. TopFlow's default architecture is <strong>not HIPAA-compliant</strong> because
            localStorage encryption doesn't meet HIPAA standards.
          </p>

          <h3>HIPAA Requirements</h3>
          <div className="not-prose space-y-4 my-6">
            <Card className="border-red-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-red-400">❌ Encryption at Rest</CardTitle>
                    <CardDescription>PHI must be encrypted using FIPS 140-2 compliant algorithms</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground">
                  <strong>Issue:</strong> Browser localStorage encryption doesn't meet HIPAA standards.
                </p>
                <p className="text-green-400 mt-2">
                  <strong>Solution:</strong> Deploy with server-side storage using AES-256 encryption or use
                  a secrets management service (AWS Secrets Manager, HashiCorp Vault).
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-yellow-400">⚠️ Business Associate Agreements (BAA)</CardTitle>
                    <CardDescription>Required with all vendors handling PHI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground">
                  <strong>Issue:</strong> AI providers (OpenAI, Anthropic, Google) must sign BAAs before processing PHI.
                </p>
                <p className="text-green-400 mt-2">
                  <strong>Solution:</strong> Use HIPAA-compliant AI providers or deploy on-premise with local models.
                  OpenAI and Anthropic offer BAAs for enterprise customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-yellow-400">⚠️ Audit Controls</CardTitle>
                    <CardDescription>Record and examine activity in systems with PHI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground">
                  <strong>Status:</strong> TopFlow has basic execution logging but needs enhancement.
                </p>
                <p className="text-green-400 mt-2">
                  <strong>Solution:</strong> Implement comprehensive audit logging with tamper-proof storage.
                  Log all PHI access, modifications, and disclosures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <CardTitle className="text-base text-green-400">✅ Minimum Necessary</CardTitle>
                    <CardDescription>Limit PHI access to minimum necessary</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-muted-foreground">
                  <strong>Status:</strong> TopFlow's data minimization principle aligns with this requirement.
                </p>
                <p className="text-green-400 mt-2">
                  No server-side storage means PHI is only accessed during workflow execution.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3>Healthcare Deployment Path</h3>
          <p>
            To use TopFlow for PHI workflows, follow this implementation path:
          </p>
          <ol>
            <li><strong>Sign BAAs</strong> with OpenAI, Anthropic, or use on-premise models</li>
            <li><strong>Deploy server-side storage</strong> with FIPS 140-2 encryption (PostgreSQL + pgcrypto, AWS RDS with encryption)</li>
            <li><strong>Implement RBAC</strong>: Only authorized clinicians access PHI workflows</li>
            <li><strong>Add comprehensive audit logging</strong>: Track all PHI access with immutable logs</li>
            <li><strong>De-identification workflows</strong>: Create templates for removing identifiers before AI processing</li>
            <li><strong>Penetration testing</strong>: Third-party security audit required for HIPAA</li>
          </ol>

          <div className="not-prose my-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm font-semibold text-destructive mb-2">⚠️ Important Healthcare Notice</p>
            <p className="text-sm text-muted-foreground">
              Do not use TopFlow's default configuration for PHI workflows without implementing the
              recommendations above. Consult with a HIPAA compliance expert before deployment in
              healthcare environments.
            </p>
          </div>
        </section>

        <section id="industry-specific">
          <h2>Industry-Specific Guidance</h2>

          <div className="not-prose space-y-6 my-8">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-chart-1 mt-1" />
                  <div>
                    <CardTitle>Financial Services</CardTitle>
                    <CardDescription>Banking, payments, investment management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p className="text-muted-foreground">
                  <strong>Key Regulations:</strong> PCI DSS (payments), SOC 2, GLBA, SEC cybersecurity rules
                </p>
                <p className="font-semibold">Recommendations:</p>
                <ul className="space-y-1">
                  <li>• <strong>Multi-factor authentication (MFA)</strong>: Add before workflow execution</li>
                  <li>• <strong>Transaction signing</strong>: Cryptographic signatures for financial workflows</li>
                  <li>• <strong>Enhanced audit logging</strong>: Track all workflow executions with timestamps</li>
                  <li>• <strong>Do not process credit card data</strong>: Use payment provider APIs (Stripe, etc.) instead</li>
                  <li>• <strong>Compliance reporting</strong>: Generate audit reports for regulators</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-chart-2 mt-1" />
                  <div>
                    <CardTitle>Public Sector / Government</CardTitle>
                    <CardDescription>Federal, state, local government agencies</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p className="text-muted-foreground">
                  <strong>Key Regulations:</strong> FedRAMP, NIST 800-53, FISMA, state-specific laws
                </p>
                <p className="font-semibold">Recommendations:</p>
                <ul className="space-y-1">
                  <li>• <strong>On-premise deployment</strong>: Self-hosted to meet data residency requirements</li>
                  <li>• <strong>FedRAMP controls</strong>: Implement NIST 800-53 security controls</li>
                  <li>• <strong>Air-gapped operation</strong>: Deploy without internet for classified environments</li>
                  <li>• <strong>Enhanced audit trails</strong>: Comprehensive logging for FOIA compliance</li>
                  <li>• <strong>Use local AI models</strong>: Avoid sending data to commercial AI providers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-chart-3 mt-1" />
                  <div>
                    <CardTitle>Legal Services</CardTitle>
                    <CardDescription>Law firms, corporate legal departments</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p className="text-muted-foreground">
                  <strong>Key Concerns:</strong> Attorney-client privilege, confidentiality, ethics rules
                </p>
                <p className="font-semibold">Recommendations:</p>
                <ul className="space-y-1">
                  <li>• <strong>Encryption at rest</strong>: Add encryption library for localStorage or use server-side storage</li>
                  <li>• <strong>Access controls</strong>: Implement per-case permissions and Chinese Wall policies</li>
                  <li>• <strong>Audit trails</strong>: Track all document access for privilege logs</li>
                  <li>• <strong>Redaction workflows</strong>: Use PII detection nodes to redact sensitive info before AI processing</li>
                  <li>• <strong>Vendor due diligence</strong>: Ensure AI providers meet your firm's security standards</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Schools, universities, EdTech platforms</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p className="text-muted-foreground">
                  <strong>Key Regulations:</strong> FERPA (student records), COPPA (children under 13)
                </p>
                <p className="font-semibold">Recommendations:</p>
                <ul className="space-y-1">
                  <li>• <strong>Age verification</strong>: Do not allow children under 13 without parental consent (COPPA)</li>
                  <li>• <strong>FERPA compliance</strong>: Student education records require specific protections</li>
                  <li>• <strong>De-identification</strong>: Strip student identifiers before AI processing</li>
                  <li>• <strong>Parental controls</strong>: Allow parents to review and delete student data</li>
                  <li>• <strong>Transparency</strong>: Clear disclosure of AI usage in educational settings</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="best-practices">
          <h2>Compliance Best Practices</h2>

          <h3>1. Know Your Compliance Requirements</h3>
          <p>
            Before deploying TopFlow in production:
          </p>
          <ul>
            <li>Identify which regulations apply to your organization and use case</li>
            <li>Document specific technical requirements (encryption standards, audit logging, etc.)</li>
            <li>Understand data residency requirements (EU data stays in EU, etc.)</li>
            <li>Review AI provider compliance certifications (SOC 2, ISO 27001, etc.)</li>
          </ul>

          <h3>2. Implement Defense-in-Depth</h3>
          <p>
            Layer multiple security controls:
          </p>
          <ul>
            <li><strong>Network layer</strong>: TLS 1.3, rate limiting, DDoS protection</li>
            <li><strong>Application layer</strong>: Input validation, SSRF prevention, cycle detection</li>
            <li><strong>Data layer</strong>: Encryption at rest, secure key management</li>
            <li><strong>Monitoring layer</strong>: Audit logging, anomaly detection, alerting</li>
          </ul>

          <h3>3. Document Everything</h3>
          <p>
            For audit readiness:
          </p>
          <ul>
            <li>Maintain a data flow diagram showing where data goes</li>
            <li>Document security controls and their implementation</li>
            <li>Keep version history of compliance-related code changes</li>
            <li>Create runbooks for incident response</li>
            <li>Generate compliance reports (SOC 2, GDPR, etc.)</li>
          </ul>

          <h3>4. Use Code Export for Audit Trails</h3>
          <p>
            TopFlow's code export feature generates <strong>production-ready TypeScript</strong> from your workflows.
            This provides:
          </p>
          <ul>
            <li><strong>Audit trail</strong>: Exact code that runs in production</li>
            <li><strong>Version control</strong>: Commit exported code to git for history</li>
            <li><strong>Code review</strong>: Security team can review exported TypeScript</li>
            <li><strong>Compliance evidence</strong>: Show auditors the actual implementation</li>
          </ul>

          <h3>5. Regular Security Reviews</h3>
          <p>
            Maintain security posture over time:
          </p>
          <ul>
            <li><strong>Quarterly</strong>: Review access controls, update dependencies, check audit logs</li>
            <li><strong>Annually</strong>: Penetration testing, compliance assessment, security training</li>
            <li><strong>On change</strong>: Security review for new workflows or integrations</li>
          </ul>

          <h3>6. Vendor Management</h3>
          <p>
            For AI providers (OpenAI, Anthropic, Google, Groq):
          </p>
          <ul>
            <li>Review their security certifications (SOC 2, ISO 27001, GDPR compliance)</li>
            <li>Sign Data Processing Agreements (DPA) or Business Associate Agreements (BAA) as needed</li>
            <li>Monitor for security advisories and update API versions</li>
            <li>Have backup providers in case of outages or policy changes</li>
          </ul>

          <h3>7. Train Your Team</h3>
          <p>
            Compliance is not just technical:
          </p>
          <ul>
            <li>Train developers on secure coding practices (OWASP Top 10, AI-specific threats)</li>
            <li>Educate users on data handling best practices (don't include PII in prompts)</li>
            <li>Establish clear policies for workflow creation and review</li>
            <li>Create incident response procedures everyone understands</li>
          </ul>
        </section>

        <div className="not-prose mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Related Documentation</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="/docs/security/validations" className="text-sm text-chart-3 hover:underline">
              → Security Validations (12 security checks)
            </a>
            <a href="/docs/security/architecture" className="text-sm text-chart-3 hover:underline">
              → Security Architecture (defense-in-depth layers)
            </a>
            <a href="/docs/learn/workflows-101" className="text-sm text-chart-3 hover:underline">
              → Workflows 101 (build secure workflows)
            </a>
            <a href="/blog/gdpr-automation-workflow" className="text-sm text-chart-3 hover:underline">
              → Blog: GDPR Automation Workflow
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
