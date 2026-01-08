import { Shield, CheckCircle, Lock, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type SecurityBadgeVariant = "verified" | "compliant" | "encrypted" | "private"

interface SecurityBadgeProps {
  variant: SecurityBadgeVariant
  className?: string
}

const BADGE_CONFIG = {
  verified: {
    icon: CheckCircle,
    label: "Verified",
    description: "SSRF prevention and PII detection active",
    className: "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20",
  },
  compliant: {
    icon: Shield,
    label: "Compliant",
    description: "GDPR, SOC2, and HIPAA template ready",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20",
  },
  encrypted: {
    icon: Lock,
    label: "Encrypted",
    description: "API keys encrypted using Web Crypto API",
    className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
  },
  private: {
    icon: Eye,
    label: "Private",
    description: "No data sent to external servers",
    className: "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
  },
} as const

export function SecurityBadge({ variant, className }: SecurityBadgeProps) {
  const config = BADGE_CONFIG[variant]
  const Icon = config.icon

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={cn("cursor-help transition-colors", config.className, className)}>
            <Icon className="mr-1 h-3 w-3" />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
