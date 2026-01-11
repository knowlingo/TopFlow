import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TopFlow - Secure AI Agent Orchestration | GDPR Compliant Visual Workflow Builder",
  description: "Build secure AI workflows with privacy-first architecture. Zero data storage, GDPR compliant by design, BYOK model. Created by a former CISO for enterprise security teams.",
  keywords: [
    "secure AI workflows",
    "AI agent orchestration",
    "privacy-first AI",
    "GDPR compliant AI",
    "visual workflow builder",
    "AI security platform",
    "compliance automation",
    "SSRF prevention",
    "enterprise AI security",
    "CISO AI tools",
  ],
  alternates: {
    canonical: "https://topflow.dev",
  },
  openGraph: {
    title: "TopFlow - Secure AI Agent Orchestration Platform",
    description: "Privacy-first visual workflow builder for AI applications. GDPR compliant by design, zero data storage, BYOK model. Built by a former CISO.",
    url: "https://topflow.dev",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TopFlow - Secure AI Agent Orchestration Platform",
      },
    ],
    siteName: "TopFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "TopFlow - Secure AI Agent Orchestration",
    description: "Privacy-first visual workflow builder for AI applications. GDPR compliant by design.",
    images: ["/og-image.png"],
    creator: "@charliesu_ai",
    site: "@topflow_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-verification-code", // Add your Google Search Console verification code
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}