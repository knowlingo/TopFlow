"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Workflow,
  Shield,
  Sparkles,
  Github,
  Lock,
  Eye,
  Code2,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Quick Navigation Bar */}
      <nav className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              TopFlow
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/showcase">
                <Button variant="ghost" size="sm">Showcases</Button>
              </Link>
              <Link href="/builder">
                <Button variant="ghost" size="sm">Builder</Button>
              </Link>
              <Link href="https://github.com/csupenn/topflow" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Github className="mr-2 h-3 w-3" />
                  Star
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Compact */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full">
            <Workflow className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            Build AI Agents Visually
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Privacy-first visual workflow builder for creating AI-powered applications.
            Build without code, export production-ready TypeScript.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link href="/builder">
              <Button size="lg" className="w-full sm:w-auto">
                <Workflow className="mr-2 h-5 w-5" />
                Open Builder
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/showcase">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Showcases
              </Button>
            </Link>
          </div>

          {/* Key Features - Compact */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Lock className="h-4 w-4 text-primary" />
              Privacy-First
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4 text-primary" />
              BYOK Model
            </span>
            <span className="flex items-center gap-1">
              <Code2 className="h-4 w-4 text-primary" />
              Export Code
            </span>
          </div>
        </div>
      </section>

      {/* Featured Showcase Section - NEW */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="h-3 w-3 mr-1" />
              Featured Showcase
            </Badge>
            <h2 className="text-3xl font-bold mb-2">GitHub Security Scanner</h2>
            <p className="text-muted-foreground">
              Free security analysis for any GitHub repository in 30 seconds
            </p>
          </div>

          <Card className="border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-colors">
            <CardHeader className="bg-gradient-to-br from-primary/5 to-background">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Security Scanner Showcase
                  </CardTitle>
                  <CardDescription className="text-base">
                    A complete example of building production-ready AI security tools with TopFlow
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Screenshot Preview */}
              <div className="mb-6 rounded-lg overflow-hidden border">
                <img
                  src="/demo-assets/images/github-security-dashboard.webp"
                  alt="GitHub Security Scanner Dashboard"
                  className="w-full"
                />
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex gap-2">
                  <div className="text-primary mt-0.5">✓</div>
                  <div>
                    <strong className="text-sm">OWASP Top 10 Coverage</strong>
                    <p className="text-xs text-muted-foreground">Critical vulnerability detection</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-primary mt-0.5">✓</div>
                  <div>
                    <strong className="text-sm">Dependency Security</strong>
                    <p className="text-xs text-muted-foreground">CVE database scanning</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-primary mt-0.5">✓</div>
                  <div>
                    <strong className="text-sm">Compliance Checks</strong>
                    <p className="text-xs text-muted-foreground">GDPR, SOC 2, HIPAA patterns</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-primary mt-0.5">✓</div>
                  <div>
                    <strong className="text-sm">Auto-Generated Badges</strong>
                    <p className="text-xs text-muted-foreground">Shareable security scores</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-6 py-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">30s</div>
                  <div className="text-xs text-muted-foreground">Scan Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-xs text-muted-foreground">Security Checks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.2k+</div>
                  <div className="text-xs text-muted-foreground">Repos Scanned</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1" asChild>
                  <Link href="/showcase/security-scanner">
                    <Shield className="mr-2 h-5 w-5" />
                    Try Security Scanner
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <Link href="/builder?template=github-security-scanner">
                    <Workflow className="mr-2 h-5 w-5" />
                    View Workflow
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* More Showcases Coming Soon */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              More showcases coming soon: GDPR Compliance, PII Detection, Incident Response, and more
            </p>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 TopFlow. Privacy-first AI workflow builder.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/builder" className="text-muted-foreground hover:text-foreground">
                Builder
              </Link>
              <Link href="/showcase" className="text-muted-foreground hover:text-foreground">
                Showcases
              </Link>
              <Link href="https://github.com/csupenn/topflow" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
