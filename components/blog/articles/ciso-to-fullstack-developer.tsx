import { Shield, Code, CheckCircle2, ExternalLink } from "lucide-react"

export function CISOToFullStackContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">The CISO Stereotype</h2>
      <p>
        There's a common assumption in tech: once you reach the C-suite in security, you stop coding. CISOs are seen as
        strategic thinkers but who couldn't build a production application if their careers depended on it.
      </p>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The 4-Week Build Timeline</h2>
      <p>Here's how I structured the development process:</p>

      <div className="space-y-4 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Week 1: Architecture & Security Design</h3>
          <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
            <li>Designed privacy-first architecture (no database)</li>
            <li>Created 5-layer security model</li>
            <li>Mapped OWASP Top 10 mitigations</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Week 2: Core Workflow Engine</h3>
          <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
            <li>Built drag-and-drop canvas with React Flow</li>
            <li>Implemented 12 node types</li>
            <li>Added cycle detection and validation</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Week 3: Security Hardening</h3>
          <ul className="space-y-2 list-disc list-inside ml-4 text-sm">
            <li>Implemented SSRF prevention</li>
            <li>Added rate limiting with Redis</li>
            <li>Configured security headers</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Key Lessons Learned</h2>
      <div className="space-y-4 my-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">Security Expertise Translates to Code Quality</h3>
          <p className="text-sm">
            My security background meant I naturally wrote defensive code: input validation everywhere, proper error
            handling, timeout enforcement.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Conclusion</h2>
      <p>
        Building TopFlow proved that security expertise makes you a better developer, and that hands-on development
        makes you a better security leader.
      </p>
      <p className="mt-4">
        The full source is open on{" "}
        <a
          href="https://github.com/csupenn/topflow"
          className="text-primary hover:underline inline-flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/csupenn/topflow
          <ExternalLink className="w-3 h-3" />
        </a>
        . The AI Security Tutorial series documents the real hardening work in detail:{" "}
        <a
          href="https://topflow.dev/blog"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          topflow.dev/blog
        </a>
        .
      </p>
    </div>
  )
}
