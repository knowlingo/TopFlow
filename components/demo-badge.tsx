"use client"

import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

type DemoBadgeProps = {
  variant?: "default" | "compact"
  className?: string
}

export function DemoBadge({ variant = "default", className = "" }: DemoBadgeProps) {
  if (variant === "compact") {
    return (
      <Badge
        variant="secondary"
        className={`h-5 border border-yellow-500/30 bg-yellow-500/10 px-1.5 text-[10px] font-medium text-yellow-700 dark:text-yellow-300 ${className}`}
      >
        <Sparkles className="mr-0.5 h-2.5 w-2.5" />
        DEMO
      </Badge>
    )
  }

  return (
    <Badge
      variant="secondary"
      className={`border border-yellow-500/30 bg-yellow-500/10 px-2 text-xs font-medium text-yellow-700 dark:text-yellow-300 ${className}`}
    >
      <Sparkles className="mr-1 h-3 w-3" />
      Demo Mode
    </Badge>
  )
}
