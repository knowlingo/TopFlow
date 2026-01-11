import { Shield, Lock, AlertTriangle, CheckCircle2 } from "lucide-react"

export function SecurityLayersBlogContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Security as a Showcase Priority</h2>
      <p>
        As a former CISO, I built TopFlow not just as a functional AI workflow builder, but as a demonstration of
        production-grade security architecture. Every line of code reflects 15 years of security leadership experience.
      </p>
      <p>
        This blog post is aimed at hiring managers, VCs, and security professionals evaluating technical talent. I want
        to show that I don't just understand security theory—I implement it at every layer.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The 5-Layer Security Model</h2>
      <p>
        TopFlow uses a defense-in-depth approach with five distinct security layers. Each layer addresses specific
        threats, and together they provide comprehensive protection:
      </p>

      <div className="grid gap-4 my-8">
        {[
          {
            layer: "Layer 1: Client-Side",
            icon: Shield,
            controls: "Input sanitization, XSS prevention, CSP headers",
          },
          { layer: "Layer 2: Transport", icon: Lock, controls: "TLS 1.3, HSTS, secure headers" },
          {
            layer: "Layer 3: API Gateway",
            icon: AlertTriangle,
            controls: "Rate limiting, DDoS protection, authentication",
          },
          {
            layer: "Layer 4: Execution",
            icon: CheckCircle2,
            controls: "SSRF prevention, cycle detection, timeout enforcement",
          },
          {
            layer: "Layer 5: External APIs",
            icon: Lock,
            controls: "HTTPS-only, user credentials, API validation",
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg p-4 flex items-start gap-4">
            <item.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{item.layer}</h3>
              <p className="text-sm text-muted-foreground">{item.controls}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">OWASP Top 10 Coverage</h2>
      <p>Here's how TopFlow addresses each of the OWASP Top 10 vulnerabilities with specific implementation details:</p>

      <div className="space-y-6 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            A01: Injection
          </h3>
          <p className="mb-4">
            <strong className="text-foreground">Risk:</strong> SQL injection, command injection, XSS attacks
          </p>
          <p className="mb-4">
            <strong className="text-foreground">Mitigation:</strong>
          </p>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>Zod schemas validate all user inputs</li>
            <li>DOMPurify sanitizes HTML content</li>
            <li>No direct database queries (stateless architecture)</li>
            <li>React auto-escapes JSX by default</li>
          </ul>
          <pre className="bg-panel border border-border rounded-lg p-4 overflow-x-auto text-sm mt-4">
            <code>{`import { z } from 'zod'
import DOMPurify from 'dompurify'

const NodeSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['llm', 'http', 'transform']),
  config: z.record(z.string(), z.any()),
})

// Sanitize user-provided HTML
const clean = DOMPurify.sanitize(userInput)`}</code>
          </pre>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            A03: Sensitive Data Exposure
          </h3>
          <p className="mb-4">
            <strong className="text-foreground">Risk:</strong> PII leakage, API key exposure, data breaches
          </p>
          <p className="mb-4">
            <strong className="text-foreground">Mitigation:</strong>
          </p>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>No PII storage (privacy-first architecture)</li>
            <li>API keys stored client-side only (localStorage)</li>
            <li>TLS 1.3 for all connections</li>
            <li>HSTS headers enforce HTTPS</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            A05: Security Misconfiguration
          </h3>
          <p className="mb-4">
            <strong className="text-foreground">Risk:</strong> Exposed endpoints, verbose errors, default credentials
          </p>
          <p className="mb-4">
            <strong className="text-foreground">Mitigation:</strong>
          </p>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>Security headers (CSP, X-Frame-Options, X-Content-Type-Options)</li>
            <li>Error messages don't leak stack traces in production</li>
            <li>No default credentials (BYOK model)</li>
            <li>Regular npm audit and Snyk scanning</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            A10: Server-Side Request Forgery (SSRF)
          </h3>
          <p className="mb-4">
            <strong className="text-foreground">Risk:</strong> Internal network access, cloud metadata exposure
          </p>
          <p className="mb-4">
            <strong className="text-foreground">Mitigation:</strong>
          </p>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>HTTPS-only URL validation</li>
            <li>Private IP blocking (10.x, 172.16.x, 192.168.x, 169.254.x)</li>
            <li>Cloud metadata endpoint blocking</li>
            <li>Allowlist approach for external APIs</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Production-Grade Controls</h2>
      <p>Beyond OWASP, TopFlow implements additional security controls:</p>

      <ul className="space-y-3 my-6">
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Rate Limiting:</strong> 10 requests/minute per IP using Redis-backed
            distributed counters
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Timeout Enforcement:</strong> 30-second maximum execution time prevents
            resource exhaustion
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Cycle Detection:</strong> Graph analysis prevents infinite loops in
            workflows
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Input Validation:</strong> Zod schemas enforce type safety and
            constraints
          </div>
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Conclusion</h2>
      <p>
        Building secure applications isn't about adding security as an afterthought—it's about designing security into
        every layer from the start. TopFlow demonstrates that former CISOs can still code, and that security expertise
        translates directly into better architecture decisions.
      </p>
      <p>
        Want to see these security controls in action? Try building a workflow at{" "}
        <a href="https://topflow.dev" className="text-primary hover:underline">
          topflow.dev
        </a>
        .
      </p>
    </div>
  )
}
