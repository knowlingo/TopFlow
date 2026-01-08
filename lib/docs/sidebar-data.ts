import type { SidebarSection } from "@/components/docs/docs-sidebar"

export const learnSidebar: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/learn/introduction" },
      { title: "Quick Start", href: "/docs/learn/quick-start" },
      { title: "Installation", href: "/docs/learn/installation" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Workflows", href: "/docs/learn/workflows" },
      { title: "Nodes", href: "/docs/learn/nodes" },
      { title: "Connections", href: "/docs/learn/connections" },
      { title: "Validation", href: "/docs/learn/validation" },
    ],
  },
  {
    title: "Tutorials",
    items: [
      { title: "First Workflow", href: "/docs/learn/first-workflow" },
      { title: "Data Processing", href: "/docs/learn/data-processing" },
      { title: "API Integration", href: "/docs/learn/api-integration" },
    ],
  },
]

export const buildSidebar: SidebarSection[] = [
  {
    title: "Nodes",
    items: [
      { title: "Overview", href: "/docs/build/nodes" },
      { title: "Source Nodes", href: "/docs/build/nodes/source" },
      { title: "Transform Nodes", href: "/docs/build/nodes/transform" },
      { title: "Sink Nodes", href: "/docs/build/nodes/sink" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { title: "Node Properties", href: "/docs/build/config/properties" },
      { title: "Data Types", href: "/docs/build/config/data-types" },
      { title: "Validation Rules", href: "/docs/build/config/validation" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Custom Nodes", href: "/docs/build/advanced/custom-nodes" },
      { title: "Plugins", href: "/docs/build/advanced/plugins" },
      { title: "Performance", href: "/docs/build/advanced/performance" },
    ],
  },
]

export const securitySidebar: SidebarSection[] = [
  {
    title: "Security Rules",
    items: [
      { title: "Overview", href: "/docs/security/overview" },
      { title: "All Validations", href: "/docs/security/validations" },
      { title: "Flow Rules", href: "/docs/security/flow-rules" },
    ],
  },
  {
    title: "Best Practices",
    items: [
      { title: "Workflow Design", href: "/docs/security/best-practices/workflow-design" },
      { title: "Data Protection", href: "/docs/security/best-practices/data-protection" },
      { title: "Access Control", href: "/docs/security/best-practices/access-control" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { title: "Standards", href: "/docs/security/compliance/standards" },
      { title: "Auditing", href: "/docs/security/compliance/auditing" },
      { title: "Reporting", href: "/docs/security/compliance/reporting" },
    ],
  },
]
