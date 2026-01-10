import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"

export const metadata: Metadata = {
  title: "TopFlow Blog - AI Security & Workflow Guides",
  description:
    "Articles on building secure AI workflows, compliance automation, and security patterns. Learn how to use TopFlow for GDPR, SOC 2, and HIPAA compliance.",
  keywords: ["AI security", "TopFlow guides", "workflow automation", "compliance", "secure AI"],
  openGraph: {
    title: "TopFlow Blog - AI Security & Workflow Guides",
    description: "Articles on secure AI workflows, compliance templates, and security patterns",
    url: "https://topflow.dev/blog",
    type: "website",
  },
}

const blogPosts = [
  {
    slug: "getting-started-topflow",
    title: "Getting Started with TopFlow",
    excerpt: "Learn the basics of TopFlow and build your first secure AI workflow in minutes.",
    author: "Charlie Su",
    publishedAt: "January 2026",
    readingTime: "5 min read",
    category: "Tutorial",
    featured: true,
  },
  {
    slug: "gdpr-compliance-workflows",
    title: "How to Build GDPR-Compliant AI Workflows",
    excerpt: "Step-by-step guide to using TopFlow's GDPR templates for data access requests and compliance automation.",
    author: "Charlie Su",
    publishedAt: "January 2026",
    readingTime: "8 min read",
    category: "Guide",
    featured: true,
  },
  {
    slug: "security-templates-deep-dive",
    title: "TopFlow Security Templates: Deep Dive",
    excerpt: "Explore all 7 security-focused templates and learn how to customize them for your compliance needs.",
    author: "Charlie Su",
    publishedAt: "January 2026",
    readingTime: "10 min read",
    category: "Guide",
    featured: true,
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-lg font-semibold">TopFlow</div>
          </Link>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-card py-12 md:py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            TopFlow Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Guides, tutorials, and insights on building secure AI workflows with TopFlow. Learn security patterns,
            compliance automation, and best practices.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          {/* Featured Posts */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Featured Posts</h2>
            <div className="space-y-6">
              {blogPosts
                .filter((post) => post.featured)
                .map((post) => (
                  <article
                    key={post.slug}
                    className="border-b border-border pb-6 last:border-b-0"
                  >
                    <div className="flex flex-col gap-3">
                      <Link href={`/blog/${post.slug}`} className="group">
                        <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary md:text-2xl">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.publishedAt}</span>
                        </div>
                        <span>{post.readingTime}</span>
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {post.category}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="mt-2">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </article>
                ))}
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold text-foreground">More Articles Coming Soon</h3>
            <p className="text-muted-foreground">
              We're publishing new guides on security patterns, compliance automation, and TopFlow best practices
              regularly. Check back soon!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to Build Secure Workflows?</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Try TopFlow with your own API keys or use our pre-cached demo data.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/builder">Try Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs">Read Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
