"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, Shield, ArrowRight, Search, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function DocsHomePage() {
  // Hide sidebars on homepage for full-width layout and center content properly
  useEffect(() => {
    const sidebar = document.getElementById("docs-sidebar")
    const toc = document.getElementById("docs-toc")
    const main = document.querySelector("main")

    if (sidebar) sidebar.style.display = "none"
    if (toc) toc.style.display = "none"

    // Override main element constraints for homepage
    if (main) {
      main.style.maxWidth = "none"
      main.style.width = "100%"
      main.style.display = "flex"
      main.style.justifyContent = "center"
    }

    return () => {
      if (sidebar) sidebar.style.display = ""
      if (toc) toc.style.display = ""
      if (main) {
        main.style.maxWidth = ""
        main.style.width = ""
        main.style.display = ""
        main.style.justifyContent = ""
      }
    }
  }, [])

  return (
    <div className="w-full max-w-5xl space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-balance">TopFlow Documentation</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
            Everything you need to build secure, compliant AI workflows. From quick starts to advanced security
            configurations, we've got you covered.
          </p>
        </div>

        {/* Quick Search */}
        <button
          onClick={() => {
            const event = new KeyboardEvent("keydown", { key: "k", metaKey: true })
            document.dispatchEvent(event)
          }}
          className="w-full text-left"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation... (Ctrl+K)"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              readOnly
            />
          </div>
        </button>

        {/* Main Sections - 3 Tab Categories */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Learn */}
          <Card className="border-2 hover:border-primary/50 transition-colors group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-3 group-hover:bg-chart-3/20 transition-colors">
                <BookOpen className="h-6 w-6 text-chart-3" />
              </div>
              <CardTitle>Learn</CardTitle>
              <CardDescription>Get started with guides, tutorials, and core concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/docs/learn/quick-start"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">Quick Start</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/docs/learn/core-concepts"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">Core Concepts</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/docs/learn/tutorials"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">Tutorials</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link href="/docs/learn" className="flex items-center gap-2 text-sm text-primary hover:underline pt-2">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Build */}
          <Card className="border-2 hover:border-primary/50 transition-colors group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Build</CardTitle>
              <CardDescription>Technical references, APIs, and workflow patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/docs/build/nodes"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">Node Reference</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/docs/build/workflows"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">Workflow Patterns</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/docs/build/api"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">API Reference</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link href="/docs/build" className="flex items-center gap-2 text-sm text-primary hover:underline pt-2">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-2 hover:border-primary/50 transition-colors group">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-3 group-hover:bg-destructive/20 transition-colors">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Compliance, validation, and security best practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/docs/security/validations"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">Security Validations</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/docs/security/compliance"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">Compliance Frameworks</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/docs/security/reports"
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group/item"
              >
                <span className="text-sm">Security Reports</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-foreground group-hover/item:translate-x-1 transition-all" />
              </Link>
              <Link href="/docs/security" className="flex items-center gap-2 text-sm text-primary hover:underline pt-2">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="border-t border-border pt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Popular Topics</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/docs/learn/quick-start"
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary mt-1 group-hover:text-primary/80" />
                <div>
                  <h3 className="font-semibold mb-1">5-Minute Quick Start</h3>
                  <p className="text-sm text-muted-foreground">Build your first workflow in minutes</p>
                </div>
              </div>
            </Link>

            <Link
              href="/docs/security/validations"
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-destructive mt-1 group-hover:text-destructive/80" />
                <div>
                  <h3 className="font-semibold mb-1">Security Validation Rules</h3>
                  <p className="text-sm text-muted-foreground">Understand all 12 security checks</p>
                </div>
              </div>
            </Link>

            <Link
              href="/docs/build/nodes"
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <Code className="h-5 w-5 text-primary mt-1 group-hover:text-primary/80" />
                <div>
                  <h3 className="font-semibold mb-1">Complete Node Reference</h3>
                  <p className="text-sm text-muted-foreground">All 10 node types explained</p>
                </div>
              </div>
            </Link>

            <Link
              href="/docs/learn/tutorials"
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-chart-3 mt-1 group-hover:text-chart-3/80" />
                <div>
                  <h3 className="font-semibold mb-1">Step-by-Step Tutorials</h3>
                  <p className="text-sm text-muted-foreground">Build real-world AI workflows</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-border rounded-lg p-8 bg-gradient-to-br from-primary/5 to-transparent">
          <h2 className="text-2xl font-semibold mb-2">Ready to build?</h2>
          <p className="text-muted-foreground mb-6">Jump into the builder and start creating secure AI workflows</p>
          <div className="flex gap-3">
            <Link href="/builder">
              <Button>Open Builder</Button>
            </Link>
            <Link href="/docs/learn/quick-start">
              <Button variant="outline">Start Tutorial</Button>
            </Link>
          </div>
        </div>
      </div>
  )
}
