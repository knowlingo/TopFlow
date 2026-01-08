import { ReactNode } from "react"
import Link from "next/link"
import { Shield, Home, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReportsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation (consistent with marketing page) */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">TopFlow</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/reports">
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </Link>
              <Link href="/builder">
                <Button size="sm">Try Builder</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="print:p-0">{children}</main>

      {/* Footer (consistent with marketing page) */}
      <footer className="border-t border-border py-8 px-4 mt-16 print:hidden bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="text-sm font-medium text-foreground">
                TopFlow: Secure AI Agent Orchestration
              </div>
              <div className="text-sm text-muted-foreground">
                © 2026 TopFlow. Built by Charlie Su, Former CISO.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/about">
                <Button variant="ghost" size="sm">
                  About
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-xs text-center md:text-left text-muted-foreground space-y-2">
            <p>Security-first AI automation for compliance and privacy teams.</p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Shield className="h-3 w-3" />
              <span>Privacy-First: Minimal tracking, client-side storage.</span>
              <Link href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
