"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Sparkles, Github, Workflow, Share2 } from "lucide-react"

export function BuiltWithTopFlow() {
  return (
    <div className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center p-4 mb-4 bg-primary/10 rounded-full mx-auto">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl mb-3">Built with TopFlow</CardTitle>
              <CardDescription className="text-base max-w-2xl mx-auto">
                This GitHub Security Scanner is a <strong>TopFlow workflow template</strong>.
                It demonstrates how to build production-ready AI applications using visual workflows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* What is TopFlow */}
              <div className="bg-background/50 rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-primary" />
                  What is TopFlow?
                </h3>
                <p className="text-muted-foreground mb-4">
                  TopFlow is a <strong className="text-foreground">privacy-first visual workflow builder</strong> for creating AI-powered applications.
                  Build complex AI workflows without writing code, then export production-ready TypeScript.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong className="text-foreground">Privacy-First:</strong> All data stored locally in your browser. Zero server-side storage.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong className="text-foreground">BYOK Model:</strong> Bring your own API keys. Use any AI provider (OpenAI, Anthropic, Google, Groq).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong className="text-foreground">Export Code:</strong> Generate clean TypeScript using Vercel AI SDK. Own your code, no vendor lock-in.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span><strong className="text-foreground">Security-First:</strong> Built by a former CISO. Security baked in, not bolted on.</span>
                  </li>
                </ul>
              </div>

              {/* Coming Soon: Composable Security Workflows */}
              <div className="bg-gradient-to-br from-primary/10 to-background rounded-lg p-6 border-2 border-primary/30">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Coming Soon: Build Your Own Security Tools
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  We're transforming the scanner into a <strong className="text-foreground">composable platform</strong>.
                  Soon, you'll be able to use the OSV Scanner as a reusable node in ANY workflow!
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-background/50 rounded border">
                    <div className="font-semibold mb-1">CI/CD Security</div>
                    <div className="text-xs text-muted-foreground">
                      OSV Scanner → Slack notification if critical vulns
                    </div>
                  </div>
                  <div className="p-3 bg-background/50 rounded border">
                    <div className="font-semibold mb-1">Multi-Repo Audit</div>
                    <div className="text-xs text-muted-foreground">
                      Loop → OSV Scanner → Aggregate dashboard
                    </div>
                  </div>
                  <div className="p-3 bg-background/50 rounded border">
                    <div className="font-semibold mb-1">SBOM Generation</div>
                    <div className="text-xs text-muted-foreground">
                      OSV Scanner → Generate report → Email
                    </div>
                  </div>
                  <div className="p-3 bg-background/50 rounded border">
                    <div className="font-semibold mb-1">Custom Workflows</div>
                    <div className="text-xs text-muted-foreground">
                      Build your own Snyk with drag-and-drop
                    </div>
                  </div>
                </div>
              </div>

              {/* How This Scanner Works */}
              <div className="bg-background/50 rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  How This Scanner Works
                </h3>
                <p className="text-muted-foreground mb-4">
                  The GitHub Security Scanner is built as a visual workflow with 12 interconnected nodes:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex gap-2">
                    <span className="text-primary font-mono">1.</span>
                    <span><strong>HTTP Request:</strong> Fetch repo metadata from GitHub API</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary font-mono">2.</span>
                    <span><strong>JavaScript Node:</strong> Parse and extract key data</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary font-mono">3.</span>
                    <span><strong>AI Analysis:</strong> Check for OWASP Top 10 vulnerabilities</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary font-mono">4.</span>
                    <span><strong>Dependency Scan:</strong> Analyze package security</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary font-mono">5.</span>
                    <span><strong>Code Quality:</strong> Evaluate test coverage and docs</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary font-mono">6.</span>
                    <span><strong>Compliance:</strong> Check GDPR, SOC 2 patterns</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary font-mono">7.</span>
                    <span><strong>Aggregation:</strong> Combine all results</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary font-mono">8.</span>
                    <span><strong>Scoring:</strong> Calculate final security grade</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid md:grid-cols-2 gap-4">
                <Button size="lg" className="h-auto py-4" asChild>
                  <a href="/builder?template=github-security-scanner" className="flex flex-col items-center gap-2">
                    <Workflow className="h-6 w-6" />
                    <div>
                      <div className="font-bold">View the Workflow</div>
                      <div className="text-xs opacity-90">See how it's built in the builder</div>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-auto py-4" asChild>
                  <a href="https://github.com/csupenn/topflow" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                    <Github className="h-6 w-6" />
                    <div>
                      <div className="font-bold">Star on GitHub</div>
                      <div className="text-xs opacity-90">Support the project</div>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </div>

              {/* Viral Sharing Section - NEW */}
              <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 rounded-lg p-6 border-2 border-primary/20">
                <h4 className="font-semibold mb-2 text-center">Love This Scanner? Help Us Spread the Word!</h4>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Every share helps more developers discover security issues and improve their code
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://twitter.com/intent/tweet?text=Check%20out%20this%20free%20GitHub%20Security%20Scanner!%20Scans%20any%20repo%20in%2030%20seconds%20with%20OWASP%20checks%2C%20dependency%20analysis%2C%20and%20compliance%20insights.%20%40TopFlowDev%20https%3A%2F%2Ftopflow.dev%2Fshowcase%2Fsecurity-scanner"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share on Twitter
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ftopflow.dev%2Fshowcase%2Fsecurity-scanner"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share on LinkedIn
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href="https://github.com/csupenn/topflow" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Star on GitHub
                    </a>
                  </Button>
                </div>
              </div>

              {/* Build Your Own */}
              <div className="text-center pt-4 border-t">
                <h4 className="font-semibold mb-2">Build Your Own Security Tools</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Use TopFlow to create custom security scanners, compliance checkers, or audit automation workflows
                </p>
                <Button variant="ghost" asChild>
                  <a href="/builder">
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Templates Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">More Security Templates</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              TopFlow includes 7 security-focused workflow templates including GDPR compliance automation,
              PII detection, and security incident response.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" size="sm">GDPR Data Access</Button>
              <Button variant="outline" size="sm">PII Detection</Button>
              <Button variant="outline" size="sm">Incident Response</Button>
              <Button variant="outline" size="sm">Privacy Impact Assessment</Button>
              <Button variant="outline" size="sm">SOC 2 Evidence</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
