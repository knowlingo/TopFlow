"use client"

import { Info, X } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DemoResultBannerProps {
  onNavigateToSettings?: () => void
  onDismiss?: () => void
  className?: string
}

export function DemoResultBanner({ onNavigateToSettings, onDismiss, className }: DemoResultBannerProps) {
  return (
    <Alert variant="default" className={cn("border-blue-500/20 bg-blue-500/10", className)}>
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between gap-4">
        <span className="text-sm text-blue-600">
          <span className="font-semibold">Demo Result (Cached)</span> - To execute live workflows with your own API
          keys,{" "}
          {onNavigateToSettings ? (
            <button onClick={onNavigateToSettings} className="underline hover:text-blue-700">
              visit Settings
            </button>
          ) : (
            <Link href="/settings" className="underline hover:text-blue-700">
              visit Settings
            </Link>
          )}
        </span>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onDismiss}
            className="text-blue-600 hover:bg-blue-500/20 hover:text-blue-700"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
