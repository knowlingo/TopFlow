import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Zap, GraduationCap, Lightbulb, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SidebarPortal } from "@/components/docs/sidebar-portal"
import { learnSidebar } from "@/lib/docs/sidebar-data"
import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsFooter } from "@/components/docs/docs-footer"

export const metadata = {
  title: "Learn TopFlow - Tutorials & Guides for Secure AI Workflows",
  description: "Master TopFlow with comprehensive tutorials, core concepts, and best practices. Build privacy-first AI applications with security baked in.",
}

export default function LearnOverviewPage() {
  return (
    <>
      <SidebarPortal sections={learnSidebar} currentTab="learn" />

      <div className="space-y-8">
        <DocsBreadcrumb />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-balance">Learn TopFlow</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
            Master TopFlow with comprehensive guides, tutorials, and best practices. From your first workflow to
            advanced security patterns, we've got you covered.
          </p>
        </div>

        {/* Quick Start Highlight */}
        <Card className="border-2 border-chart-3 bg-chart-3/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-3 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Quick Start Guide</CardTitle>
                  <CardDescription>Build your first secure workflow in 5 minutes</CardDescription>
                </div>
              </div>
              <Link href="/docs/learn/quick-start">
                <ArrowRight className="h-5 w-5 text-chart-3 hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Perfect for new users. Learn the basics of the visual builder, add your first nodes, and run your workflow
              with real-time security validation.
            </p>
            <Link
              href="/docs/learn/quick-start"
              className="text-sm font-medium text-chart-3 hover:underline inline-flex items-center gap-1"
            >
              Start learning <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Core Concepts */}
          <Link href="/docs/learn/core-concepts">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Core Concepts</CardTitle>
                <CardDescription>Understand the fundamental building blocks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Nodes and connections
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Data flow and execution
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Security validation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Export to production code
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Workflows 101 */}
          <Link href="/docs/learn/workflows-101">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center mb-3 group-hover:bg-chart-2/20 transition-colors">
                  <GraduationCap className="h-5 w-5 text-chart-2" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Workflows 101</CardTitle>
                <CardDescription>Learn to design effective AI workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-2" />
                    Linear vs branching patterns
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-2" />
                    Error handling strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-2" />
                    Data transformation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-2" />
                    Testing workflows
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Tutorials */}
          <Link href="/docs/learn/tutorials">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center mb-3 group-hover:bg-chart-4/20 transition-colors">
                  <Lightbulb className="h-5 w-5 text-chart-4" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Step-by-Step Tutorials</CardTitle>
                <CardDescription>Build real-world AI applications</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-4" />
                    Content moderation system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-4" />
                    Customer support chatbot
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-4" />
                    Document analysis pipeline
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-4" />
                    Multi-model comparison
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Best Practices */}
          <Link href="/docs/learn/best-practices">
            <Card className="h-full border-2 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center mb-3 group-hover:bg-chart-3/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">Best Practices</CardTitle>
                <CardDescription>Expert tips and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Performance optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Cost management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Security hardening
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-chart-3" />
                    Maintainability tips
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* FAQ Section */}
        <Card className="bg-muted/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link
              href="/docs/learn/faq"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              View all FAQs <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <DocsFooter
          nextPage={{
            title: "Quick Start Guide",
            href: "/docs/learn/quick-start",
          }}
        />
      </div>
    </>
  )
}
