"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { DocsSidebarWithTabs, type SidebarSection } from "./docs-sidebar-with-tabs"
import { getSidebarData } from "@/lib/docs/unified-navigation"

interface SidebarPortalProps {
  currentTab: "learn" | "build" | "security"
  sections?: SidebarSection[]  // Optional - will use unified navigation if not provided
}

export function SidebarPortal({ sections: providedSections, currentTab }: SidebarPortalProps) {
  const [mounted, setMounted] = useState(false)

  // Use provided sections or get from unified navigation
  const sections = providedSections || getSidebarData(currentTab)

  useEffect(() => {
    setMounted(true)
    const slot = document.getElementById("docs-sidebar")
    if (!slot) {
      console.warn("[v0] Sidebar slot not found")
    }
  }, [])

  if (!mounted) {
    return null
  }

  const sidebarSlot = document.getElementById("docs-sidebar")

  if (!sidebarSlot) {
    return null
  }

  return createPortal(<DocsSidebarWithTabs sections={sections} currentTab={currentTab} />, sidebarSlot)
}
