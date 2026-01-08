"use client"
import { Cloud, CloudOff, ShieldAlert as CloudAlert, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWorkflowStore } from "@/lib/workflow-store"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AutoSaveIndicator() {
  const { saveStatus, lastSaveTimestamp } = useWorkflowStore()

  const getStatusIcon = () => {
    switch (saveStatus) {
      case "saving":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "saved":
        return <Cloud className="h-4 w-4" />
      case "error":
        return <CloudAlert className="h-4 w-4 text-destructive" />
      default:
        return <CloudOff className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving..."
      case "saved":
        return lastSaveTimestamp ? `Saved ${new Date(lastSaveTimestamp).toLocaleTimeString()}` : "Saved"
      case "error":
        return "Save failed"
      default:
        return "Unsaved changes"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            {getStatusIcon()}
            <span className="hidden md:inline">{getStatusText()}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getStatusText()}</p>
          {lastSaveTimestamp && (
            <p className="text-xs text-muted-foreground">Last saved: {new Date(lastSaveTimestamp).toLocaleString()}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
