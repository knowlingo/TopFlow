"use client"

import { AlertCircle, Key, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

type DemoModeBannerProps = {
  onConfigureKeys: () => void
}

export function DemoModeBanner({ onConfigureKeys }: DemoModeBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <Alert className="rounded-none border-x-0 border-t-0 border-b border-yellow-500/50 bg-yellow-500/10">
      <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <AlertDescription className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <span className="font-medium text-yellow-900 dark:text-yellow-100">Demo Mode Active</span>
          <span className="ml-2 text-sm text-yellow-800 dark:text-yellow-200">
            Workflow will use cached results. Add API keys to run with live AI models.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-yellow-600 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-900 dark:text-yellow-100"
            onClick={onConfigureKeys}
          >
            <Key className="mr-2 h-3.5 w-3.5" />
            Add API Keys
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-yellow-800 hover:bg-yellow-500/20 hover:text-yellow-900 dark:text-yellow-200 dark:hover:text-yellow-100"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
