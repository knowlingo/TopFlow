"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { DocsSidebarWithTabs, type SidebarSection } from "./docs-sidebar-with-tabs"

interface SidebarPortalProps {
  sections: SidebarSection[]
  currentTab: "learn" | "build" | "security"
}

export function SidebarPortal({ sections, currentTab }: SidebarPortalProps) {
  const [mounted, setMounted] = useState(false)

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
