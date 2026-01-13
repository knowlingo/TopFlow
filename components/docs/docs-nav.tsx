"use client"

import { useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Shield, Menu, Search } from "lucide-react"
import { DocsSearch } from "@/components/docs/docs-search"

export function DocsNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const isActiveTab = (href: string) => {
    if (href === "/docs/learn") return pathname.startsWith("/docs/learn")
    if (href === "/docs/build") return pathname.startsWith("/docs/build")
    if (href === "/docs/security") return pathname.startsWith("/docs/security")
    return pathname === href
  }

  return (
    <>
      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />

      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex items-center h-14">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-base">TopFlow</span>
            </Link>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Horizontal Tab Navigation - Moved to right side */}
            <div className="hidden md:flex items-center gap-1 mr-4">
              <Link
                href="/docs/learn"
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActiveTab("/docs/learn")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Learn
              </Link>
              <Link
                href="/docs/build"
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActiveTab("/docs/build")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Build
              </Link>
              <Link
                href="/docs/security"
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActiveTab("/docs/security")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Security
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span className="text-xs">Ctrl K</span>
              </Button>

              <Link href="/builder" className="hidden md:block">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-panel">
                  <div className="flex flex-col gap-6 mt-8">
                    <button
                      onClick={() => {
                        setMobileOpen(false)
                        setSearchOpen(true)
                      }}
                      className="relative w-full"
                    >
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        readOnly
                      />
                    </button>

                    {/* Mobile Section Navigation */}
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground px-3 mb-2">Documentation</p>
                      <Link
                        href="/docs/learn"
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActiveTab("/docs/learn")
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        Learn
                      </Link>
                      <Link
                        href="/docs/build"
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActiveTab("/docs/build")
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        Build
                      </Link>
                      <Link
                        href="/docs/security"
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActiveTab("/docs/security")
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        Security
                      </Link>
                    </div>

                    <div className="pt-6 border-t border-border space-y-2">
                      <Link href="/builder" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full" size="sm">
                          Open Builder
                        </Button>
                      </Link>
                      <Link href="/home" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full bg-transparent" size="sm">
                          Home
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
