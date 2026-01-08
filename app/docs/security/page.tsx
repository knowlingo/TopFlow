import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, FileCheck, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsFooter } from "@/components/docs/docs-footer"
import { Badge } from "@/components/ui/badge"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { securitySidebar } from "@/lib/docs/sidebar-data"

export const metadata = {
  title: "Security & Compliance | TopFlow - GDPR, SOC 2, HIPAA",
  description: "Enterprise-grade security validations. Learn how TopFlow implements 12 security rules, SSRF prevention, and privacy-by-design principles.",
}

export default function SecurityOverviewPage() {
  return (
    <>
      <SidebarPortal sections={securitySidebar} currentTab="security" />

      <div className="space-y-8">
        <DocsBreadcrumb />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-balance">Security & Compliance</h1>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">
              Enterprise Ready
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
            Built by a former CISO. TopFlow provides enterprise-grade security validations and compliance frameworks out
            of the box. Every workflow is automatically analyzed against 12 security rules.
          </p>
        </div>

        {/* Security Score Highlight */}
        <Card className="border-2 border-destructive bg-destructive/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive flex items-center justify-center">
                  <Shield className="h-5 w-5 text-destructive-foreground" />
                </div>
                <div>
                  <CardTitle>Real-Time Security Scoring</CardTitle>
                  <CardDescription>Get instant feedback on your workflow's security posture</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Every workflow receives a security score from 0-100 based on 12 comprehensive validation rules. Address
              issues in real-time before deployment.
            </p>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Critical: Must fix</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-4" />
                <span className="text-muted-foreground">Warning: Review needed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">Pass: Secure</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Security Validations */}
          <Link href="/docs/security/validations">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-3 group-hover:bg-destructive/20 transition-colors">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">12 Security Validations</CardTitle>
                <CardDescription>Comprehensive security rule documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>SSRF Prevention</span>
                    <Badge variant="outline" className="text-xs">
                      Critical
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PII Detection</span>
                    <Badge variant="outline" className="text-xs">
                      Critical
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Prompt Injection</span>
                    <Badge variant="outline" className="text-xs">
                      High
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Key Security</span>
                    <Badge variant="outline" className="text-xs">
                      Critical
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">+ 8 more validation rules</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Compliance Frameworks */}
          <Link href="/docs/security/compliance">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center mb-3 group-hover:bg-chart-2/20 transition-colors">
                  <FileCheck className="h-5 w-5 text-chart-2" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Compliance Frameworks</CardTitle>
                <CardDescription>GDPR, SOC 2, ISO 27001, HIPAA & more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="px-3 py-2 rounded-md bg-card border border-border text-center">
                    <div className="text-xs font-medium">GDPR</div>
                  </div>
                  <div className="px-3 py-2 rounded-md bg-card border border-border text-center">
                    <div className="text-xs font-medium">SOC 2</div>
                  </div>
                  <div className="px-3 py-2 rounded-md bg-card border border-border text-center">
                    <div className="text-xs font-medium">ISO 27001</div>
                  </div>
                  <div className="px-3 py-2 rounded-md bg-card border border-border text-center">
                    <div className="text-xs font-medium">HIPAA</div>
                  </div>
                  <div className="px-3 py-2 rounded-md bg-card border border-border text-center">
                    <div className="text-xs font-medium">OT Security</div>
                  </div>
                  <div className="px-3 py-2 rounded-md bg-card border border-border text-center">
                    <div className="text-xs font-medium">EU AI Act</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Security Reports */}
          <Link href="/docs/security/reports">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Security Reports</CardTitle>
                <CardDescription>Generate audit-ready documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    PDF export for auditors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Compliance mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Threat visualization
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Control documentation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Best Practices */}
          <Link href="/docs/security/best-practices">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center mb-3 group-hover:bg-chart-3/20 transition-colors">
                  <Lock className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Security Best Practices</CardTitle>
                <CardDescription>CISO-approved guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    API key management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Input sanitization
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Output validation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Incident response
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Templates Section */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-2">
          <CardHeader>
            <CardTitle>Compliance-Ready Templates</CardTitle>
            <CardDescription>Start with pre-validated workflows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Access 6 security-validated workflow templates covering major compliance frameworks. Each template
              includes built-in controls and audit documentation.
            </p>
            <div className="flex gap-3">
              <Link href="/builder">
                <span className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  View templates <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>

        <DocsFooter
          prevPage={{
            title: "Build Section",
            href: "/docs/build",
          }}
          nextPage={{
            title: "Security Validations",
            href: "/docs/security/validations",
          }}
        />
      </div>
    </>
  )
}
