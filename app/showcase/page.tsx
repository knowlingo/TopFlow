"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, Github, ExternalLink } from "lucide-react"

export default function ShowcasePage() {
  const showcases = [
    {
      id: "security-scanner",
      title: "GitHub Security Scanner",
      description: "Scan any GitHub repository for security vulnerabilities, dependency issues, and best practices in 30 seconds.",
      icon: Shield,
      href: "/showcase/security-scanner",
      tags: ["Security", "GitHub", "DevOps"],
      status: "Live",
      features: [
        "OWASP Top 10 vulnerability detection",
        "Dependency security analysis",
        "Code quality metrics",
        "Compliance checks (GDPR, SOC 2)",
        "Auto-generated security badges",
        "Shareable security dashboards"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              TopFlow
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/builder">
                <Button variant="ghost">Builder</Button>
              </Link>
              <Link href="https://github.com/csupenn/topflow" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            TopFlow Showcases
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            See what you can build with TopFlow. Each showcase demonstrates a real-world use case built entirely with visual workflows.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/builder">
              <Button size="lg">
                Try the Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://github.com/csupenn/topflow" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                View on GitHub
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Showcases Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8">
            {showcases.map((showcase) => {
              const Icon = showcase.icon
              return (
                <Card key={showcase.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl mb-2">{showcase.title}</CardTitle>
                          <CardDescription className="text-base">
                            {showcase.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="default">{showcase.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {showcase.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          {showcase.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-3 pt-4">
                        <Link href={showcase.href} className="flex-1">
                          <Button className="w-full" size="lg">
                            Try it Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                        <Link href="/builder?template=github-security-scanner" className="flex-1">
                          <Button variant="outline" className="w-full" size="lg">
                            View Workflow
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 text-center p-8 border rounded-lg bg-muted/30">
            <h3 className="text-2xl font-bold mb-2">More Showcases Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              We're building more real-world examples to demonstrate TopFlow's capabilities.
            </p>
            <Link href="https://github.com/csupenn/topflow" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub to stay updated
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Build Your Own Workflow</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Every showcase started as a simple workflow. Start building yours today.
            </p>
            <Link href="/builder">
              <Button size="lg">
                Open Builder
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
