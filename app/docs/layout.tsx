import type React from "react"
import { DocsNav } from "@/components/docs/docs-nav"
import { Analytics } from "@vercel/analytics/react"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen bg-background">
        <DocsNav />

        <div className="max-w-[1800px] mx-auto flex">
          {/* Left Sidebar - Navigation - Will be populated by page-specific sidebar */}
          <aside
            id="docs-sidebar"
            className="hidden lg:block w-64 border-r border-border bg-background sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto"
          >
            {/* Sidebar content will be rendered by individual pages */}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 px-6 lg:px-12 py-8 max-w-[900px]">{children}</main>

          {/* Right Sidebar - Table of Contents - Will be populated by page-specific TOC */}
          <aside
            id="docs-toc"
            className="hidden xl:block w-64 border-l border-border bg-background sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-4 py-8"
          >
            {/* TOC content will be rendered by individual pages */}
          </aside>
        </div>
      </div>

      {/* Vercel Analytics for page views and search query tracking */}
      <Analytics />
    </>
  )
}
