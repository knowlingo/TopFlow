import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { TOCPortal } from "@/components/docs/toc-portal"
import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Code, Workflow, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Introduction to TopFlow | TopFlow Documentation",
  description: "Learn what TopFlow is, why it exists, and how it helps you build secure AI workflows with privacy baked in from day one.",
}

export default function IntroductionPage() {
  const tocItems = [
    { id: "what-is-topflow", title: "What is TopFlow?" },
    { id: "why-topflow", title: "Why TopFlow?" },
    { id: "key-features", title: "Key Features" },
    { id: "how-it-works", title: "How It Works" },
    { id: "who-its-for", title: "Who It's For" },
    { id: "next-steps", title: "Next Steps" },
  ]

  return (
    <>
      <SidebarPortal currentTab="learn" />
      <TOCPortal items={tocItems} />

      <div className="prose prose-invert max-w-none">
        <h1>Introduction to TopFlow</h1>
        <p className="text-xl text-muted-foreground">
          TopFlow is a visual workflow builder for creating AI-powered applications with security and privacy baked in from day one.
          Built by a former CISO to demonstrate how to build AI systems the right way.
        </p>

        <section id="what-is-topflow">
          <h2>What is TopFlow?</h2>
          <p>
            TopFlow is a <strong>security-focused visual workflow builder</strong> that lets you create AI-powered applications
            using a node-based interface. Think of it as a canvas where you drag and drop components (nodes) to build complex
            AI workflows without writing code.
          </p>

          <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-3/20 flex items-center justify-center mb-3">
                  <Workflow className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="text-lg">Visual Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Drag and drop nodes to create workflows. Connect AI models, API calls, data transformations, and logic—all visually.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center mb-3">
                  <Shield className="h-5 w-5 text-destructive" />
                </div>
                <CardTitle className="text-lg">Security-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time security validation with 12 security checks. SSRF prevention, rate limiting, and privacy-preserving architecture built in.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Privacy-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All data stored in your browser only. No backend database. Your API keys and workflows never leave your machine.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-1/20 flex items-center justify-center mb-3">
                  <Code className="h-5 w-5 text-chart-1" />
                </div>
                <CardTitle className="text-lg">Code Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Export your workflows as production-ready TypeScript code. No vendor lock-in. You own the code.
                </p>
              </CardContent>
            </Card>
          </div>

          <p>
            Unlike traditional no-code tools, TopFlow is built specifically for <strong>secure AI orchestration</strong>.
            Every feature prioritizes security, compliance, and privacy.
          </p>
        </section>

        <section id="why-topflow">
          <h2>Why TopFlow?</h2>
          <p>
            Most AI workflow tools focus on ease of use but ignore security. TopFlow flips this—security is the foundation,
            not an afterthought. Here's why it exists:
          </p>

          <h3>The Problem with Traditional AI Tools</h3>
          <ul>
            <li><strong>No security validation</strong>: You can accidentally create SSRF vulnerabilities, expose PII, or introduce prompt injection risks</li>
            <li><strong>Vendor lock-in</strong>: Your workflows are trapped in proprietary platforms with no export options</li>
            <li><strong>Privacy concerns</strong>: Your API keys, workflows, and data are stored on someone else's servers</li>
            <li><strong>Compliance gaps</strong>: No built-in GDPR, SOC 2, or HIPAA considerations</li>
          </ul>

          <h3>The TopFlow Approach</h3>
          <ul>
            <li><strong>Real-time security validation</strong>: 12 security checks run automatically as you build, catching issues before execution</li>
            <li><strong>Client-side everything</strong>: Your data never leaves your browser. No backend database = no data breach risk</li>
            <li><strong>BYOK (Bring Your Own Key)</strong>: Use your own API keys for OpenAI, Anthropic, Google, Groq. Keys stored locally only</li>
            <li><strong>Code export</strong>: Generate production TypeScript from any workflow. Own your code, no platform dependency</li>
            <li><strong>Compliance-conscious</strong>: Built-in examples for GDPR, SOC 2, HIPAA workflows</li>
          </ul>
        </section>

        <section id="key-features">
          <h2>Key Features</h2>

          <h3>Security Features</h3>
          <ul>
            <li><strong>SSRF Prevention</strong>: Validates all HTTP requests, blocks private IPs and cloud metadata endpoints</li>
            <li><strong>Rate Limiting</strong>: 10 requests/minute per client IP to prevent abuse</li>
            <li><strong>Input Sanitization</strong>: Removes potentially dangerous characters from all inputs</li>
            <li><strong>Cycle Detection</strong>: Prevents infinite loops that could cause denial of service</li>
            <li><strong>Validation Scoring</strong>: Get a security score (A-F grade) for every workflow before running it</li>
          </ul>

          <h3>AI Integration</h3>
          <ul>
            <li><strong>Multi-Provider Support</strong>: OpenAI (GPT-4, GPT-4o), Anthropic (Claude), Google (Gemini), Groq (Llama)</li>
            <li><strong>Image Generation</strong>: Flux Pro, Flux 1.1 Pro via FAL</li>
            <li><strong>Embeddings</strong>: Text embeddings for semantic search and RAG systems</li>
            <li><strong>Structured Output</strong>: Force AI responses into specific schemas using Zod validation</li>
            <li><strong>Tool Calling</strong>: Define custom functions that AI can call dynamically</li>
          </ul>

          <h3>Developer Experience</h3>
          <ul>
            <li><strong>Visual Editor</strong>: Drag and drop interface powered by ReactFlow</li>
            <li><strong>Live Execution</strong>: Watch nodes execute in real-time with streaming results</li>
            <li><strong>Code Export</strong>: Generate Next.js API routes, React components, or standalone functions</li>
            <li><strong>Template Library</strong>: Pre-built workflows for common use cases (GDPR automation, threat intel, etc.)</li>
            <li><strong>Undo/Redo</strong>: Full history tracking with 50-entry limit</li>
            <li><strong>Auto-Save</strong>: Automatic saves every 30 seconds to prevent data loss</li>
          </ul>
        </section>

        <section id="how-it-works">
          <h2>How It Works</h2>

          <h3>1. Build Visually</h3>
          <p>
            Drag nodes from the palette onto the canvas. Each node represents an action:
          </p>
          <ul>
            <li><strong>Entry/Exit Nodes</strong>: Start and End markers</li>
            <li><strong>AI Nodes</strong>: Text generation, embeddings, image creation</li>
            <li><strong>Data Nodes</strong>: HTTP requests, structured outputs</li>
            <li><strong>Logic Nodes</strong>: Conditionals, JavaScript execution</li>
            <li><strong>Tools</strong>: Custom function definitions</li>
          </ul>

          <h3>2. Connect & Configure</h3>
          <p>
            Connect nodes by dragging from output handles to input handles. Data flows left-to-right through your workflow.
            Configure each node's settings (API key provider, model, temperature, prompts, etc.) in the right panel.
          </p>

          <h3>3. Validate</h3>
          <p>
            Click "Validate" to run 12 security checks:
          </p>
          <ul>
            <li>Structural checks (cycles, orphans, missing start/end)</li>
            <li>Security checks (SSRF, private IPs, cloud metadata endpoints)</li>
            <li>Configuration checks (missing API keys, invalid models, empty prompts)</li>
          </ul>
          <p>
            You get a score (A-F grade) and detailed error/warning messages.
          </p>

          <h3>4. Execute or Export</h3>
          <p>
            <strong>Execute</strong>: Click "Run" to execute your workflow in real-time. Watch nodes turn green as they complete.
            Results stream to the execution panel.
          </p>
          <p>
            <strong>Export</strong>: Click "Export Code" to generate production-ready TypeScript. Choose from:
          </p>
          <ul>
            <li>Next.js API Route (server-side execution)</li>
            <li>React Component (client-side execution)</li>
            <li>Standalone Function (pure TypeScript)</li>
          </ul>
        </section>

        <section id="who-its-for">
          <h2>Who It's For</h2>

          <h3>Security Professionals</h3>
          <p>
            <strong>CISOs, Security Engineers, Compliance Officers</strong>: TopFlow demonstrates how to build AI systems with
            security baked in. Use it as a reference architecture for your organization's AI initiatives.
          </p>

          <h3>AI Engineers</h3>
          <p>
            <strong>Developers Building Secure AI Apps</strong>: Prototype workflows visually, then export to TypeScript.
            Learn security patterns and compliance requirements while building.
          </p>

          <h3>Privacy Advocates</h3>
          <p>
            <strong>Anyone Concerned About Data Privacy</strong>: TopFlow's client-side architecture means your data never
            leaves your browser. True privacy-first design, not marketing speak.
          </p>

          <h3>Technical Hiring Managers</h3>
          <p>
            <strong>Evaluating Architecture Skills</strong>: TopFlow is a showcase project demonstrating security-first architecture,
            privacy-preserving design, and compliance-conscious engineering.
          </p>
        </section>

        <section id="next-steps">
          <h2>Next Steps</h2>
          <p>
            Ready to dive in? Here's your learning path:
          </p>

          <div className="grid gap-4 not-prose my-8">
            <Link href="/docs/learn/quick-start">
              <Card className="border-2 hover:border-chart-3 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="group-hover:text-chart-3 transition-colors">Quick Start Guide</CardTitle>
                      <CardDescription>Build your first workflow in 5 minutes</CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-chart-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Perfect first step. Learn the basics of the visual builder, add your API keys, and run a simple chatbot workflow.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/learn/core-concepts">
              <Card className="border-2 hover:border-primary transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">Core Concepts</CardTitle>
                      <CardDescription>Understand the fundamentals</CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Deep dive into nodes, edges, workflows, validation, and execution. Essential knowledge for building complex workflows.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/security">
              <Card className="border-2 hover:border-destructive transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="group-hover:text-destructive transition-colors">Security & Compliance</CardTitle>
                      <CardDescription>Enterprise-grade security controls</CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-destructive group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn about the 12 security validations, SSRF prevention, and compliance frameworks (GDPR, SOC 2, HIPAA).
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <p>
            <strong>Questions?</strong> Check out our <Link href="/docs/learn/faq">FAQ</Link> or explore the{" "}
            <Link href="/docs/learn/tutorials">tutorials</Link> for hands-on guides.
          </p>
        </section>
      </div>
    </>
  )
}
