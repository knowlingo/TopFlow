import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { notFound } from "next/navigation"

// Blog posts data - will be replaced with actual content
const blogPosts: Record<
  string,
  {
    title: string
    description: string
    author: string
    publishedAt: string
    readingTime: number
    content: string
  }
> = {
  "getting-started-topflow": {
    title: "Getting Started with TopFlow",
    description: "Learn the basics of TopFlow and build your first secure AI workflow in minutes.",
    author: "Charlie Su",
    publishedAt: "January 2026",
    readingTime: 5,
    content: `
# Getting Started with TopFlow

TopFlow is a visual workflow builder designed for building secure AI applications. In this guide, we'll walk through the basics and build your first workflow.

## What is TopFlow?

TopFlow is a privacy-first, security-focused AI workflow builder. Unlike other no-code AI platforms, TopFlow prioritizes:

- **Security**: SSRF prevention, PII detection, input validation
- **Privacy**: Client-side only, no server-side data storage
- **Compliance**: Pre-built templates for GDPR, SOC 2, HIPAA

## Getting Started

### Step 1: Open TopFlow

Navigate to [topflow.dev/builder](https://topflow.dev/builder) to start building. No signup required!

### Step 2: Explore the Canvas

The TopFlow builder has three main areas:

1. **Left Sidebar**: Node palette with available components
2. **Center Canvas**: Your workflow editor
3. **Right Panel**: Node configuration and validation

### Step 3: Build Your First Workflow

Let's create a simple text summarization workflow:

1. Drag a **Start** node onto the canvas
2. Connect it to a **Text Model** node (like GPT-4)
3. Add a **Prompt** node to define your instruction
4. Connect to an **End** node to finish

### Step 4: Configure Your Nodes

Select each node to configure it:

- **Start Node**: Define your input
- **Prompt Node**: Write your instruction using \`\$input1\` variables
- **Text Model**: Select your AI provider and model
- **End Node**: Review your output

### Step 5: Execute Your Workflow

Click the "Execute" button. TopFlow will:

1. Validate your workflow for security issues
2. Run through each node in order
3. Display results in the execution panel

## Next Steps

- Explore the [security templates](/docs/security) for compliance workflows
- Read the [documentation](/docs) for detailed guides
- Join our community to share workflows and ask questions

## Tips & Tricks

- Use demo mode for testing without API keys
- Export your workflow to TypeScript for production use
- Check the validation score before execution

---

**Happy building with TopFlow! 🚀**
    `,
  },
  "gdpr-compliance-workflows": {
    title: "How to Build GDPR-Compliant AI Workflows",
    description: "Step-by-step guide to using TopFlow's GDPR templates for data access requests and compliance automation.",
    author: "Charlie Su",
    publishedAt: "January 2026",
    readingTime: 8,
    content: `
# How to Build GDPR-Compliant AI Workflows

This guide covers how to build GDPR-compliant workflows using TopFlow's pre-built templates.

## GDPR Overview

The General Data Protection Regulation (GDPR) gives individuals rights over their personal data:

- **Right of Access** (Article 15): Request a copy of your data
- **Right to Erasure** (Article 17): Request deletion of your data
- **Right to Rectification** (Article 16): Request correction of inaccurate data
- **Right to Data Portability** (Article 20): Export your data in portable format
- **Right to Object** (Article 21): Opt-out of data processing

## TopFlow's GDPR Templates

TopFlow includes 7 pre-built GDPR compliance workflows:

1. **Data Access Request** - Automate Article 15 compliance
2. **Data Deletion** - Automate Article 17 compliance
3. **Data Rectification** - Automate Article 16 compliance
4. **Data Portability** - Automate Article 20 compliance
5. **Right to Object** - Automate Article 21 compliance
6. **Breach Notification** - Automate Article 33 compliance
7. **Data Processing Records** - Document Article 30 requirements

## Using the Data Access Template

Let's walk through the Data Access workflow:

### Step 1: Load the Template

1. Open TopFlow
2. Click "Templates" → "Security"
3. Select "GDPR Data Access Request"
4. Click "Try Template"

### Step 2: Configure Your Data Source

Set up your data source nodes:

- **Database Query**: Connect to your user database
- **API Request**: Call your API to fetch user data
- **Data Processor**: Transform data into GDPR format

### Step 3: Add Privacy Controls

Add nodes for security:

- **PII Detection**: Flag sensitive data
- **Encryption**: Encrypt before transmission
- **Audit Logger**: Log the data access request

### Step 4: Deploy

When ready:

1. Click "Export"
2. Select "Next.js Route Handler"
3. Deploy to your infrastructure

## Best Practices

### 1. Minimize Data Collection

Only collect and process data you actually need.

### 2. Privacy by Design

Build privacy into your workflows from the start, not as an afterthought.

### 3. Document Everything

Keep audit logs of all data access and processing requests.

### 4. Encrypt Sensitive Data

Always encrypt personal data in transit and at rest.

### 5. Regular Audits

Review your workflows regularly for compliance.

## Compliance Checklist

- [ ] Data Access template implemented
- [ ] Data Deletion template implemented
- [ ] Audit logging configured
- [ ] Encryption enabled
- [ ] Privacy Policy updated
- [ ] DPA signed with vendors
- [ ] DPIA completed
- [ ] Documentation stored securely

## Next Steps

- Explore other GDPR templates in TopFlow
- Read the [security documentation](/docs/security)
- Schedule a consultation for enterprise compliance

---

**Build GDPR-compliant workflows with confidence! 🔒**
    `,
  },
  "security-templates-deep-dive": {
    title: "TopFlow Security Templates: Deep Dive",
    description: "Explore all 7 security-focused templates and learn how to customize them for your compliance needs.",
    author: "Charlie Su",
    publishedAt: "January 2026",
    readingTime: 10,
    content: `
# TopFlow Security Templates: Deep Dive

TopFlow includes 7 security-focused templates designed for compliance teams. This guide covers each template in detail.

## Overview of Security Templates

1. **GDPR Data Access** - Automate data subject access requests
2. **PII Detection** - Identify and redact sensitive information
3. **Incident Response** - Automate security incident workflows
4. **Privacy Impact Assessment** - Generate DPIA documentation
5. **SOC 2 Evidence** - Collect compliance evidence
6. **Data Breach Notification** - Automate notification procedures
7. **Security Log Analysis** - Analyze logs with AI for threats

## Template 1: GDPR Data Access Request

**Use Case**: Respond to user data access requests (GDPR Article 15)

**Workflow Steps**:
1. Receive user request
2. Query user data from database
3. Format data in portable format
4. Encrypt and transmit securely
5. Log the transaction

**Configuration**:
- Data source: Your user database
- Format: JSON or CSV
- Encryption: AES-256-GCM

## Template 2: PII Detection Pipeline

**Use Case**: Identify and redact personally identifiable information

**Workflow Steps**:
1. Input text or document
2. Detect PII (emails, phone numbers, SSN, etc.)
3. Flag sensitive data
4. Redact or mask PII
5. Return cleaned text

**Configuration**:
- Detection model: GPT-4 or Claude
- Redaction method: Masking or removal
- Audit logging: Enabled

## Template 3: Incident Response

**Use Case**: Automate security incident handling

**Workflow Steps**:
1. Alert triggered
2. Evaluate severity
3. Notify security team
4. Collect evidence
5. Generate incident report
6. Track remediation

## Template 4: Privacy Impact Assessment

**Use Case**: Generate GDPR DPIA documentation

**Workflow Steps**:
1. Input project details
2. Identify data processing
3. Assess risks
4. Evaluate safeguards
5. Generate DPIA document
6. Sign off

## Template 5: SOC 2 Evidence Collection

**Use Case**: Gather evidence for SOC 2 compliance

**Workflow Steps**:
1. Query security logs
2. Extract relevant events
3. Format for auditor
4. Generate control evidence
5. Archive for review

## Template 6: Data Breach Notification

**Use Case**: Automate breach notification requirements

**Workflow Steps**:
1. Breach detected
2. Scope analysis
3. Generate notifications
4. Send to affected users
5. Notify regulators
6. Document response

## Template 7: Security Log Analysis

**Use Case**: Use AI to detect threats in logs

**Workflow Steps**:
1. Collect security logs
2. Parse log data
3. Analyze with AI
4. Detect anomalies
5. Alert on threats
6. Generate report

## Customization Guide

Each template can be customized:

### Adding Nodes
- Drag additional nodes onto your template
- Connect to existing workflow
- Configure for your data

### Removing Nodes
- Delete nodes you don't need
- Reconnect workflow
- Validate changes

### Changing Models
- Select different AI provider
- Choose different model
- Test on sample data

### Adding Conditions
- Add conditional nodes
- Define business logic
- Route workflows based on conditions

## Best Practices for Security Templates

1. **Always validate** before execution
2. **Test with sample data** first
3. **Encrypt sensitive outputs**
4. **Log all execution** for audit trails
5. **Review regularly** for compliance
6. **Update templates** as regulations change
7. **Train team** on correct usage

## Deployment Options

### Option 1: Demo Mode
- Test immediately in TopFlow
- Use pre-cached results
- No configuration needed

### Option 2: With Your API Keys
- Use your own AI provider keys
- Live execution
- Real data processing

### Option 3: Export & Deploy
- Export to TypeScript
- Deploy to your infrastructure
- Customize further as needed

## Compliance Checklist

- [ ] All templates reviewed
- [ ] Appropriate templates selected for use case
- [ ] Data sources configured securely
- [ ] Encryption enabled
- [ ] Audit logging configured
- [ ] Team trained on usage
- [ ] Documentation updated
- [ ] Compliance officer sign-off

## Next Steps

- Load a template in TopFlow
- Customize for your needs
- Export and deploy
- Monitor and audit

---

**Secure your compliance workflows with TopFlow! 🔐**
    `,
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = blogPosts[params.slug]

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    }
  }

  return {
    title: `${post.title} | TopFlow Blog`,
    description: post.description,
    keywords: ["TopFlow", "AI security", "workflows", post.title],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://topflow.dev/blog/${params.slug}`,
      type: "article",
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-lg font-semibold">TopFlow</div>
          </Link>
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </header>

      {/* Article */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          {/* Article Header */}
          <div className="mb-8 border-b border-border pb-8">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">{post.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            {/* Render markdown-like content */}
            <div
              className="space-y-6 text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold text-foreground mt-8 mb-4">$1</h1>')
                  .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold text-foreground mt-6 mb-3">$1</h2>')
                  .replace(/^### (.*?)$/gm, '<h3 class="text-xl font-semibold text-foreground mt-5 mb-2">$1</h3>')
                  .replace(/^- (.*?)$/gm, '<li class="ml-6 list-disc">$1</li>')
                  .replace(/^(\d+)\. (.*?)$/gm, '<li class="ml-6 list-decimal">$2</li>')
                  .replace(
                    /\[([^\]]+)\]\(([^)]+)\)/g,
                    '<a href="$2" class="text-primary hover:underline">$1</a>'
                  )
                  .replace(/`([^`]+)`/g, '<code class="bg-card px-2 py-1 rounded text-primary">$1</code>')
                  .split('\n\n')
                  .map((p) => `<p>${p}</p>`)
                  .join(''),
              }}
            />
          </div>

          {/* Related Content */}
          <div className="mt-12 border-t border-border pt-8">
            <h3 className="mb-4 text-xl font-semibold text-foreground">Related Articles</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/blog/getting-started-topflow"
                className="rounded-lg border border-border p-4 transition hover:border-primary hover:shadow-lg"
              >
                <h4 className="font-semibold text-foreground">Getting Started with TopFlow</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Learn the basics of TopFlow and build your first secure AI workflow.
                </p>
              </Link>
              <Link
                href="/docs/security"
                className="rounded-lg border border-border p-4 transition hover:border-primary hover:shadow-lg"
              >
                <h4 className="font-semibold text-foreground">Security Documentation</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Deep dive into TopFlow's security architecture and controls.
                </p>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-lg bg-primary/5 p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Ready to Build Secure Workflows?
            </h3>
            <p className="mb-4 text-muted-foreground">Try TopFlow with your own API keys or use pre-cached demo data.</p>
            <Button asChild size="lg">
              <Link href="/builder">Try TopFlow Demo</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
