"use client"

import type React from "react"
import { Shield, Lock, AlertTriangle, CheckCircle2, XCircle, Code, Zap, Users } from "lucide-react"

interface BlogContentProps {
  slug: string
}

export function BlogContent({ slug }: BlogContentProps) {
  const contentMap: Record<string, React.ReactNode> = {
    "why-i-built-topflow-without-a-database": <DatabaseFreeBlogContent />,
    "five-layers-of-security-owasp-top-10": <SecurityLayersBlogContent />,
    "gdpr-compliance-by-design": <GDPRComplianceBlogContent />,
    "open-source-security-transparency": <OpenSourceSecurityContent />,
    "ciso-to-fullstack-developer": <CISOToFullStackContent />,
    "preventing-ssrf-attacks-ai-workflows": <SSRFPreventionContent />,
    "20-dollar-saas-infrastructure": <BudgetSaaSContent />,
  }

  return <div className="prose prose-invert max-w-none">{contentMap[slug] || <div>Content coming soon...</div>}</div>
}

// Individual blog content components
function DatabaseFreeBlogContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">The Default Path</h2>
      <p>
        Most SaaS applications follow a predictable pattern: collect user data, store it in PostgreSQL, analyze usage
        patterns, and monetize through subscriptions. It's the established playbook, and for good reason—it works.
      </p>
      <p>
        But this default path comes with significant baggage: GDPR compliance requirements, data breach risks,
        encryption complexity, backup strategies, and the ongoing responsibility of protecting user information.
      </p>
      <p className="bg-card border-l-4 border-primary p-4 italic">
        "Every major SaaS breach started with 'we store user data securely.' The question isn't if you'll be breached,
        but when."
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Privacy-First Alternative</h2>
      <p>
        TopFlow takes a radically different approach: zero server-side data storage. User workflows live entirely in the
        browser's localStorage, and execution happens in a stateless, request-scoped context.
      </p>

      <h3 className="text-2xl font-semibold text-foreground mt-8 mb-3">How It Works</h3>
      <ul className="space-y-2 list-disc list-inside">
        <li>
          <strong className="text-foreground">Client-side storage:</strong> Workflows are saved in localStorage, never
          sent to our servers
        </li>
        <li>
          <strong className="text-foreground">Stateless execution:</strong> When you run a workflow, we process it and
          return results—no data is retained
        </li>
        <li>
          <strong className="text-foreground">Ephemeral rate limiting:</strong> Redis stores hashed IPs for 24 hours
          (for DDoS protection), then auto-deletes
        </li>
        <li>
          <strong className="text-foreground">No PII = No breach:</strong> Without personal data, there's nothing to
          steal
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Real-World Implementation</h2>
      <p>
        This isn't just theory. Here's how TopFlow implements privacy-first architecture in production with Next.js and
        TypeScript:
      </p>

      <pre className="bg-panel border border-border rounded-lg p-4 overflow-x-auto text-sm">
        <code>{`// Client-side workflow storage
export function saveWorkflow(workflow: Workflow) {
  localStorage.setItem('topflow-workflow', JSON.stringify(workflow))
}

// Stateless execution (no data retention)
export async function executeWorkflow(workflow: Workflow) {
  const response = await fetch('/api/execute', {
    method: 'POST',
    body: JSON.stringify(workflow),
  })
  // Server processes and returns results immediately
  // No data is stored on our end
  return response.json()
}`}</code>
      </pre>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">GDPR Compliance: Automatic</h2>
      <p>Here's the beautiful part: when you don't collect data, GDPR compliance becomes dramatically simpler:</p>
      <ul className="space-y-2 list-disc list-inside">
        <li>
          <strong className="text-foreground">Article 5 (Data Minimization):</strong> ✅ We don't collect any personal
          data
        </li>
        <li>
          <strong className="text-foreground">Article 15 (Right to Access):</strong> ✅ Users already have their data
          (it's in their browser)
        </li>
        <li>
          <strong className="text-foreground">Article 17 (Right to Erasure):</strong> ✅ Users can delete their data
          anytime (clear localStorage)
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Trade-offs & When This Works</h2>
      <p>This architecture isn't for everyone. Here's when it makes sense:</p>

      <div className="bg-card border border-border rounded-lg p-6 my-6">
        <h3 className="text-xl font-semibold text-foreground mb-3">✅ Perfect For:</h3>
        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
          <li>Developer tools and calculators</li>
          <li>Privacy-focused products</li>
          <li>Demo applications and prototypes</li>
          <li>Security showcases (like TopFlow)</li>
        </ul>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 my-6">
        <h3 className="text-xl font-semibold text-foreground mb-3">❌ Not Ideal For:</h3>
        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
          <li>Social networks (need persistent relationships)</li>
          <li>Collaboration tools (require shared state)</li>
          <li>Cross-device sync applications</li>
          <li>Multi-user platforms</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Results</h2>
      <p>TopFlow's privacy-first architecture delivers tangible benefits:</p>
      <ul className="space-y-2 list-disc list-inside">
        <li>
          <strong className="text-foreground">Zero data breaches:</strong> Can't lose data you never collected
        </li>
        <li>
          <strong className="text-foreground">GDPR compliant by design:</strong> No consent forms, no data processing
          agreements
        </li>
        <li>
          <strong className="text-foreground">$0 database costs:</strong> Saves ~$50-100/month in infrastructure
        </li>
        <li>
          <strong className="text-foreground">User trust:</strong> Users control their own data, always
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Try It Yourself</h2>
      <p>
        Experience privacy-first architecture in action. Visit{" "}
        <a href="https://topflow.dev" className="text-primary hover:underline">
          topflow.dev
        </a>{" "}
        and build an AI workflow—no signup required, no data collected.
      </p>
    </div>
  )
}

