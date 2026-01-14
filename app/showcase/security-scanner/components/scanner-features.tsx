"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Zap,
  Lock,
  Users,
  Code,
  TrendingUp,
  CheckCircle,
  Github
} from "lucide-react"

export function ScannerFeatures() {
  const features = [
    {
      icon: Shield,
      title: "OWASP Top 10 Coverage",
      description: "Automatically check for the most critical web application security risks including injection flaws, broken authentication, and XSS vulnerabilities.",
      color: "text-red-500"
    },
    {
      icon: Lock,
      title: "Dependency Security",
      description: "Scan package.json, requirements.txt, go.mod and other manifest files for known vulnerabilities in your dependencies using CVE databases.",
      color: "text-blue-500"
    },
    {
      icon: Code,
      title: "Code Quality Metrics",
      description: "Evaluate test coverage, documentation quality, CI/CD configuration, and coding standards to ensure maintainable and reliable code.",
      color: "text-purple-500"
    },
    {
      icon: Users,
      title: "Compliance Checks",
      description: "GDPR, SOC 2, and HIPAA compliance considerations including data privacy patterns, encryption standards, and audit logging.",
      color: "text-orange-500"
    },
    {
      icon: Zap,
      title: "30-Second Scans",
      description: "Lightning-fast analysis powered by AI. Get comprehensive results in the time it takes to read this sentence.",
      color: "text-yellow-500"
    },
    {
      icon: TrendingUp,
      title: "Auto-Generated Badges",
      description: "Get shareable security badges for your README. Show off your security score and build trust with your users.",
      color: "text-green-500"
    }
  ]

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Security Analysis</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our scanner checks every critical aspect of repository security, from vulnerabilities to compliance
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card key={idx} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className={`p-3 bg-background rounded-lg w-fit mb-2 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* How It Works */}
          <div className="bg-muted/50 rounded-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-8 text-center">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold mb-2">Enter Repo URL</h4>
                <p className="text-sm text-muted-foreground">
                  Paste any GitHub repository URL
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  AI scans code, dependencies, and configs
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold mb-2">Get Results</h4>
                <p className="text-sm text-muted-foreground">
                  Receive detailed security report
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  4
                </div>
                <h4 className="font-semibold mb-2">Share & Improve</h4>
                <p className="text-sm text-muted-foreground">
                  Get badge and actionable insights
                </p>
              </div>
            </div>
          </div>

          {/* Why Use This Scanner */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Why Use This Scanner?
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <div>
                    <strong>100% Free & Open Source</strong>
                    <p className="text-sm text-muted-foreground">No sign-up required. Scan unlimited repositories.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <div>
                    <strong>Privacy-First Design</strong>
                    <p className="text-sm text-muted-foreground">Your code stays on GitHub. We only analyze public metadata.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <div>
                    <strong>Actionable Insights</strong>
                    <p className="text-sm text-muted-foreground">Get specific recommendations, not just generic warnings.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <div>
                    <strong>Built for Developers</strong>
                    <p className="text-sm text-muted-foreground">Designed by a former CISO who understands real-world security.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Github className="h-6 w-6" />
                Perfect For
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">→</span>
                  <div>
                    <strong>Open Source Maintainers</strong>
                    <p className="text-sm text-muted-foreground">Show security scores to build user trust and confidence.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">→</span>
                  <div>
                    <strong>Security Teams</strong>
                    <p className="text-sm text-muted-foreground">Quick security assessment of third-party dependencies.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">→</span>
                  <div>
                    <strong>Developers</strong>
                    <p className="text-sm text-muted-foreground">Learn security best practices from top repositories.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">→</span>
                  <div>
                    <strong>Hiring Managers</strong>
                    <p className="text-sm text-muted-foreground">Evaluate code quality of candidate portfolios.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
