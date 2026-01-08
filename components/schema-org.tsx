"use client"

export function SchemaOrg() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TopFlow",
    url: "https://topflow.dev",
    description: "Privacy-first visual workflow builder for secure AI applications",
    author: {
      "@type": "Person",
      name: "Charlie Su",
      jobTitle: "Former CISO",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TopFlow",
    url: "https://topflow.dev",
    logo: "https://topflow.dev/logo.png",
    description: "Secure AI Agent Orchestration Platform",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
