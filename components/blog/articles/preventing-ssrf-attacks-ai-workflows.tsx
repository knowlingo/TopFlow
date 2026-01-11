import { Lock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

export function SSRFPreventionContent() {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">What is SSRF?</h2>
      <p>
        Server-Side Request Forgery (SSRF) is a vulnerability that allows attackers to make the server send HTTP
        requests to arbitrary destinations. In the context of AI agent workflows, this becomes particularly dangerous.
      </p>

      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-6">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Real-World Impact
        </h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>Access AWS metadata endpoint to steal credentials</li>
          <li>Scan internal network for services</li>
          <li>Access databases through internal IPs</li>
          <li>Read cloud provider metadata for SSH keys</li>
        </ul>
      </div>

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
            description: "Block RFC 1918 private IP ranges",
            icon: AlertTriangle,
          },
          {
            layer: "4. Cloud Metadata Blocking",
            description: "Block cloud provider metadata endpoints",
            icon: CheckCircle2,
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

      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Key Takeaways</h2>
      <p>Preventing SSRF in AI agent workflows requires multiple layers of defense:</p>

      <div className="bg-card border border-border rounded-lg p-6 my-6">
        <ul className="space-y-2 list-disc list-inside">
          <li>Never trust user-provided URLs without validation</li>
          <li>Use allowlists rather than blocklists when possible</li>
          <li>Block all private IP ranges and cloud metadata endpoints</li>
          <li>Enforce HTTPS-only connections</li>
          <li>Test extensively with automated security tests</li>
          <li>Layer defenses</li>
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
