"use client"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { TableOfContents, type TOCItem } from "./table-of-contents"

interface TOCPortalProps {
  items: TOCItem[]
}

export function TOCPortal({ items }: TOCPortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || items.length === 0) {
    return null
  }

  const tocSlot = document.getElementById("docs-toc")

  if (!tocSlot) {
    return null
  }

  return createPortal(<TableOfContents items={items} />, tocSlot)
}
