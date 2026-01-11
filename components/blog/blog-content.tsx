"use client"

import type React from "react"
import { DatabaseFreeBlogContent } from "@/components/blog/articles/why-i-built-topflow-without-a-database"
import { SecurityLayersBlogContent } from "@/components/blog/articles/five-layers-of-security-owasp-top-10"
import { GDPRComplianceBlogContent } from "@/components/blog/articles/gdpr-compliance-by-design"
import { OpenSourceSecurityContent } from "@/components/blog/articles/open-source-security-transparency"
import { CISOToFullStackContent } from "@/components/blog/articles/ciso-to-fullstack-developer"
import { SSRFPreventionContent } from "@/components/blog/articles/preventing-ssrf-attacks-ai-workflows"
import { BudgetSaaSContent } from "@/components/blog/articles/20-dollar-saas-infrastructure"

interface BlogContentProps {
  slug: string
}

export function BlogContent({ slug }: BlogContentProps) {
  const contentMap: Record<string, React.ReactNode> = {
    "why-i-built-topflow-without-a-database": <DatabaseFreeBlogContent />,
    "five-layers-of-security-owasp-top-10": <SecurityLayersBlogContent />,
    "gdpr-compliance-by-design": <GDPRComplianceBlogContent />,
    "open-source-security-transparency": <OpenSourceSecurityContent />,
    "ciso-to-fullstack-developer": <CISOToFullStackContent />,
    "preventing-ssrf-attacks-ai-workflows": <SSRFPreventionContent />,
    "20-dollar-saas-infrastructure": <BudgetSaaSContent />,
    "gdpr-automation-3-minutes": null, // Coming soon
  }

  const content = contentMap[slug]

  return (
    <div className="prose prose-invert max-w-none">
      {content || <div>Content coming soon...</div>}
    </div>
  )
}
