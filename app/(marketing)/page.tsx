"use client"

import { HeroSection } from "@/components/hero-section"
import { SecurityTemplateGallery } from "@/components/security-template-gallery"
import { Button } from "@/components/ui/button"
import { Shield, Lock, FileCheck, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { WorkflowStorage } from "@/lib/storage"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function HomePage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<any[]>([])

  useEffect(() => {
    // Load templates on client side to avoid SSR issues with localStorage
    const securityTemplates = WorkflowStorage.getTemplates().filter(t => t.category === "security")
    setTemplates(securityTemplates)
  }, [])

  const handleTryTemplate = (template: any) => {
    // Store template in localStorage for the builder to load
    if (typeof window !== "undefined") {
      localStorage.setItem("pending-template", JSON.stringify(template))
      router.push("/builder")
    }
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">TopFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/builder">
                <Button variant="ghost" size="sm">
                  Builder
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="ghost" size="sm">
                  Docs
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="sm">
                  About
                </Button>
              </Link>
              <Link href="/builder">
                <Button size="sm">Try Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection
        onTryDemo={() => router.push("/builder")}
        onReadDocs={() => router.push("/about")}
      />

      {/* Security Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Enterprise Security Built In</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Designed by a former CISO, every feature prioritizes data protection and compliance from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">SSRF Prevention</h3>
              <p className="text-sm text-muted-foreground">
                Blocks malicious URLs targeting internal networks and cloud metadata services
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <Lock className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">PII Detection</h3>
              <p className="text-sm text-muted-foreground">
                Automatically identifies and flags sensitive personal information before processing
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <FileCheck className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-2">API Key Encryption</h3>
              <p className="text-sm text-muted-foreground">
                Your credentials are encrypted at rest with AES-256-GCM standard
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Validation</h3>
              <p className="text-sm text-muted-foreground">
                Security score from 0-100 with instant feedback on potential vulnerabilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Compliance-Ready Templates</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Start with 6 pre-built workflows covering major regulations: GDPR, SOC 2, ISO 27001, HIPAA, OT/Critical Infrastructure, and EU AI Act compliance.
            </p>
          </div>

          <SecurityTemplateGallery templates={templates} onTryTemplate={handleTryTemplate} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Build Secure AI Workflows?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            No signup required. Try the demo instantly with your own API keys or use our pre-cached results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/builder">
              <Button size="lg">Try Demo Now</Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="text-sm font-medium text-foreground">
                TopFlow: Secure AI Agent Orchestration
              </div>
              <div className="text-sm text-muted-foreground">
                © 2026 TopFlow. Built by Charlie Su, Former CISO.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="sm">
                  About
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-xs text-center md:text-left text-muted-foreground space-y-2">
            <p>Security-first AI automation for compliance and privacy teams.</p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Shield className="h-3 w-3" />
              <span>Privacy-First: Minimal tracking, client-side storage.</span>
              <Link href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