function SecurityLayersBlogContent() {
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
          <pre className="bg-panel border border-border rounded-lg p-4 overflow-x-auto text-sm mt-4">
            <code>{`export function isValidUrl(url: string): boolean {
  const parsed = new URL(url)
  
  // Only HTTPS allowed
  if (parsed.protocol !== 'https:') return false
  
  // Block localhost and loopback
  if (['localhost', '127.0.0.1'].includes(parsed.hostname)) {
    return false
  }
  
  // Block private IPs
  const privateIpRanges = [
    /^10\\./,
    /^172\\.(1[6-9]|2[0-9]|3[0-1])\\./,
    /^192\\.168\\./,
    /^169\\.254\\./,
  ]
  
  for (const range of privateIpRanges) {
    if (range.test(parsed.hostname)) return false
  }
  
  // Block cloud metadata endpoints
  if (parsed.hostname.includes('metadata.google.internal')) {
    return false
  }
  
  return true
}`}</code>
          </pre>
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

function GDPRComplianceBlogContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">The GDPR Compliance Challenge</h2>
      <p>
        For most companies, GDPR compliance is complex, expensive, and risky. The regulation spans 99 articles covering
        everything from consent management to data breach notifications. Non-compliance can result in fines of €20
        million or 4% of global revenue—whichever is higher.
      </p>

      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Typical GDPR Compliance Costs:</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>Legal consultation: $10,000-50,000</li>
          <li>Compliance tools: $500-2,000/month</li>
          <li>Data protection officer: $80,000-150,000/year</li>
          <li>Ongoing monitoring and audits: $20,000-100,000/year</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">GDPR Article 5: Core Principles</h2>
      <p>GDPR's Article 5 establishes seven foundational principles for data processing:</p>

      <div className="space-y-4 my-8">
        {[
          {
            principle: "Lawfulness, fairness, transparency",
            description: "Process data legally with clear communication",
          },
          { principle: "Purpose limitation", description: "Collect data only for specified purposes" },
          { principle: "Data minimization", description: "Collect only what's necessary" },
          { principle: "Accuracy", description: "Keep personal data accurate and up to date" },
          { principle: "Storage limitation", description: "Retain data only as long as necessary" },
          { principle: "Integrity and confidentiality", description: "Protect data from unauthorized access" },
          { principle: "Accountability", description: "Demonstrate compliance" },
        ].map((item, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-1">{item.principle}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">TopFlow's Compliance Approach</h2>
      <p>TopFlow achieves GDPR compliance through a radical approach: don't collect data in the first place.</p>

      <div className="bg-chart-3/10 border border-chart-3/20 rounded-lg p-6 my-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">No Data Collection = No Consent Needed</h3>
        <p>
          When you don't collect personal data, most GDPR requirements become irrelevant. No consent forms, no data
          processing agreements, no retention policies, no breach notifications.
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">How TopFlow Implements Each Principle:</h3>

      <div className="space-y-6 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            Purpose Limitation
          </h4>
          <p>
            Data is used <em>only</em> for workflow execution within a single request. Once the execution completes and
            results are returned, all data is discarded. No logging, no analytics, no retention.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            Data Minimization
          </h4>
          <p>
            TopFlow collects zero personal data on servers. Workflows are stored client-side in localStorage. The only
            server-side data is hashed IP addresses for rate limiting (see Storage Limitation below).
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            Storage Limitation
          </h4>
          <p>
            <strong className="text-foreground">Workflow data:</strong> 0 seconds retention (request-scoped)
          </p>
          <p>
            <strong className="text-foreground">Rate limiting data:</strong> 24 hours maximum (Redis TTL, hashed IPs
            only)
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            Integrity and Confidentiality
          </h4>
          <p>
            Since no PII is stored on servers, there's no risk of data breaches. Client-side data is protected by the
            browser's same-origin policy and HTTPS.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">GDPR Rights: Automatically Satisfied</h2>
      <p>TopFlow's architecture automatically satisfies all GDPR individual rights:</p>

      <div className="grid md:grid-cols-2 gap-4 my-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Article 15: Right to Access</h4>
          <p className="text-sm text-muted-foreground">
            Users already have their data—it's in their browser's localStorage. They can view it anytime via DevTools.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Article 16: Right to Rectification</h4>
          <p className="text-sm text-muted-foreground">
            Users can edit their workflows directly in the TopFlow UI. Changes are instant since data is local.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Article 17: Right to Erasure</h4>
          <p className="text-sm text-muted-foreground">
            Users can delete their data with{" "}
            <code className="bg-panel px-1 py-0.5 rounded text-xs">localStorage.clear()</code> or by clicking "Clear
            All" in the UI.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Article 20: Right to Portability</h4>
          <p className="text-sm text-muted-foreground">
            Users can export their workflows as JSON with a single click. No server involvement needed.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Privacy Impact Assessment</h2>
      <p>Here's the formal privacy analysis for TopFlow:</p>

      <div className="bg-panel border border-border rounded-lg p-6 my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-foreground">Category</th>
              <th className="text-left py-2 text-foreground">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-2 font-medium">Processing Activities</td>
              <td className="py-2">Workflow execution, rate limiting</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Personal Data</td>
              <td className="py-2">None (stateless) / Hashed IP (rate limiting only)</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Retention Period</td>
              <td className="py-2">0 seconds (stateless) / 24 hours (rate limiting)</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Data Subjects</td>
              <td className="py-2">Website visitors, workflow creators</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Risk Level</td>
              <td className="py-2 text-chart-3 font-semibold">LOW</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">When This Works (And Doesn't)</h2>
      <p>This privacy-first approach isn't universal. Here's when it makes sense:</p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-chart-3/10 border border-chart-3/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            Perfect For:
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Developer tools and calculators</li>
            <li>Privacy-focused products</li>
            <li>Compliance showcase projects</li>
            <li>Single-user applications</li>
          </ul>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-destructive" />
            Not Suitable For:
          </h3>
          <ul className="space-y-2 text-sm">
            <li>User accounts and authentication</li>
            <li>Analytics and personalization</li>
            <li>Collaboration features</li>
            <li>Cross-device synchronization</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Conclusion</h2>
      <p>
        GDPR compliance doesn't have to be complex or expensive. By designing privacy into your architecture from day
        one, you can build products that are compliant by default rather than compliant by effort.
      </p>
      <p>
        TopFlow proves that privacy-first doesn't mean feature-poor. Experience it yourself at{" "}
        <a href="https://topflow.dev" className="text-primary hover:underline">
          topflow.dev
        </a>
        .
      </p>
    </div>
  )
}

function OpenSourceSecurityContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">The Security Through Obscurity Myth</h2>
      <p>
        There's a persistent belief in our industry: don't share security details publicly. The thinking goes that if
        attackers know how your system works, they can exploit it more easily. This is security through obscurity—and
        it's fundamentally flawed.
      </p>
      <p>
        History proves otherwise. The most trusted security systems in the world are open source: Linux powers 96% of
        web servers, OpenSSL secures internet traffic, and modern cryptography relies on publicly reviewed algorithms
        like AES and RSA.
      </p>

      <div className="bg-card border-l-4 border-primary p-6 my-6">
        <p className="italic text-lg">
          "In cryptography we trust, but only after peer review. Security through obscurity is security theater."
        </p>
        <p className="text-sm text-muted-foreground mt-2">— Bruce Schneier, Security Expert</p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Why Transparency Strengthens Security</h2>
      <p>
        TopFlow's approach is radical: all architecture documentation is public. Here's why this makes security
        stronger:
      </p>

      <div className="space-y-4 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Peer Review at Scale
          </h3>
          <p>
            When security architecture is public, hundreds of developers can review it. This crowdsourced security
            review finds vulnerabilities faster than any internal team could.
          </p>
          <p className="mt-3 text-sm">
            <strong className="text-foreground">Example:</strong> The Heartbleed bug in OpenSSL was severe, but it was
            found and fixed quickly because the code was public. Private codebases hide vulnerabilities until they're
            exploited.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Accountability Through Visibility
          </h3>
          <p>
            Public documentation creates accountability. When your security decisions are visible, you're more careful
            about what you claim. There's no hiding behind marketing speak—the code and architecture speak for
            themselves.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Faster Vulnerability Discovery
          </h3>
          <p>
            Security researchers can audit your system without needing permission. This means vulnerabilities are
            discovered and reported through responsible disclosure, not exploited in the wild.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">TopFlow's Open Approach</h2>
      <p>TopFlow's architecture documentation is completely public. Here's what I've shared:</p>

      <ul className="space-y-3 my-6">
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Complete architecture documentation:</strong> 166 pages covering system
            design, security architecture, deployment strategy, and scalability considerations
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Security decision records (ADRs):</strong> Every major security decision
            is documented with rationale, trade-offs, and alternatives considered
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Threat models:</strong> Documented attack vectors and mitigation
            strategies for SSRF, XSS, injection, and other OWASP Top 10 vulnerabilities
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Code examples:</strong> Real TypeScript implementations showing how
            security controls work in production
          </div>
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What NOT to Share</h2>
      <p>Transparency doesn't mean sharing everything. Here are the clear boundaries:</p>

      <div className="grid md:grid-cols-2 gap-4 my-8">
        <div className="bg-chart-3/10 border border-chart-3/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            Share These
          </h3>
          <ul className="space-y-2 text-sm list-disc list-inside">
            <li>Architecture patterns and design decisions</li>
            <li>Security controls and validation logic</li>
            <li>API schemas and data flow diagrams</li>
            <li>Performance optimization strategies</li>
          </ul>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-destructive" />
            Never Share These
          </h3>
          <ul className="space-y-2 text-sm list-disc list-inside">
            <li>Production API keys and secrets</li>
            <li>User data (TopFlow doesn't collect any)</li>
            <li>Internal deployment credentials</li>
            <li>Specific version numbers of dependencies</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Career Impact of Public Security Work</h2>
      <p>Sharing TopFlow's architecture publicly has tangible career benefits:</p>

      <ul className="space-y-3 my-6">
        <li className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Demonstrates real expertise:</strong> Anyone can claim to understand
            security. Public architecture documentation proves it.
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Shows confidence in your work:</strong> Being willing to have your
            architecture peer-reviewed demonstrates technical confidence and maturity.
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Builds community reputation:</strong> Contributing to public knowledge
            establishes you as a thought leader, not just another security practitioner.
          </div>
        </li>
        <li className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Attracts collaboration:</strong> Other developers find your work, learn
            from it, and potentially contribute improvements back.
          </div>
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Results</h2>
      <p>TopFlow's transparent approach has delivered measurable benefits:</p>

      <div className="grid md:grid-cols-2 gap-4 my-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-3xl font-bold text-primary mb-2">Zero</div>
          <div className="text-sm text-muted-foreground">Security issues found in production since launch</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-3xl font-bold text-primary mb-2">166</div>
          <div className="text-sm text-muted-foreground">Pages of public architecture documentation</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-3xl font-bold text-primary mb-2">100%</div>
          <div className="text-sm text-muted-foreground">OWASP Top 10 coverage with documented mitigations</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-3xl font-bold text-primary mb-2">Full</div>
          <div className="text-sm text-muted-foreground">Transparency = full user trust in security claims</div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Conclusion</h2>
      <p>
        Security through transparency isn't just a philosophy—it's a competitive advantage. When you're confident enough
        to share your architecture publicly, you're demonstrating that your security controls can withstand scrutiny.
        This is the opposite of security theater.
      </p>
      <p>
        TopFlow proves that former CISOs can still code, that security expertise translates to better architecture, and
        that transparency builds trust. Review TopFlow's public architecture at{" "}
        <a href="https://topflow.dev/docs" className="text-primary hover:underline">
          topflow.dev/docs
        </a>
        .
      </p>
    </div>
  )
}

function CISOToFullStackContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">The CISO Stereotype</h2>
      <p>
        There's a common assumption in tech: once you reach the C-suite in security, you stop coding. CISOs are seen as
        strategic thinkers who understand compliance frameworks and risk matrices, but who couldn't build a production
        application if their careers depended on it.
      </p>
      <p>
        After 15 years in security leadership roles, I decided to challenge that stereotype. I built TopFlow—a
        production AI workflow builder—from scratch in 4 weeks. No team, no contractors, just me, VSCode, and a lot of
        coffee.
      </p>

      <div className="bg-primary/10 border-l-4 border-primary p-6 my-6">
        <p className="font-semibold text-foreground text-lg mb-2">Why This Matters</p>
        <p>
          This isn't about proving I can code. It's about demonstrating that security expertise at the strategic level
          translates directly to better technical decisions at the implementation level. CISOs who can code build more
          secure applications because they understand the threats from both angles.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The 4-Week Build Timeline</h2>
      <p>Here's how I structured the development process:</p>

      <div className="space-y-4 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Week 1: Architecture & Security Design</h3>
          <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
            <li>Designed privacy-first architecture (no database)</li>
            <li>Created 5-layer security model</li>
            <li>Mapped OWASP Top 10 mitigations</li>
            <li>Chose tech stack: Next.js, TypeScript, React Flow, Tailwind</li>
          </ul>
          <div className="mt-4 text-sm">
            <strong className="text-foreground">Key Decision:</strong> Stateless architecture eliminates 70% of typical
            security concerns
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Week 2: Core Workflow Engine</h3>
          <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
            <li>Built drag-and-drop canvas with React Flow</li>
            <li>Implemented 10 node types (LLM, HTTP, Transform, etc.)</li>
            <li>Added cycle detection and validation</li>
            <li>Created execution engine with timeout controls</li>
          </ul>
          <div className="mt-4 text-sm">
            <strong className="text-foreground">CISO Insight:</strong> Security validations built into every node type
            from day one
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Week 3: Security Hardening</h3>
          <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
            <li>Implemented SSRF prevention (private IP blocking, HTTPS-only)</li>
            <li>Added rate limiting with Redis</li>
            <li>Configured security headers (CSP, HSTS, X-Frame-Options)</li>
            <li>Built input sanitization with Zod and DOMPurify</li>
          </ul>
          <div className="mt-4 text-sm">
            <strong className="text-foreground">Time Advantage:</strong> 15 years of security experience meant no
            research needed—just implementation
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Week 4: Polish & Documentation</h3>
          <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
            <li>Created 7 demo templates with cached results</li>
            <li>Added UI polish and animations</li>
            <li>Wrote 166 pages of architecture documentation</li>
            <li>Deployed to Vercel with production security config</li>
          </ul>
          <div className="mt-4 text-sm">
            <strong className="text-foreground">Documentation First:</strong> Comprehensive docs demonstrate expertise
            and enable peer review
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Technical Skills Applied</h2>
      <p>Building TopFlow required combining strategic security thinking with hands-on development:</p>

      <div className="grid md:grid-cols-2 gap-4 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            From CISO Experience
          </h3>
          <ul className="space-y-2 text-sm list-disc list-inside">
            <li>OWASP Top 10 threat modeling</li>
            <li>Defense-in-depth architecture</li>
            <li>GDPR compliance by design</li>
            <li>Risk-based decision making</li>
            <li>Security-first engineering culture</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            New Technical Skills
          </h3>
          <ul className="space-y-2 text-sm list-disc list-inside">
            <li>Next.js App Router (learned from scratch)</li>
            <li>TypeScript strict mode</li>
            <li>React Flow library integration</li>
            <li>Tailwind CSS and modern UI patterns</li>
            <li>Vercel serverless deployment</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Key Lessons Learned</h2>

      <div className="space-y-4 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">1. Constraints Drive Better Architecture</h3>
          <p className="text-sm">
            Choosing not to use a database forced me to design a truly stateless system. This constraint eliminated
            entire categories of security vulnerabilities and compliance requirements.
          </p>
          <p className="text-sm mt-3 italic">
            Lesson: Don't fight constraints—use them to drive architectural decisions.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            2. Security Expertise Translates to Code Quality
          </h3>
          <p className="text-sm">
            My security background meant I naturally wrote defensive code: input validation everywhere, proper error
            handling, timeout enforcement, and comprehensive logging.
          </p>
          <p className="text-sm mt-3 italic">
            Lesson: Security thinking makes you a better developer, not just a better security professional.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">3. Documentation is a Competitive Advantage</h3>
          <p className="text-sm">
            Writing 166 pages of architecture documentation wasn't busy work—it forced me to think through every
            decision and created a portfolio piece that demonstrates expertise better than any resume could.
          </p>
          <p className="text-sm mt-3 italic">
            Lesson: Public documentation is marketing, portfolio, and peer review all in one.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">4. Modern Tools Accelerate Development</h3>
          <p className="text-sm">
            Next.js, TypeScript, and Vercel meant I could focus on business logic instead of boilerplate. The modern
            JavaScript ecosystem is incredibly productive compared to what existed 10 years ago.
          </p>
          <p className="text-sm mt-3 italic">Lesson: Use modern tools—they exist to make you more productive.</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Stack Breakdown</h2>
      <p>Here's the complete technical stack that powered TopFlow's development:</p>

      <div className="bg-panel border border-border rounded-lg p-6 my-8">
        <pre className="text-sm overflow-x-auto">
          <code>{`Frontend:
- Next.js 14 (App Router)
- React 18 with TypeScript
- React Flow (canvas/workflow visualization)
- Tailwind CSS (styling)
- Lucide React (icons)

Backend:
- Next.js API Routes (serverless)
- Zod (validation)
- Redis (rate limiting via Upstash)

Security:
- HTTPS-only (enforced)
- CSP headers
- HSTS
- DOMPurify (XSS prevention)
- Private IP blocking (SSRF prevention)

Deployment:
- Vercel (hosting)
- Vercel Analytics
- GitHub (version control)`}</code>
        </pre>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Career Impact</h2>
      <p>Building TopFlow has already changed my career trajectory:</p>

      <ul className="space-y-3 my-6">
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Proves technical credibility:</strong> No longer just "the security
            guy"—now I'm a security professional who ships production code
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Portfolio differentiation:</strong> Most CISO candidates can't
            demonstrate full-stack development skills with a live product
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Conversation starter:</strong> Every interview now includes "Tell me
            about TopFlow"—automatic differentiation
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Community engagement:</strong> Public architecture documentation
            attracts peer review and networking opportunities
          </div>
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Conclusion</h2>
      <p>
        The stereotype that CISOs can't code is outdated and limiting. Modern security leadership requires understanding
        implementation details, not just risk frameworks. Building TopFlow proved that security expertise makes you a
        better developer, and that hands-on development makes you a better security leader.
      </p>
      <p>
        If you're in security leadership and wondering whether you can still build things: yes, you absolutely can. The
        skills transfer better than you think. See the result at{" "}
        <a href="https://topflow.dev" className="text-primary hover:underline">
          topflow.dev
        </a>
        .
      </p>
    </div>
  )
}

function SSRFPreventionContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">What is SSRF?</h2>
      <p>
        Server-Side Request Forgery (SSRF) is a vulnerability that allows attackers to make the server send HTTP
        requests to arbitrary destinations. In the context of AI agent workflows, this becomes particularly dangerous
        when users can specify URLs that the server will fetch.
      </p>

      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-6">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Real-World Impact
        </h3>
        <p className="mb-4">
          <strong>Example Attack:</strong> User provides URL → Server fetches → Exposes internal resources
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>Access AWS metadata endpoint (169.254.169.254) to steal credentials</li>
          <li>Scan internal network for services</li>
          <li>Access databases through internal IPs</li>
          <li>Read cloud provider metadata for SSH keys</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">SSRF in AI Agent Context</h2>
      <p>
        AI agent builders like TopFlow include HTTP request nodes that allow users to fetch data from APIs. This is
        powerful functionality, but without proper validation, it creates an SSRF attack surface:
      </p>

      <pre className="bg-panel border border-border rounded-lg p-4 overflow-x-auto text-sm my-6">
        <code>{`// Vulnerable code example (DO NOT USE)
async function executeHttpNode(url: string) {
  // Attacker could provide: http://169.254.169.254/latest/meta-data/
  const response = await fetch(url)
  return response.json()
}`}</code>
      </pre>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">TopFlow's SSRF Prevention Strategy</h2>
      <p>TopFlow implements a multi-layer defense against SSRF attacks:</p>

      <div className="space-y-4 my-8">
        {[
          {
            layer: "1. HTTPS-Only Enforcement",
            description: "Only allow secure HTTPS connections, block HTTP",
            icon: Lock,
          },
          {
            layer: "2. Localhost Blocking",
            description: "Block localhost, 127.0.0.1, and loopback addresses",
            icon: XCircle,
          },
          {
            layer: "3. Private IP Blocking",
            description: "Block RFC 1918 private IP ranges (10.x, 172.16.x, 192.168.x)",
            icon: Shield,
          },
          {
            layer: "4. Cloud Metadata Blocking",
            description: "Block cloud provider metadata endpoints (169.254.169.254)",
            icon: AlertTriangle,
          },
          {
            layer: "5. Allowlist Enforcement",
            description: "Only allow requests to known, trusted API endpoints",
            icon: CheckCircle2,
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg p-4 flex items-start gap-4">
            <item.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{item.layer}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Code Implementation</h2>
      <p>Here's the complete SSRF prevention implementation used in TopFlow:</p>

      <pre className="bg-panel border border-border rounded-lg p-4 overflow-x-auto text-sm my-6">
        <code>{`// lib/security/url-validation.ts
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    
    // 1. Only HTTPS allowed
    if (parsed.protocol !== 'https:') {
      console.error('Only HTTPS URLs are allowed')
      return false
    }
    
    // 2. Block localhost and loopback
    const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1']
    if (blockedHosts.includes(parsed.hostname.toLowerCase())) {
      console.error('Localhost addresses are blocked')
      return false
    }
    
    // 3. Block private IP ranges (RFC 1918)
    const privateIpRanges = [
      /^10\\./,                           // 10.0.0.0/8
      /^172\\.(1[6-9]|2[0-9]|3[0-1])\\./,  // 172.16.0.0/12
      /^192\\.168\\./,                     // 192.168.0.0/16
      /^169\\.254\\./,                     // Link-local (AWS metadata)
    ]
    
    for (const range of privateIpRanges) {
      if (range.test(parsed.hostname)) {
        console.error(\`Private IP address blocked: \${parsed.hostname}\`)
        return false
      }
    }
    
    // 4. Block cloud metadata endpoints
    const metadataHosts = [
      '169.254.169.254',           // AWS, Azure, GCP
      'metadata.google.internal',   // GCP
      'metadata.azure.com',         // Azure
    ]
    
    if (metadataHosts.includes(parsed.hostname.toLowerCase())) {
      console.error('Cloud metadata endpoint blocked')
      return false
    }
    
    // 5. Allowlist check (optional but recommended)
    const allowedDomains = [
      'api.openai.com',
      'api.anthropic.com',
      'generativelanguage.googleapis.com',
    ]
    
    const isAllowed = allowedDomains.some(domain => 
      parsed.hostname === domain || parsed.hostname.endsWith(\`.\${domain}\`)
    )
    
    if (!isAllowed) {
      console.error(\`Domain not in allowlist: \${parsed.hostname}\`)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Invalid URL format:', error)
    return false
  }
}

// Usage in HTTP node execution
export async function executeHttpRequest(url: string) {
  if (!isValidUrl(url)) {
    throw new Error('Invalid or blocked URL')
  }
  
  const response = await fetch(url)
  return response.json()
}`}</code>
      </pre>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Testing & Validation</h2>
      <p>Comprehensive testing ensures the SSRF prevention works correctly:</p>

      <pre className="bg-panel border border-border rounded-lg p-4 overflow-x-auto text-sm my-6">
        <code>{`// tests/security/ssrf-prevention.test.ts
describe('SSRF Prevention', () => {
  test('blocks localhost', () => {
    expect(isValidUrl('https://localhost/api')).toBe(false)
    expect(isValidUrl('https://127.0.0.1/api')).toBe(false)
  })
  
  test('blocks private IPs', () => {
    expect(isValidUrl('https://10.0.0.1/api')).toBe(false)
    expect(isValidUrl('https://172.16.0.1/api')).toBe(false)
    expect(isValidUrl('https://192.168.1.1/api')).toBe(false)
  })
  
  test('blocks cloud metadata', () => {
    expect(isValidUrl('https://169.254.169.254/latest/meta-data/')).toBe(false)
    expect(isValidUrl('https://metadata.google.internal')).toBe(false)
  })
  
  test('allows valid API URLs', () => {
    expect(isValidUrl('https://api.openai.com/v1/chat')).toBe(true)
    expect(isValidUrl('https://api.anthropic.com/v1/messages')).toBe(true)
  })
  
  test('blocks HTTP (non-HTTPS)', () => {
    expect(isValidUrl('http://api.openai.com')).toBe(false)
  })
})`}</code>
      </pre>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Defense in Depth</h2>
      <p>SSRF prevention is just one layer. TopFlow adds additional protections:</p>

      <ul className="space-y-3 my-6">
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Network-level isolation:</strong> Run in serverless environment with no
            internal network access
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Timeout enforcement:</strong> 30-second maximum prevents long-running
            reconnaissance scans
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Rate limiting:</strong> 10 requests/minute per IP prevents automated
            scanning
          </div>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground">Logging and monitoring:</strong> All blocked requests are logged for
            security analysis
          </div>
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Key Takeaways</h2>
      <p>Preventing SSRF in AI agent workflows requires multiple layers of defense:</p>

      <div className="bg-card border border-border rounded-lg p-6 my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Never trust user-provided URLs without validation</li>
          <li>Use allowlists rather than blocklists when possible</li>
          <li>Block all private IP ranges and cloud metadata endpoints</li>
          <li>Enforce HTTPS-only connections</li>
          <li>Test extensively with automated security tests</li>
          <li>Layer defenses (validation + network isolation + rate limiting)</li>
        </ul>
      </div>

      <p>
        Want to see SSRF-protected workflows in action? Try TopFlow at{" "}
        <a href="https://topflow.dev" className="text-primary hover:underline">
          topflow.dev
        </a>
        .
      </p>
    </div>
  )
}

function BudgetSaaSContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Typical SaaS Infrastructure Costs</h2>
      <p>
        Before diving into TopFlow's budget approach, let's establish a baseline. Here's what most MVPs spend on
        infrastructure:
      </p>

      <div className="bg-card border border-border rounded-lg p-6 my-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Standard SaaS Stack ($500-1,000/month)</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>PostgreSQL (managed)</span>
            <span className="text-foreground font-mono">$50-100/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Redis (caching)</span>
            <span className="text-foreground font-mono">$20-50/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Server hosting (2-4 instances)</span>
            <span className="text-foreground font-mono">$100-200/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <span>CDN (CloudFlare/Fastly)</span>
            <span className="text-foreground font-mono">$20-50/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Monitoring (Datadog/NewRelic)</span>
            <span className="text-foreground font-mono">$50-100/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Email service (SendGrid)</span>
            <span className="text-foreground font-mono">$15-30/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Object storage (S3)</span>
            <span className="text-foreground font-mono">$10-20/mo</span>
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between items-center font-semibold">
            <span className="text-foreground">Total Monthly Cost:</span>
            <span className="text-foreground font-mono text-xl">$265-550/mo</span>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">TopFlow's $20/Month Stack</h2>
      <p>
        TopFlow runs on a radically different architecture that eliminates most infrastructure costs while maintaining
        production quality:
      </p>

      <div className="bg-chart-3/10 border border-chart-3/20 rounded-lg p-6 my-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">TopFlow Infrastructure Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Vercel Hobby Plan</div>
              <div className="text-sm text-muted-foreground">Serverless functions, edge CDN, SSL</div>
            </div>
            <span className="text-foreground font-mono">$0/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Upstash Redis (Free Tier)</div>
              <div className="text-sm text-muted-foreground">10K commands/day, rate limiting only</div>
            </div>
            <span className="text-foreground font-mono">$0/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Domain (topflow.dev)</div>
              <div className="text-sm text-muted-foreground">$12/year amortized</div>
            </div>
            <span className="text-foreground font-mono">$1/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">No Database</div>
              <div className="text-sm text-muted-foreground">Client-side localStorage</div>
            </div>
            <span className="text-foreground font-mono">$0/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">No Email Service</div>
              <div className="text-sm text-muted-foreground">No user accounts = no emails</div>
            </div>
            <span className="text-foreground font-mono">$0/mo</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Cached Demo Results</div>
              <div className="text-sm text-muted-foreground">$8 one-time cost</div>
            </div>
            <span className="text-foreground font-mono">$0/mo</span>
          </div>
          <div className="border-t border-chart-3/30 mt-4 pt-4 flex justify-between items-center font-semibold">
            <span className="text-foreground text-lg">Total Monthly Cost:</span>
            <span className="text-chart-3 font-mono text-2xl">$1/mo</span>
          </div>
          <p className="text-sm text-muted-foreground pt-2">
            (With moderate traffic, actual cost ~$20/mo on Vercel Pro plan)
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How This Is Possible</h2>
      <p>Five key architectural decisions enable this dramatic cost reduction:</p>

      <div className="space-y-6 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            1. No Database = $0
          </h3>
          <p className="mb-3">
            TopFlow stores workflows in client-side localStorage. This eliminates database hosting costs, backup costs,
            and database maintenance entirely.
          </p>
          <p className="text-sm text-muted-foreground italic">Savings: $50-100/month (PostgreSQL managed hosting)</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            2. Serverless = $0 Idle Costs
          </h3>
          <p className="mb-3">
            Vercel's serverless functions scale to zero. When no one is using TopFlow, costs are $0. Traditional servers
            cost money 24/7 whether anyone is using them or not.
          </p>
          <p className="text-sm text-muted-foreground italic">Savings: $100-200/month (always-on servers)</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            3. BYOK Model = $0 API Costs
          </h3>
          <p className="mb-3">
            Users provide their own OpenAI/Anthropic API keys. TopFlow never pays for AI API usage—users pay their
            providers directly based on actual usage.
          </p>
          <p className="text-sm text-muted-foreground italic">Savings: Variable, potentially $100-1,000/month</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            4. Cached Demos = $8 One-Time
          </h3>
          <p className="mb-3">
            Pre-computed execution results for demo workflows cost $8 once. These cached results serve thousands of demo
            users with zero ongoing costs.
          </p>
          <p className="text-sm text-muted-foreground italic">Savings: Ongoing API costs for demo users</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            5. Edge CDN Included
          </h3>
          <p className="mb-3">
            Vercel includes a global edge network and CDN in the free tier. Static assets are served from 70+ locations
            worldwide with no additional cost.
          </p>
          <p className="text-sm text-muted-foreground italic">Savings: $20-50/month (separate CDN service)</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Scaling Costs (Linear Growth)</h2>
      <p>As TopFlow grows, costs scale linearly with usage—no sudden jumps:</p>

      <div className="space-y-4 my-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-foreground">Phase 1: 0-1,000 users</span>
            <span className="font-mono text-chart-3">$20/mo</span>
          </div>
          <p className="text-sm text-muted-foreground">Vercel Hobby, Upstash free tier</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-foreground">Phase 2: 1,000-10,000 users</span>
            <span className="font-mono text-chart-3">$100/mo</span>
          </div>
          <p className="text-sm text-muted-foreground">Vercel Pro ($20), Upstash Pro ($10), bandwidth ($70)</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-foreground">Phase 3: 10,000-100,000 users</span>
            <span className="font-mono text-chart-3">$500-1,000/mo</span>
          </div>
          <p className="text-sm text-muted-foreground">Vercel Enterprise, Upstash Pro, job queue, monitoring</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-foreground">Phase 4: 100,000-1M users</span>
            <span className="font-mono text-chart-3">$5,000-10,000/mo</span>
          </div>
          <p className="text-sm text-muted-foreground">Multi-cloud, Kubernetes, distributed cache, observability</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Trade-offs & Honest Assessment</h2>
      <p>This architecture isn't perfect. Here are the honest trade-offs:</p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-chart-3/10 border border-chart-3/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
            Advantages
          </h3>
          <ul className="space-y-2 list-disc list-inside text-sm">
            <li>Extremely cost-effective for MVP</li>
            <li>Scales linearly with usage</li>
            <li>Zero idle costs</li>
            <li>Privacy-first by design</li>
            <li>No database maintenance</li>
            <li>Fast deployment pipeline</li>
          </ul>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-destructive" />
            Limitations
          </h3>
          <ul className="space-y-2 list-disc list-inside text-sm">
            <li>No cross-device sync</li>
            <li>Limited collaboration features</li>
            <li>Platform lock-in (Vercel)</li>
            <li>BYOK creates UX friction</li>
            <li>No built-in analytics</li>
            <li>Requires API key setup</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">When This Approach Works</h2>
      <p>This $20/month architecture is perfect for:</p>

      <ul className="space-y-2 list-disc list-inside my-6">
        <li>MVP and showcase projects</li>
        <li>Developer tools and calculators</li>
        <li>Privacy-focused applications</li>
        <li>Side projects and experiments</li>
        <li>Technical portfolios for job hunting</li>
        <li>Open source projects</li>
      </ul>

      <p>
        It's not ideal for social networks, collaboration platforms, or anything requiring persistent server-side state
        across users.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Key Takeaways</h2>
      <div className="bg-card border border-border rounded-lg p-6 my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong className="text-foreground">Challenge assumptions:</strong> Do you really need a database?
          </li>
          <li>
            <strong className="text-foreground">Embrace serverless:</strong> Pay only for what you use
          </li>
          <li>
            <strong className="text-foreground">BYOK when possible:</strong> Let users control their API costs
          </li>
          <li>
            <strong className="text-foreground">Privacy = Cost savings:</strong> Not collecting data is free
          </li>
          <li>
            <strong className="text-foreground">Linear scaling:</strong> Avoid step-function cost increases
          </li>
        </ul>
      </div>

      <p>
        Want to see a $20/month SaaS in action? Try TopFlow at{" "}
        <a href="https://topflow.dev" className="text-primary hover:underline">
          topflow.dev
        </a>
        .
      </p>
    </div>
  )
}
