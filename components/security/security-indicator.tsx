"use client"

import { Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface SecurityIndicatorProps {
  score: number
  onClick?: () => void
  className?: string
}

function getScoreConfig(score: number) {
  if (score >= 80) {
    return {
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      label: "Excellent",
      icon: Shield,
    }
  }
  if (score >= 50) {
    return {
      color: "text-yellow-600",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      label: "Needs Attention",
      icon: AlertTriangle,
    }
  }
  return {
    color: "text-red-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    label: "Critical Issues",
    icon: AlertTriangle,
  }
}

export function SecurityIndicator({ score, onClick, className }: SecurityIndicatorProps) {
  const config = getScoreConfig(score)
  const Icon = config.icon

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            className={cn(
              "gap-2 transition-all",
              config.bgColor,
              config.borderColor,
              config.color,
              "hover:shadow-md",
              className,
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-semibold">Security: {score}/100</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs font-medium">{config.label}</p>
          <p className="text-xs text-muted-foreground">Click to view detailed validation report</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
