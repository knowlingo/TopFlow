import { Shield, Lock, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react"

export function SecurityLayersBlogContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Security as a Showcase Priority</h2>
      <p>
        As a former CISO, I built TopFlow not just as a functional AI workflow builder, but as a demonstration of
        production-grade security architecture. Every line of code reflects 15 years of security leadership experience.
      </p>
      <p>
        This post covers TopFlow's 5-layer defense-in-depth model and how it maps to the OWASP Top 10. All referenced
        source files are in the{" "}
        <a
          href="https://github.com/csupenn/topflow"
          className="text-primary hover:underline inline-flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          public GitHub repo
          <ExternalLink className="w-3 h-3" />
        </a>
        .
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
            controls: "Input sanitization, XSS prevention, CSP headers, AES-256-GCM encryption of API keys at rest",
          },
          { layer: "Layer 2: Transport", icon: Lock, controls: "TLS 1.3, HSTS, secure headers" },
          {
            layer: "Layer 3: API Gateway",
            icon: AlertTriangle,
            controls: "Sliding-window rate limiting (in-memory ↔ Upstash Redis), DDoS protection",
          },
          {
            layer: "Layer 4: Execution",
            icon: CheckCircle2,
            controls: "SSRF prevention (provenance-aware), cycle detection, timeout enforcement, sandboxed JS",
          },
          {
            layer: "Layer 5: External APIs",
            icon: Lock,
            controls: "HTTPS-only, user-held credentials (BYOK), no platform-managed secrets",
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
      <p>Here's how TopFlow addresses key OWASP Top 10 vulnerabilities with specific implementation details:</p>

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
            <li>Zod schemas validate all workflow inputs at the API boundary</li>
            <li>No direct database queries (stateless architecture eliminates SQL injection entirely)</li>
            <li>React auto-escapes JSX output by default</li>
            <li>JavaScript nodes use <code className="text-primary text-sm bg-muted px-1 rounded">new Function()</code> instead of <code className="text-primary text-sm bg-muted px-1 rounded">eval()</code> with a limited scope</li>
          </ul>
          <pre className="bg-panel border border-border rounded-lg p-4 overflow-x-auto text-sm mt-4">
            <code>{`import { z } from 'zod'

const WorkflowSchema = z.object({
  nodes: z.array(z.object({
    id: z.string(),
    type: z.enum(['textModel', 'httpRequest', 'javascript', 'conditional', ...]),
    data: z.record(z.string(), z.unknown()),
  })),
  edges: z.array(z.object({
    source: z.string(),
    target: z.string(),
  })),
})`}</code>
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
            <li>No PII storage — the platform never receives or stores user workflow data</li>
            <li>
              API keys encrypted at rest with AES-256-GCM (Web Crypto API) before being written to
              localStorage — see{" "}
              <a
                href="https://github.com/csupenn/topflow/blob/main/lib/security/encryption.ts"
                className="text-primary hover:underline inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                lib/security/encryption.ts
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>TLS 1.3 for all connections; HSTS headers enforce HTTPS</li>
            <li>
              <strong className="text-foreground">Honest limitation:</strong> a client-held key is not
              XSS-proof — a script running in the page can read both the ciphertext and the key from
              localStorage. The encryption protects against plaintext-at-rest inspection and casual
              exfiltration, not against a script-injection attacker.
            </li>
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
            <li>No default credentials — BYOK model means no platform-managed secrets exist</li>
            <li>
              <code className="text-primary text-sm bg-muted px-1 rounded">typescript.ignoreBuildErrors</code> removed from{" "}
              <code className="text-primary text-sm bg-muted px-1 rounded">next.config.mjs</code>; CI enforces
              type-check on every PR
            </li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            A10: Server-Side Request Forgery (SSRF)
          </h3>
          <p className="mb-4">
            <strong className="text-foreground">Risk:</strong> Internal network access, cloud metadata credential theft
          </p>
          <p className="mb-4">
            <strong className="text-foreground">Mitigation:</strong>
          </p>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>HTTPS/HTTP-only scheme allowlist — file://, ftp://, and all other schemes are rejected</li>
            <li>Private IP blocklist: 10.x, 172.16–31.x, 192.168.x, 127.x, 169.254.x, CGNAT, multicast/reserved</li>
            <li>Cloud metadata blocking: 169.254.169.254, metadata.google.internal, *.internal, *.local</li>
            <li>
              Provenance-aware exemption: engine-generated routes (e.g.{" "}
              <code className="text-primary text-sm bg-muted px-1 rounded">/api/scan/github</code>) bypass
              the check; only user-supplied URLs are validated — see{" "}
              <a
                href="https://github.com/csupenn/topflow/blob/main/lib/security/ssrf.ts"
                className="text-primary hover:underline inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                lib/security/ssrf.ts
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Production-Grade Controls</h2>
      <p>Beyond OWASP, TopFlow implements additional security controls:</p>

      <ul className="space-y-3 my-6">
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Durable Rate Limiting:</strong> Sliding-window limiter
            (10 req/min per IP) backed by{" "}
            <a
              href="https://github.com/csupenn/topflow/blob/main/lib/security/rate-limit.ts"
              className="text-primary hover:underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              a pluggable store interface
              <ExternalLink className="w-3 h-3" />
            </a>
            : <code className="text-primary text-sm bg-muted px-1 rounded">MemoryRateLimitStore</code> in
            dev/test (injectable clock for deterministic unit tests),{" "}
            <code className="text-primary text-sm bg-muted px-1 rounded">UpstashRateLimitStore</code> in
            production (Redis-backed, durable across serverless instances)
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Timeout Enforcement:</strong> 30-second maximum execution
            time prevents resource exhaustion
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Cycle Detection:</strong> DFS pre-execution check rejects
            cyclic graphs before any node runs — prevents infinite-loop resource exhaustion
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Input Validation:</strong> Zod schemas enforce type safety
            and constraints at every API boundary
          </div>
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Conclusion</h2>
      <p>
        Building secure applications isn't about adding security as an afterthought — it's about designing security into
        every layer from the start. TopFlow demonstrates that former CISOs can still code, and that security expertise
        translates directly into better architecture decisions.
      </p>

      <div className="bg-card border border-border rounded-lg p-6 my-6 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Go Deeper</h3>
        <p className="text-sm">
          The AI Security Tutorial series covers each of these controls in detail — threat models,
          attack trees, design trade-offs, and hands-on labs.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href="https://topflow.dev/blog/01-ssrf-cycle-detection-rate-limiting"
            className="text-primary hover:underline inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tutorial 01 — SSRF, Cycle Detection & Rate Limiting
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://topflow.dev/blog/02-secrets-at-rest-byok-encryption"
            className="text-primary hover:underline inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tutorial 02 — Secrets at Rest (AES-256-GCM)
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://topflow.dev/blog/04-durable-rate-limiting-upstash-redis"
            className="text-primary hover:underline inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tutorial 04 — Durable Rate Limiting
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/csupenn/topflow"
            className="text-primary hover:underline inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub — csupenn/topflow
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
