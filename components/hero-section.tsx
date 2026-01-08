"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, Lock, ArrowRight, BookOpen, Zap } from "lucide-react"

interface HeroSectionProps {
  onTryDemo?: () => void
  onReadDocs?: () => void
}

export function HeroSection({ onTryDemo, onReadDocs }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-card py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <Shield className="mr-2 h-3.5 w-3.5" />
            Built by Charlie Su, Former CISO
          </Badge>

          {/* Heading */}
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Secure AI Agent Orchestration
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Security-first AI automation for compliance and privacy teams. Built by a former CISO to demonstrate
            how to build AI workflows with security baked in, not bolted on.
          </p>

          {/* CTA Buttons */}
          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 sm:w-auto" onClick={onTryDemo}>
              <Zap className="mr-2 h-5 w-5" />
              Try Demo Workflow
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" onClick={onReadDocs}>
              <BookOpen className="mr-2 h-5 w-5" />
              Read Documentation
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>No signup required</span>
            </div>
            <div className="hidden text-muted-foreground/60 sm:block">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Instant demo</span>
            </div>
            <div className="hidden text-muted-foreground/60 sm:block">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Bring your own keys</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
          {/* Feature 1: Security-First Design */}
          <Card className="border-2 bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Security-First Design</CardTitle>
              <CardDescription className="leading-relaxed">
                Built-in SSRF prevention, PII detection, and input validation. Security isn't an afterthought—it's the
                foundation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  SSRF Protection
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  PII Detection
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Input Validation
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2: Compliance Ready */}
          <Card className="border-2 bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-xl">Compliance Ready</CardTitle>
              <CardDescription className="leading-relaxed">
                Pre-configured templates for GDPR, SOC2, and HIPAA compliance. Meet regulatory requirements out of the
                box.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-green-500 text-green-600">
                  GDPR
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600">
                  SOC2
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600">
                  HIPAA
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Feature 3: Privacy by Default */}
          <Card className="border-2 bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Lock className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-xl">Privacy by Default</CardTitle>
              <CardDescription className="leading-relaxed">
                Your API keys, your data, your control. Everything stays in your browser—no server-side storage of
                sensitive data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  Client-Side Encryption
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  No Data Collection
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
