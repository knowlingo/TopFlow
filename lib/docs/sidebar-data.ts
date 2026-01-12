import type { SidebarSection } from "@/components/docs/docs-sidebar"

export const learnSidebar: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Quick Start", href: "/docs/learn/quick-start" },
      { title: "Core Concepts", href: "/docs/learn/core-concepts" },
      { title: "Workflows 101", href: "/docs/learn/workflows-101" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Tutorials", href: "/docs/learn/tutorials" },
      { title: "Best Practices", href: "/docs/learn/best-practices" },
      { title: "FAQ", href: "/docs/learn/faq" },
    ],
  },
]

export const buildSidebar: SidebarSection[] = [
  {
    title: "Node Reference",
    items: [
      { title: "Overview", href: "/docs/build/nodes" },
      { title: "Start Node", href: "/docs/build/nodes/start" },
      { title: "Text Model", href: "/docs/build/nodes/text-model" },
      { title: "HTTP Request", href: "/docs/build/nodes/http-request" },
      { title: "Conditional", href: "/docs/build/nodes/conditional" },
      { title: "JavaScript", href: "/docs/build/nodes/javascript" },
      { title: "End Node", href: "/docs/build/nodes/end" },
    ],
  },
  {
    title: "Development",
    items: [
      { title: "API Reference", href: "/docs/build/api" },
    ],
  },
]

export const securitySidebar: SidebarSection[] = [
  {
    title: "Security & Compliance",
    items: [
      { title: "Overview", href: "/docs/security" },
      { title: "All Validations", href: "/docs/security/validations" },
    ],
  },
]
