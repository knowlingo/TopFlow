import { Metadata } from "next"
import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsFooter } from "@/components/docs/docs-footer"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  Key,
  FileWarning,
  Network,
  Database,
  Code,
  Globe,
  FileText,
  Server,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Security Validations",
  description: "Comprehensive security validation checks including SSRF prevention, cycle detection, API key validation, and 12+ security controls for secure AI workflows.",
  keywords: ["security validation", "ssrf prevention", "cycle detection", "api key validation", "workflow security", "owasp top 10"],
}

const validations = [
  {
    id: "SSRF",
    name: "SSRF Prevention",
    icon: Network,
    severity: "critical",
    description:
      "Blocks Server-Side Request Forgery attempts targeting internal networks and cloud metadata endpoints.",
    checks: [
      "Private IP ranges (10.x, 172.16.x, 192.168.x)",
      "Localhost and loopback addresses",
      "Cloud metadata services (169.254.169.254)",
      "Internal DNS resolution",
    ],
  },
  {
    id: "PII",
    name: "PII Detection",
    icon: Eye,
    severity: "critical",
    description: "Identifies personally identifiable information in prompts and outputs.",
    checks: ["Email addresses", "Phone numbers", "Social Security Numbers", "Credit card numbers", "IP addresses"],
  },
  {
    id: "PROMPT_INJECTION",
    name: "Prompt Injection",
    icon: AlertTriangle,
    severity: "high",
    description: "Detects attempts to manipulate AI behavior through malicious prompts.",
    checks: [
      "Ignore previous instructions patterns",
      "System message override attempts",
      "Jailbreak techniques",
      "Role-playing exploits",
    ],
  },
  {
    id: "API_KEY_SECURITY",
    name: "API Key Security",
    icon: Key,
    severity: "critical",
    description: "Validates proper API key storage and encryption.",
    checks: [
      "No hardcoded keys in code",
      "AES-256-GCM encryption at rest",
      "Secure key rotation",
      "Access control validation",
    ],
  },
  {
    id: "DATA_VALIDATION",
    name: "Input Validation",
    icon: FileWarning,
    severity: "high",
    description: "Ensures all inputs are properly validated and sanitized.",
    checks: ["Schema validation", "Type checking", "Size limits", "Character encoding"],
  },
  {
    id: "OUTPUT_SANITIZATION",
    name: "Output Sanitization",
    icon: FileText,
    severity: "medium",
    description: "Prevents XSS and injection attacks in outputs.",
    checks: ["HTML entity encoding", "Script tag removal", "SQL injection prevention", "Command injection blocks"],
  },
  {
    id: "RATE_LIMITING",
    name: "Rate Limiting",
    icon: Server,
    severity: "medium",
    description: "Protects against abuse and DOS attacks.",
    checks: ["Request throttling", "Per-user limits", "Burst protection", "Cost management"],
  },
  {
    id: "SECURE_CONNECTIONS",
    name: "Secure Connections",
    icon: Lock,
    severity: "high",
    description: "Enforces HTTPS for all external communications.",
    checks: ["TLS 1.2+ required", "Certificate validation", "No mixed content", "HSTS headers"],
  },
  {
    id: "DATA_RETENTION",
    name: "Data Retention",
    icon: Database,
    severity: "medium",
    description: "Manages data lifecycle and compliance.",
    checks: ["Retention policies", "Automatic purging", "Audit logging", "GDPR compliance"],
  },
  {
    id: "CODE_EXECUTION",
    name: "Safe Code Execution",
    icon: Code,
    severity: "critical",
    description: "Sandboxes JavaScript execution in workflows.",
    checks: ["No filesystem access", "No network calls", "Memory limits", "Timeout enforcement"],
  },
  {
    id: "THIRD_PARTY",
    name: "Third-Party Risk",
    icon: Globe,
    severity: "medium",
    description: "Assesses risks from external integrations.",
    checks: ["Service reputation", "SLA compliance", "Data processing agreements", "Security certifications"],
  },
  {
    id: "AUDIT_LOGGING",
    name: "Audit Logging",
    icon: Shield,
    severity: "high",
    description: "Comprehensive logging for compliance and forensics.",
    checks: ["All actions logged", "Tamper-proof storage", "Retention compliance", "Search and export"],
  },
]

export default function SecurityValidationsPage() {
  return (
    <>
      <SidebarPortal currentTab="security" />

      <div className="space-y-8">
        <DocsBreadcrumb />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-destructive" />
            <h1 className="text-4xl font-bold text-balance">12 Security Validations</h1>
          </div>
          <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
            Every workflow is automatically analyzed against these 12 comprehensive security rules. Real-time validation
            helps you identify and fix issues before deployment.
          </p>
        </div>

        <Alert className="bg-destructive/10 border-destructive">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription>
            Security score is calculated as: <strong>(Passed Rules / Total Rules) × 100</strong>. Critical failures may
            prevent deployment.
          </AlertDescription>
        </Alert>

        {/* Validations */}
        <div className="space-y-4">
          {validations.map((validation) => {
            const Icon = validation.icon
            const severityColors = {
              critical: "destructive",
              high: "chart-4",
              medium: "chart-3",
            }

            return (
              <Card key={validation.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-12 w-12 rounded-lg bg-${severityColors[validation.severity as keyof typeof severityColors]}/10 flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon
                          className={`h-6 w-6 text-${severityColors[validation.severity as keyof typeof severityColors]}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CardTitle>{validation.name}</CardTitle>
                          <Badge
                            variant="outline"
                            className={`text-xs uppercase ${
                              validation.severity === "critical"
                                ? "bg-destructive/10 text-destructive border-destructive"
                                : validation.severity === "high"
                                  ? "bg-chart-4/10 text-chart-4 border-chart-4"
                                  : "bg-chart-3/10 text-chart-3 border-chart-3"
                            }`}
                          >
                            {validation.severity}
                          </Badge>
                        </div>
                        <CardDescription>{validation.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Validation Checks:</p>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {validation.checks.map((check, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Scoring Info */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle>Understanding Your Security Score</CardTitle>
            <CardDescription>How validation results impact your score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-destructive bg-destructive/5">
                <div className="text-2xl font-bold text-destructive mb-1">0-59</div>
                <div className="text-sm font-medium mb-1">Failed</div>
                <div className="text-xs text-muted-foreground">Critical issues must be resolved</div>
              </div>
              <div className="p-4 rounded-lg border border-chart-4 bg-chart-4/5">
                <div className="text-2xl font-bold text-chart-4 mb-1">60-79</div>
                <div className="text-sm font-medium mb-1">Warning</div>
                <div className="text-xs text-muted-foreground">Review recommended before deployment</div>
              </div>
              <div className="p-4 rounded-lg border border-chart-3 bg-chart-3/5">
                <div className="text-2xl font-bold text-chart-3 mb-1">80-100</div>
                <div className="text-sm font-medium mb-1">Passed</div>
                <div className="text-xs text-muted-foreground">Ready for production</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <DocsFooter
          previousPage={{
            title: "Security Overview",
            href: "/docs/security",
          }}
          nextPage={{
            title: "Compliance Frameworks",
            href: "/docs/security/compliance",
          }}
        />
      </div>
    </>
  )
}
