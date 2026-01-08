export interface NavSection {
  title: string
  href: string
  items?: NavItem[]
}

export interface NavItem {
  title: string
  href: string
  description?: string
}

export const docsNavigation: NavSection[] = [
  {
    title: "Learn",
    href: "/docs/learn",
    items: [
      {
        title: "Quick Start",
        href: "/docs/learn/quick-start",
        description: "Get up and running in 5 minutes",
      },
      {
        title: "Core Concepts",
        href: "/docs/learn/core-concepts",
        description: "Understand the fundamentals",
      },
      {
        title: "Tutorials",
        href: "/docs/learn/tutorials",
        description: "Step-by-step guides",
      },
      {
        title: "Best Practices",
        href: "/docs/learn/best-practices",
        description: "Tips from the experts",
      },
    ],
  },
  {
    title: "Build",
    href: "/docs/build",
    items: [
      {
        title: "Node Reference",
        href: "/docs/build/nodes",
        description: "All node types explained",
      },
      {
        title: "Workflow Patterns",
        href: "/docs/build/workflows",
        description: "Common workflow designs",
      },
      {
        title: "API Reference",
        href: "/docs/build/api",
        description: "Technical API docs",
      },
      {
        title: "Integration Guide",
        href: "/docs/build/integrations",
        description: "Connect external services",
      },
    ],
  },
  {
    title: "Security",
    href: "/docs/security",
    items: [
      {
        title: "Security Validations",
        href: "/docs/security/validations",
        description: "12 security checks explained",
      },
      {
        title: "Compliance Frameworks",
        href: "/docs/security/compliance",
        description: "GDPR, SOC 2, HIPAA & more",
      },
      {
        title: "Security Reports",
        href: "/docs/security/reports",
        description: "Generate audit reports",
      },
      {
        title: "Best Practices",
        href: "/docs/security/best-practices",
        description: "Security hardening guide",
      },
    ],
  },
]

// Sidebar navigation for each section
export const learnSidebar: NavItem[] = [
  { title: "Overview", href: "/docs/learn" },
  { title: "Quick Start", href: "/docs/learn/quick-start" },
  { title: "Core Concepts", href: "/docs/learn/core-concepts" },
  { title: "Workflows 101", href: "/docs/learn/workflows-101" },
  { title: "Tutorials", href: "/docs/learn/tutorials" },
  { title: "Best Practices", href: "/docs/learn/best-practices" },
  { title: "FAQ", href: "/docs/learn/faq" },
]

export const buildSidebar: NavItem[] = [
  { title: "Overview", href: "/docs/build" },
  { title: "Node Reference", href: "/docs/build/nodes" },
  { title: "Start Node", href: "/docs/build/nodes/start" },
  { title: "Text Model Node", href: "/docs/build/nodes/text-model" },
  { title: "Image Generation", href: "/docs/build/nodes/image-generation" },
  { title: "HTTP Request", href: "/docs/build/nodes/http-request" },
  { title: "Conditional", href: "/docs/build/nodes/conditional" },
  { title: "JavaScript", href: "/docs/build/nodes/javascript" },
  { title: "Tool Node", href: "/docs/build/nodes/tool" },
  { title: "Workflow Patterns", href: "/docs/build/workflows" },
  { title: "API Reference", href: "/docs/build/api" },
  { title: "Integration Guide", href: "/docs/build/integrations" },
]

export const securitySidebar: NavItem[] = [
  { title: "Overview", href: "/docs/security" },
  { title: "Security Validations", href: "/docs/security/validations" },
  { title: "SSRF Prevention", href: "/docs/security/validations/ssrf" },
  { title: "PII Detection", href: "/docs/security/validations/pii" },
  { title: "Prompt Injection", href: "/docs/security/validations/prompt-injection" },
  { title: "Compliance Frameworks", href: "/docs/security/compliance" },
  { title: "GDPR", href: "/docs/security/compliance/gdpr" },
  { title: "SOC 2", href: "/docs/security/compliance/soc2" },
  { title: "ISO 27001", href: "/docs/security/compliance/iso27001" },
  { title: "HIPAA", href: "/docs/security/compliance/hipaa" },
  { title: "Security Reports", href: "/docs/security/reports" },
  { title: "Best Practices", href: "/docs/security/best-practices" },
]
